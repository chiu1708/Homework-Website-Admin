import { useContext, useState } from 'react'
import './Subjects.css'

const AddSubject = () => {

  const [newData, setNewData] = useState({});

  return (
    <div className="add-page-container">
      <div className="title-container">
        <h1>Add Subject</h1>
      </div>
    </div>
  )
}

export default AddSubject