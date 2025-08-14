import './App.scss'
import './Global.css'
import AppRouter from './AppRouter'
import { AuthContextProvider } from './AuthContext';
import Header from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { SubjectsContext,  TasksContext } from './DataContext';
import useFirestoreData from './hooks/useFirestoreData';

function App() {

  // handle data
  const { tasks, subjects } = useFirestoreData("vi");

  return (
    <SubjectsContext value={subjects}>
      <TasksContext value={tasks}>
        <AuthContextProvider>
          <BrowserRouter>
            <Header />
            <div className="page-container">
              <AppRouter />
            </div>
          </BrowserRouter>
        </AuthContextProvider>
      </TasksContext>
    </SubjectsContext>
  )
}

export default App
