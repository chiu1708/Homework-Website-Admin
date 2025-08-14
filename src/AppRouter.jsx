import { Routes, Route, Navigate } from 'react-router-dom';

// Import your page components
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { UserAuth } from './AuthContext';
import Loading from './pages/Loading/Loading';
import TasksHandler from './pages/Tasks/TasksHandler';
import SubjectsHandler from './pages/Subjects/SubjectsHandler';

const AppRouter = () => {

  const {user} = UserAuth();

  return (
    <>
      {
        user === undefined 
        ?
        <Loading />
        :
        <Routes>
          {
            user
            ?
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks/add" element={<TasksHandler />} />
              <Route path="/tasks/edit/:id" element={<TasksHandler />} />
              <Route path="/subjects/add" element={<SubjectsHandler />} />
              <Route path="/subjects/edit/:id" element={<SubjectsHandler />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </>
            :
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to={"/login"} />} />
            </>
          }
        </Routes>
      }
    </>
  );
};

export default AppRouter;