import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase";


const useFirestoreData = (lang='vi') => {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  
  useEffect(() => {
		const qs = query(collection(db, "Subjects"));
		const unsubscribeSubjects = onSnapshot(qs, (snapshot) => {
			const subjectsData = snapshot.docs.map(doc => {
				const data = doc.data();

				const books = data.books.sort((a, b) => {
					const nameA = a.name['vi'].toUpperCase();
					const nameB = b.name['vi'].toUpperCase();

					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				});

				const subjects = {
					extraData: {
						id: doc.id,
					},
					books: books,
					...data
				}

				return subjects;
			});
			setSubjects(subjectsData);
		});
		
		const qt = query(collection(db, "Tasks"));
		const unsubscribeTasks = onSnapshot(qt, (snapshot) => {
			const tasksData = snapshot.docs.map(doc => {
				const data = doc.data();

				let texts = []
				data.contents.forEach(content => {
					if (content.type === "text" || content.type == "link") {
						texts.push(content.text['vi'])
					}
				});
				const contentsText = texts.join(', ')


				const task = {
						extraData: {
							id: doc.id,
							contentsText: contentsText
						},
						...data,
						deadline: data.deadline.toDate()
				};


			return task;});
			setTasks(tasksData);
		});
		
	return () => {
			unsubscribeTasks();
			unsubscribeSubjects();
	}
}, []);

  return { tasks, subjects }
}

export default useFirestoreData