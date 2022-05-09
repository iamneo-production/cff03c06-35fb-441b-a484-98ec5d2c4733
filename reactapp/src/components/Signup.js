import React from 'react';
import axios from "axios";
import {Formik,Form,Field,ErrorMessage} from 'formik';
import {useNavigate} from 'react-router-dom';
import * as yup from 'yup';
import "yup-phone";
import YupPassword from 'yup-password';
import '../App.css';
YupPassword(yup)


function Create() 
   {
        const navigate=useNavigate();
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
   
    const data1={
        selectoption:values.selectoption,
        name:values.name ,
        email: values.email,
        password: values.password,
        phonenumber: values.phonenumber
     }
    
        axios.post('https://8080-ecbbbeafcabcebdaccefabecfebdafaced.examlyiopb.examly.io/user/signup',data1).then(
          (response)=>{
              console.log(response);
            }).catch((error)=>{
            console.log(error);
            });
           
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
           <Field type='email' name='email'  placeholder="Enter email" id="email"/>
            <ErrorMessage name='email'>
            {email=><div style={{color:'red'}}>{email}</div>}
                </ErrorMessage>
        </div>
        <br/>
        <div>
            <Field type='text'  name='name' placeholder="Enter Username" id="username"/>
            <ErrorMessage name='name'>
                {name=><div style={{color:'red'}}>{name}</div>}
                </ErrorMessage>
        </div>
        <br/>
        <div>
            <Field type='number' name='phonenumber' placeholder="Enter Mobilenumber" id="mobileNumber"/>
            <ErrorMessage name='phonenumber'>
            {phonenumber=><div style={{color:'red'}}>{phonenumber}</div>}
                </ErrorMessage>
        </div>
       <br/>
        <div>
           <Field type='password' name='password' placeholder='Enter Password' id="password"/>
            <ErrorMessage name='password'>
            {password=><div style={{color:'red'}}>{password}</div>}
                </ErrorMessage>
        </div>
        <br/>
        <div>
            <Field type='password' name='cpassword' placeholder='Enter Confirm Password' id="confirmPassword"/>
            <ErrorMessage name='cpassword'>
            {cpassword=><div style={{color:'red'}}>{cpassword}</div>}
                </ErrorMessage>
        </div>
        <br/>
       <button type='submit' className="btn btn-primary" id="submitButton">SUBMIT</button>
       <p>
           Already a user?
       <button type="button" id='siginLink' className="btn btn-link"  onClick={() => { navigate("/user/login") }}>Login</button>
       </p>
       
</Form>
</Formik>

</div>

</div>
  );

  }
export default Create;
