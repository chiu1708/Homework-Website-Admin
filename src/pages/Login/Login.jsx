
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../AuthContext';
import './Login.css';
import { useEffect } from 'react';

const Login = () => {

  const { googleSignIn, logOut, user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);


  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="login-page">
        <div className="login-button-container">
          <button onClick={handleSignIn} type="button" className="login-with-google-btn" >
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  )
}

export default Login