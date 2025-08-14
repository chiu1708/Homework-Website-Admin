
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
        const task = {...subjects.find(s => s.extraData.id == id)}
        
      }
    }, [subjects])
  }


  return (
    <>
      {/* Feature add */}
      {
        feature == "add" 
        &&
        <AddSubject 
          // data={{
          //   ...data
          // }}
          // functions={{
          //   ...functions,
          //   handleSubmit: handleAddSubmit
          // }}
        />
      }

      {/* Feature edit */}
      {
        (feature == "edit" && subjects.length > 0)
        &&
        <EditSubject
          // data={{
          //   ...data
          // }}
          // functions={{
          //   ...functions,
          //   handleSubmit: handleEditSubmit
          // }}
        />
      }
    </>
  )
}

export default SubjectsHandler