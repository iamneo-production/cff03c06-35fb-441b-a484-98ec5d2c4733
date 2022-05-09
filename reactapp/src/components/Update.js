import React,{useState,useEffect} from 'react';
import {useFormik} from 'formik';
import axios from "axios";
import { useParams } from 'react-router-dom';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as yup from 'yup';
import "yup-phone";
import YupPassword from 'yup-password';
import '../App.css';
YupPassword(yup)


function Update() 
{

  
const {id}=useParams();
 
let initialValues={
    selectoption:'',
        name:'',
        email:'',
        selectoption:'',
        phonenumber:'',
        password:'',
        cpassword:''
       
    }


    
        let validationSchema=yup.object(
        
                {
                    selectoption:yup.string().required('Required'),
                    name:yup.string().required('Required'),
                    email:yup.string().email('Invalid format').required('Required'),
                    selectoption:yup.string().required('Required'),
                    phonenumber:yup.string().required('Required').phone("IN",true,"invalid number"), 
                    password:yup.string().required('Required').password("Invalid"),
                    cpassword:yup.string().required('Required').oneOf([yup.ref('password'), ''], 'Passwords must match')
                    
                   
                }
            )
 let onSubmit=async(values,onSubmitProps)=>{
   
    let data1={
        selectoption:values.selectoption,
        name:values.name ,
        email: values.email,
        password: values.password,
        phonenumber: values.phonenumber
     }

     axios.put(`https://627110ca6a36d4d62c20b1ab.mockapi.io/users/${id}`,data1);
    
console.log(values);
onSubmitProps.resetForm()
}
  return (
      <div className='bgimage'>
        <br/>
        <br/>
        <br/>
        <br/>
    <div className='table1'>
        
      <Formik initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
    <Form>
       <div>
            <label></label>
            <Field type='text' component='select' name='selectoption'  placeholder="Enter Admin/User">
            <option value=''>Enter Admin/User</option>
            <option value="Admin" id="Admin">Admin</option>
            <option value="User" id="User">User</option>
            </Field>
            <ErrorMessage name='selectoption'>
            {selectoption=><div style={{color:'red'}}>{selectoption}</div>}
                </ErrorMessage>
        </div>
       <br/>
       <div>
           <Field type='email' name='email'  placeholder="Enter email"/>
            <ErrorMessage name='email'>
            {email=><div style={{color:'red'}}>{email}</div>}
                </ErrorMessage>
        </div>
        <br/>
        <div>
            <Field type='text'  name='name' placeholder="Enter Username"/>
            <ErrorMessage name='name'>
                {name=><div style={{color:'red'}}>{name}</div>}
                </ErrorMessage>
        </div>
        <br/>
        <div>
            <Field type='number' name='phonenumber' placeholder="Enter Mobilenumber"/>
            <ErrorMessage name='phonenumber'>
            {phonenumber=><div style={{color:'red'}}>{phonenumber}</div>}
                </ErrorMessage>
        </div>
       <br/>
        <div>
           <Field type='password' name='password' placeholder='Enter Password'/>
            <ErrorMessage name='password'>
            {password=><div style={{color:'red'}}>{password}</div>}
                </ErrorMessage>
        </div>
        <br/>
        <div>
            <Field type='password' name='cpassword' placeholder='Enter Confirm Password'/>
            <ErrorMessage name='cpassword'>
            {cpassword=><div style={{color:'red'}}>{cpassword}</div>}
                </ErrorMessage>
        </div>
        <br/>
       <button type='submit' className="btn btn-primary">UPDATE</button>
       
</Form>
</Formik>

</div>

</div>
  );

  }
export default Update;
