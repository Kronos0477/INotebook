import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'  
import Navbar from './assets/Navbar'
import Home from './assets/Home'
import About from './assets/About'
function App() {
 
  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      <div>

        <Home/>
        </div>
    </Router>
    </>
  )
}

export default App
