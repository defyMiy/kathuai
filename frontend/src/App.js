import { React } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import User_main from './pages/User_main'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/User_main" element={<User_main />} />

      </Routes>
    </Router>
  )
}

export default App;