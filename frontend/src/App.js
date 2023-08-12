import { React } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import User_main from './pages/User_main'
import Admin_main from './pages/Admin_main'
import Create_user from './pages/Create_user'
import Check_user from './pages/Check_user'
import Record from './pages/Record'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/User_main/:id" element={<User_main />} />
        <Route path="/Admin_main" element={<Admin_main />}/>
        <Route path="/Create_user" element={<Create_user />}/>
        <Route path="/Check_user" element={<Check_user />}/>
        <Route path="/Record" element={<Record />}/>

      </Routes>
    </Router>
  )
}

export default App;