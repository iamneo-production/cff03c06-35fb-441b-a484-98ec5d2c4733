import React,{useEffect} from 'react';
import { Button } from './Button';
import './Styles/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate =useNavigate()
  useEffect(() => {
    document.title = "Baby Gifts";
  },[]);
  return (
    <div className='home-container bgimage'>
    
      <h1>Customized Baby Product Gifts</h1>
      <p>THE BEST PLACE TO SHOP</p>
      <br></br>
      <div>
      <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large' onClick={() => { navigate("/user/login") }}
        >
          LOG IN
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={() => { navigate("/user/signup") }}
        >
          SIGN UP 
        </Button>
        </div>
    </div>
  );
};

export default Home;