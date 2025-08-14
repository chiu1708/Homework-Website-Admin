
import { useParams } from 'react-router-dom'

const EditSubject = () => {

  const {id} = useParams()

  return (
    <div className="add-page-container">
      <div className="title-container">
        <h1>Edit subject{id}</h1>
      </div>
    </div>
  )
}

export default EditSubject