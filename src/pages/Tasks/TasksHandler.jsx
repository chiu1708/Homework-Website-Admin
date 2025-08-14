
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { SubjectsContext, TasksContext } from '../../DataContext'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../Firebase'
import dayjs from 'dayjs'
import AddTask from './AddTask'
import EditTask from './EditTask'

const TasksHandler = () => {

  // declare variables
  const subjects = useContext(SubjectsContext)
  const navigate = useNavigate()
  const location = useLocation()
  const contentTypes = {
    text: "text",
    image: "image",
    link: "link"
  }
  const [contents, setContents] = useState([]);
  const [deadline, setDeadline] = useState(dayjs().toDate())
  const [subjectID, setSubjectID] = useState()


  // determine what kind of feature to handle
  let feature = null
  let tasks = [] // only get tasks if editing so default is []
  let id = ""    // only need id when editing so default is ""
  if (location.pathname.includes("/add")) {
    feature = "add"
  }
  else if (location.pathname.includes("/edit")) {
    feature = "edit"
    
    // get the editing task's data
    id = useParams().id
    tasks = useContext(TasksContext)
    
    useEffect(() => {
      if (tasks.length > 0) {
        const task = {...tasks.find(t => t.extraData.id == id)}
        
        setDeadline(task.deadline)
        setSubjectID(task.subject.id)
        setContents(task.contents)
      }
    }, [tasks])
  }

  // handle general data input
  const handleSetDeadline = (event) => {
    setDeadline(new Date(event.target.value))
  }
  const handleSetSubjectID = (event) => {
    setSubjectID(event.target.value)
  }


  // handle contents input
  const handleAddTask = (contentType) => {
    switch (contentType) {
      case contentTypes.text:
        setContents([
          ...contents,
          {
            "type": contentTypes.text,
            "text": {
              "vi": "",
              "en": ""
            }
          }
        ])
        break;
      
      case contentTypes.image:
        setContents([
          ...contents,
          {
            "type": contentTypes.image,
            "link": "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/170756/Originals/rick-roll-1.png"
          }
        ])
        break;

      case contentTypes.link:
        setContents([
          ...contents,
          {
            "type": contentTypes.link,
            "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "text": {
              "vi": "",
              "en": ""
            }
          }
        ])
        break;
    }
  }
  const handleRemoveTask = (index) => {
    setContents([...contents.slice(0, index), ...contents.slice(index + 1)])
  }
  const handleSetContentField = (event, index, field, lang="vi") => {
    let value;
    // possible cases: "text" (for Links, Texts), "link" (for Links, Images)
    switch (field) {
      case "text":
        value = {
          ...contents[index]["text"],
          [lang]: event.target.value
        }
        break;
      default:
        value = event.target.value
        break;
    }
    
    setContents([...contents.slice(0, index), 
      {
        ...contents[index],
        [field]: value
      }, 
      ...contents.slice(index + 1)])
  }

  
  // handle submit to firestore  
  const handleAddSubmit = async (navigateTo="/") => {
    
    let subject = {
      ...subjects.find(subject => subject.extraData.id == subjectID)
    }
    subject = {
      ...subject,
      id: subject.extraData.id
    }
    delete subject.extraData

    await addDoc(collection(db, "Tasks"), {
      deadline: deadline,
      contents: contents,
      subject: subject
    })
    setContents([])
    navigate(navigateTo)
  }
  const handleEditSubmit = async() => {
    
    let subject = {
      ...subjects.find(subject => subject.extraData.id == subjectID)
    }
    subject = {
      ...subject,
      id: subject.extraData.id
    }
    delete subject.extraData

    await setDoc(doc(db, "Tasks", id), {
      deadline: deadline,
      contents: contents,
      subject: subject
    })
    setContents([])
    navigate("/")
  }


  const data = {
    subjects,
    contentTypes,
    deadline,
    subjectID,
    contents
  }
  const functions = {
    handleSetDeadline,
    handleSetSubjectID,
    handleAddTask,
    handleRemoveTask,
    handleSetContentField
  }


  return (
    <>
      {/* Feature add */}
      {
        feature == "add" 
        &&
        <AddTask 
          data={{
            ...data
          }}
          functions={{
            ...functions,
            handleSubmit: handleAddSubmit
          }}
        />
      }

      {/* Feature edit */}
      {
        (feature == "edit" && tasks.length > 0)
        &&
        <EditTask 
          data={{
            ...data
          }}
          functions={{
            ...functions,
            handleSubmit: handleEditSubmit
          }}
        />
      }
    </>
  )
}

export default TasksHandler