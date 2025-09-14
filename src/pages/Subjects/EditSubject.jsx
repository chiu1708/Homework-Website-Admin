
import { useParams } from 'react-router-dom'

const EditSubject = ({data, functions}) => {

  const {id} = useParams()

  // get data from props
  const {
    books,
    colorList,
    name,
    shortName,
    color
  } = data
  // get functions from props
  const {
    handleSubmit,
    handleAddBook,
    handleRemoveBook,
    handleSetBookField,
    handleSetName,
    handleSetShortName,
    handleSetColor
  } = functions

  return (
    <>
      <div className="add-page-container">
        <div className="title-container">
          <h1>Edit subject</h1>
        </div>
      </div>

      {/* General infomation input */}
      <div className="forms-container">
        <div className="section-container forms-container">
          <h2 className="label">Name (vi):</h2>
          <input onChange={() => handleSetName(event, "vi")} value={name["vi"]} placeholder={"name (vi)"} type="text" name="nameVi" id="" />
        </div>
        <div className="section-container forms-container">
          <h2 className="label">Name (en):</h2>
          <input onChange={() => handleSetName(event, "en")} value={name["en"]} placeholder={"name (en)"} type="text" name="nameEn" id="" />
        </div>
        <div className="section-container">
          <h2 className="label">Short name (vi):</h2>
          <input onChange={() => handleSetShortName(event, "vi")} value={shortName["vi"]} placeholder={"short name (vi)"} type="text" name="shortNameVi" id="" />
        </div>
        <div className="section-container">
          <h2 className="label">Short name (en):</h2>
          <input onChange={() => handleSetShortName(event, "en")} value={shortName["en"]} placeholder={"short name (en)"} type="text" name="shortNameEn" id="" />
        </div>
        <div className="section-container">
          <h2 className="label">Color:</h2>
          <select onChange={() => handleSetColor(event)} value={color} name="color" id="">
            {
              colorList.map((color) => {
                return (
                  <option key={color} className={color} value={color}>{color}</option>
                )
              })
            }
          </select>
        </div>
      </div>


      {/* Books input */}
      <div className="section-container">
        <h2 className="label">Books:</h2>
        {
          books.map((book, index) => {
            return (
              <div key={index} className='book-input-container'>
                <button onClick={() => handleRemoveBook(index)} className='remove-book-button'><i className="fa-solid fa-minus"></i></button>
                <p><b>Book:</b></p>
                <input onChange={() => handleSetBookField(event, index, "link")} value={book.link} type="text" placeholder='link' />
                <input onChange={() => handleSetBookField(event, index, "name", "vi")} value={book.name["vi"]} type="text" placeholder='name-vi' />
                <input onChange={() => handleSetBookField(event, index, "name", "en")} value={book.name["en"]} type="text" placeholder='name-en' />
                <select value={book.grade} onChange={() => handleSetBookField(event, index, "grade")} name="grade" id="">
                  {
                    Array.from(Array(12).keys()).map((key) => {
                      return (
                        <option key={key+1} value={key+1}>{key+1}</option>
                      )
                    })
                  }
                </select>
              <hr />
              </div>
            )
          })
        }
        <div className="buttons-container d-flex">
          <div className="text-button-container button-container">
            <button onClick={() => handleAddBook()}>
              <div className="button-icon"><i className="fa-solid fa-book"></i></div>
              <div className="button-text">Add</div>
            </button>
          </div>
        </div>
      </div>

      {/* Submit buttons */}
      <div className="section-container submit-button-container">
        <button onClick={() => handleSubmit("/")} className='submit-button'>Submit</button>
        <button onClick={() => handleSubmit("/subjects/add")} className='submit-button'>Submit & Add Another</button>
      </div>
    </>
  )
}

export default EditSubject