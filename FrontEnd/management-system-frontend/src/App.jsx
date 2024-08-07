import './App.css'
import SingUp from './Component/SingUp/SingUp'
import LogIn from './Component/LogIn/Login';
import TaskManager from './Component/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
            <BrowserRouter>
        <Routes>

          <Route path="/signup" element={<SingUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<TaskManager />} />
          
        
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
