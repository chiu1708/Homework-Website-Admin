import { useLocation, useNavigate } from "react-router-dom"
import "./Header.css"
import { useContext } from "react"
import { UserAuth } from "../../AuthContext"

const Header = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const {user, logOut} = UserAuth()


  return (
    <>
    {
      user &&
      <div className="header-wrapper">
        <div className="header-container">
          {
            !(location.pathname == "/") &&
            <div className="back-button-container">
              <button onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></button>
            </div>
          }
          <div className="signout-button-container">
            <button onClick={logOut}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
        <hr />
      </div>
    }
    </>
  )
}

export default Header