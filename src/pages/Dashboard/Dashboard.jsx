import { Nav, Table } from "react-bootstrap"
import "./Dashboard.css"
import { useContext, useState } from "react"
import { SubjectsContext, TasksContext } from "../../DataContext"
import { NavLink, useNavigate } from "react-router-dom"

const Dashboard = () => {

  const navigate = useNavigate()

  const [currentTable, setCurrentTable] = useState("tasks");

  const handleSwitchTable = (event) => {
    setCurrentTable(event.target.value)
  }

  const tasks = useContext(TasksContext)
  const subjects = useContext(SubjectsContext)

  return (
    <>
      <div className="dashboard-container">
        <div className="title-container">
          <h1>Dashboard</h1>
        </div>
        <div className="menu-container">
          <div className="dropdown-container">
            <select onChange={handleSwitchTable} name="table" id="table-selector">
              <option>tasks</option>
              <option>subjects</option>
            </select>
          </div>
          <div className="add-button-container">
            <button onClick={() => navigate(`/${currentTable}/add`)} className="add-button">Add Item</button>
          </div>
        </div>


        {/* Task table */}
        <div 
          id="tasks-table" 
          className={`table-container ${currentTable == "tasks" ? "active" : ""}`}>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {
                tasks.map((task) => {
                  return (
                    <tr className="table-row" key={task.extraData.id} onClick={() => navigate(`/tasks/edit/${task.extraData.id}`)}>
                      <td><b className={task.subject.color}>{task.subject.shortName['vi']}</b></td>
                      <td>{task.extraData.contentsText}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>

        {/* Subjects table */}
        <div 
          id="subjects-table" 
          className={`table-container ${currentTable == "subjects" ? "active" : ""}`}>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Short name</th>
                <th>Name</th>
                <th>Books Count</th>
              </tr>
            </thead>
            <tbody>
              {
                subjects.map((subject) => {
                  return (
                    <tr className="table-row" key={subject.extraData.id} onClick={() => navigate(`/subjects/edit/${subject.extraData.id}`)}>
                      <td><b className={subject.color}>{subject.shortName['vi']}</b></td>
                      <td><b className={subject.color}>{subject.name['vi']}</b></td>
                      <td>{subject.books.length} books</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>


        {/* Add user feature will be release in future updates */}
        {/* <div 
          id="user-table" 
          className={`table-container ${currentTable == "users" ? "active" : ""}`}>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Users</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>abc</td>
                <td>def</td>
              </tr>
            </tbody>
          </Table>
        </div> */}
      </div>
    </>
  )
}

export default Dashboard