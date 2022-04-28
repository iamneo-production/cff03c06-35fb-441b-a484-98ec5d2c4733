import './App.css';
import {Router,Route,Routes} from 'react-router-dom';
import Signup from './components/Signup'; 
import Login from './components/Login'; 
import Home from './components/Home';
function App() {
  return (
    <div className='App'>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/user/signup" element={<Signup/>} />
      <Route path="/user/login" element={<Login/>} />
    
    </Routes>
      
  </div>
  );
}

export default App;