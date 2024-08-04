import './App.css'
import SingUp from './Component/SingUp/SingUp'
import LogIn from './Component/LogIn/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
            <BrowserRouter>
        <Routes>

          <Route path="/signup" element={<SingUp />} />
          <Route path="/login" element={<LogIn />} />
        
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
