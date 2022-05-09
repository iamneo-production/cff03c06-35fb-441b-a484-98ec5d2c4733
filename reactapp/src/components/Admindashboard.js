import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Admindashboard() {
  const navigate = useNavigate()
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios.get('https://627110ca6a36d4d62c20b1ab.mockapi.io/users')
      .then((getData) => {
        setApiData(getData.data);
      })
  }
  const deleteuser = async(id) => {
    axios.delete(`https://627110ca6a36d4d62c20b1ab.mockapi.io/users/${id}`)
    .then(() => {
        getData();
    })
}

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">email</th>
              <th scope="col">phone number</th>
              <th scope="col">password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {apiData.map((user,index) => (
              <tr>
                <th scope="row">{index + 1}</th>
              
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phonenumber}</td>
                <td>{user.password}</td>
                <td>
                  <button className="btn btn-primary mr-2" onClick={() => { navigate(`/viewuser/${user.id}`) }}>View</button>
                  <button className="btn btn-outline-primary mr-2" onClick={() => { navigate(`/updateuser/${user.id}`) }}>Edit</button>
                  <button className="btn btn-danger mr-2" onClick={() => deleteuser(user.id) }>Delete</button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admindashboard;
