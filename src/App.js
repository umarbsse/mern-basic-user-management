import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Accountsetting from "./components/Accountsetting";





import { useEffect} from 'react'

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About showAlert={showAlert} />} />
            
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
         
            
          
            
            
            <Route path="/dashboard" element={<Dashboard showAlert={showAlert} />} />
            
            <Route path="/accountsetting" element={ <Accountsetting showAlert={showAlert}  /> } />
            <Route path="/changepassword" element={ <Accountsetting showAlert={showAlert}  /> } />
            
            
            
            
            
             



          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
