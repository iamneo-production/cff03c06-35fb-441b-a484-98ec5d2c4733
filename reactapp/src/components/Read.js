import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function Read() 
{
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: ""
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();}, []);
  const loadUser = async () => {
    axios.get(`https://627110ca6a36d4d62c20b1ab.mockapi.io/users/${id}`)
      .then((loadUser) => {
        setUser(loadUser.data);
      })
  }
  return (
    <div className="bgimage">
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="table1">
      <h3>ID:{id}</h3>
      <br/>
      <h3>Name:{user.name}</h3>
      <br/>
      <h3>Email:{user.email}</h3>
      <br/>
      <h3>Phone number:{user.phonenumber}</h3>
      <br/>
      <h3>Password:{user.password}</h3>
</div>
    </div>
  );
}

export default Read; 