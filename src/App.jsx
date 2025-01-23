import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./assets/Navbar";
import { useContext,useEffect } from "react";
import Home from "./assets/Home";
import About from "./assets/About";
import Alerts from "./assets/Alerts";
import Login from "./assets/Login";
import Signup from "./assets/signup";
import Contextvalue from './context/notes/NoteContext.jsx'
function App() {
  const  context = useContext(Contextvalue)
  const {Alert,setAlert} = context;
  return (
    
      <Router>
        <Navbar />
        <Alerts message={Alert}/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setAlert={setAlert}/>} />
            <Route path="/signup" element={<Signup setAlert={setAlert}/>} />
          </Routes>
        </div>
      </Router>
   
  );
}

export default App;
