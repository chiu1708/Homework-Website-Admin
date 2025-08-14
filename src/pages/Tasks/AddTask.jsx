import './Tasks.css'
import Loading from '../Loading/Loading'

const AddTask = ({ data, functions }) => {

  // get data from props
  const {
    subjects,
    contentTypes,
    deadline,
    subjectID,
    contents
  } = data
  // get functions from props
  const {
    handleSetDeadline,
    handleSetSubjectID,
    handleAddTask,
    handleRemoveTask,
    handleSetContentField,
    handleSubmit
  } = functions


  return (
    <>
      {
        subjects.length === 0
        ?
        <Loading />
        :
        <div className="add-page-container">

          {/* Heading */}
          <div className="title-container">
            <h1>Add task</h1>
            <hr />
          </div>

          {/* General infomation input */}
          <div className="forms-container">
            <div className="section-container forms-container">
              <h2 className="label">Subject:</h2>
              <select onChange={(event) => handleSetSubjectID(event)} name="subject" id="">
                <option value="other">Other</option>
                {
                  subjects.map((subject) => {
                    return (
                      <option className={`${subject.color}`} key={subject.extraData.id} value={subject.extraData.id}>{subject.name['vi']}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="section-container">
              <h2 className="label">Deadline:</h2>
              <input value={deadline.toISOString().substring(0,10)} onChange={(event) => handleSetDeadline(event)} type="date" name="deadline" id="" />
            </div>
          </div>


          {/* Contents input */}
          <div className="section-container">
            <h2 className="label">Contents:</h2>
            {
              contents.map((data, index) => {
                return (
                  <div key={index} className='content-input-container'>
                    <button onClick={() => handleRemoveTask(index)} className='remove-content-button'><i className="fa-solid fa-minus"></i></button>
                  {
                    data.type == contentTypes.text &&
                    <>
                      <p><b>Text:</b></p>
                      <input onChange={(event) => handleSetContentField(event, index, "text", "vi")} type="text" placeholder='text-vi' />
                      <input onChange={(event) => handleSetContentField(event, index, "text", "en")} type="text" placeholder='text-en' />
                    </>
                  }
                  {
                    data.type == contentTypes.image &&
                    <>
                      <p><b>Image:</b></p>
                      <input type="file" accept="image/*" />
                    </>
                  }
                  {
                    data.type == contentTypes.link &&
                    <>
                      <p><b>Link:</b></p>
                      <input onChange={(event) => handleSetContentField(event, index, "link")} type="text" placeholder='link' />
                      <input onChange={(event) => handleSetContentField(event, index, "text", "vi")} type="text" placeholder='text-vi' />
                      <input onChange={(event) => handleSetContentField(event, index, "text", "en")} type="text" placeholder='text-en' />
                    </>
                  }
                  <hr />
                  </div>
                )
              })
            }
            <div className="buttons-container d-flex">
              <div className="text-button-container button-container">
                <button onClick={() => handleAddTask(contentTypes.text)}>
                  <div className="button-icon"><i className="fa-solid fa-plus"></i></div>
                  <div className="button-text">Text</div>
                </button>
              </div>
              <div className="image-button-container button-container">
                <button onClick={() => handleAddTask(contentTypes.image)}>
                  <div className="button-icon">
                    <i className="fa-solid fa-image"></i>
                  </div>
                  <div className="button-text">Image</div>
                </button>
              </div>
              <div className="Link-button-container button-container">
                <button onClick={() => handleAddTask(contentTypes.link)}>
                  <div className="button-icon">
                    <i className="fa-solid fa-link"></i>
                  </div>
                  <div className="button-text">Link</div>
                </button>
              </div>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="section-container submit-button-container">
            <button onClick={() => handleSubmit("/")} className='submit-button'>Submit</button>
            <button onClick={() => handleSubmit("/tasks/add")} className='submit-button'>Submit & Add Another</button>
          </div>
        </div>
      }
    </>
  )
}

export default AddTask