
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import ReportingPage from './pages/ReportingPage';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element = {<ProtectedRoutes> <HomePage /></ProtectedRoutes>} />
      <Route path='/register' element = {<Register />} />
      <Route path='/login' element = {<Login />} />
      <Route path='/users' element = {<UserPage />} />
      <Route path='/report' element = {<ReportingPage />} />

    </Routes>
    </>
  );
}

export function ProtectedRoutes(props){
  if (localStorage.getItem('user')) {
    return props.children
    
  }else {
    return <Navigate to ="/login" />
    
  }

}
export default App;
