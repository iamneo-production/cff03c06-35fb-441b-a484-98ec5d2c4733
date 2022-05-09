import {Router,Route,Routes} from 'react-router-dom';
import Signup from './components/Signup'; 
import Login from './components/Login'; 
import Home from './components/Home';
import Workinguser from './components/Workinguser';
import Gifts from './components/Gifts';
import Navbar from './components/Navbar';
import Order from './components/Order';
import Theme from './components/Theme';
import Update from './components/Update';
import Read from './components/Read';
import Create from './components/Create';
import Admindashboard from './components/Admindashboard';


function App() {
  return (
    <div className='App'>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/user/signup" element={<Signup/>} />
      <Route path="/user/login" element={<Login/>} />
      <Route path="/admindashboard" element={<Admindashboard/>} />
      <Route path="/workinguser" element={<Workinguser/>} />
      <Route path="/gifts" element={<Gifts />} />
      <Route path="/navbar" element={<Navbar />} />
          <Route path="/themes" element={<Theme />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/adduser" element={<Create />} />
          <Route path="/updateuser/:id" element={<Update />} />
          <Route path="/viewuser/:id" element={<Read />} />
    
    </Routes>
      
  </div>
  );
}

export default App;
