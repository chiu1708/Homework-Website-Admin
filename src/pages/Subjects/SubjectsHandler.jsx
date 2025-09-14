
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { SubjectsContext, TasksContext } from '../../DataContext'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../Firebase'
import dayjs from 'dayjs'
import AddSubject from './AddSubject'
import EditSubject from './EditSubject'

const SubjectsHandler = () => {

  // declare variables
  const navigate = useNavigate()
  const location = useLocation()
  const colorList = [
    "blue",
    "red",
    "orange",
    "green",
    "brown",
    "purple",
    "yellow",
    "pink",
    "grey",
    "violet"
  ]
  const [books, setBooks] = useState([]);
  const [name, setName] = useState({
    "vi": "",
    "en": ""
  });
  const [shortName, setShortName] = useState({
    "vi": "",
    "en": ""
  });
  const [color, setColor] = useState(colorList[0])

  // determine what kind of feature to handle
  let feature = null
  let subjects = [] // only need id when editing so default is []
  let id = ""    // only need id when editing so default is ""
  if (location.pathname.includes("/add")) {
    feature = "add"
  }
  else if (location.pathname.includes("/edit")) {
    feature = "edit"
    
    // get the editing task's data
    id = useParams().id
    subjects = useContext(SubjectsContext)
    
    useEffect(() => {
      if (subjects.length > 0) {
        const subject = {...subjects.find(s => s.extraData.id == id)}

        setName(subject.name)
        setShortName(subject.shortName)
        setColor(subject.color)
        setBooks(subject.books)
      }
    }, [subjects])
  }

  // handle input forms
  const handleAddBook = () => {
    setBooks([
      ...books,
      {
        "name": {
          "vi": "",
          "en": "",
        },
        "grade": 11,
        "link": ""
      }
    ])
  }
  const handleRemoveBook = (index) => {
    setBooks(
      [
        ...books.slice(0, index),
        ...books.slice(index+1)
      ]
    )
  }
  const handleSetBookField = (event, index, field, lang="vi") => {
    let value;
    // possible cases: "text" (for Links, Texts), "link" (for Links, Images)
    switch (field) {
      case "name":
        value = {
          ...books[index]["name"],
          [lang]: event.target.value
        }
        break;
      case "grade":
        value = Number(event.target.value)
      default:
        value = event.target.value
        break;
    }
    
    setBooks([...books.slice(0, index), 
      {
        ...books[index],
        [field]: value
      }, 
      ...books.slice(index + 1)])
  }

  const handleSetName = (event, lang="vi") => {
    setName({
      ...name,
      [lang]: event.target.value
    })
  }
  const handleSetShortName = (event, lang="vi") => {
    setShortName({
      ...shortName,
      [lang]: event.target.value
    })
  }
  const handleSetColor = (event) => {
    setColor(event.target.value)
  }

  
  // handle submit to firestore  
  const handleAddSubmit = async (navigateTo="/") => {
    await addDoc(collection(db, "Subjects"), {
      name,
      shortName,
      books,
      color
    })
    setBooks([])
    navigate(navigateTo)
  }

  const handleEditSubmit = async() => {

    await setDoc(doc(db, "Subjects", id), {
      name,
      shortName,
      books,
      color
    })
    setBooks([])
    navigate("/")
  }

  
  const data = {
    books,
    colorList,
    name,
    shortName,
    color
  }
  const functions = {
    handleAddBook,
    handleRemoveBook,
    handleSetBookField,
    handleSetName,
    handleSetShortName,
    handleSetColor
  }


  return (
    <>
      {/* Feature add */}
      {
        feature == "add" 
        &&
        <AddSubject 
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
        (feature == "edit" && subjects.length > 0)
        &&
        <EditSubject
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

export default SubjectsHandler