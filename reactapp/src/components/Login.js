import React from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import '../App.css';
YupPassword(yup)


function Signup() {
    const navigate=useNavigate();
    let initialValues={
            email:'',
            password:''
           
        }
        let validationSchema=yup.object(
        
                {
                   
                    email:yup.string().email('Invalid format').required('Required'),
                    password:yup.string().required('Required').password("Invalid"),
                   
                }
            )
 let onSubmit=async(values,onSubmitProps)=>{
  const data1 = {
    email: values.email,
    password:values.password
  }
  axios.post('https://8080-ecbbbeafcabcebdaccefabecfebdafaced.examlyiopb.examly.io/user/authenticate',data1).then(
          (response)=>{
              console.log(response);
              localStorage.setItem("token", `Bearer ${response.data.jwttoken}`)
        const email=response.data.email
        const userId =response.data.id
        localStorage.setItem("userid", userId);
        localStorage.setItem("email", email);
        setTimeout(() => {
          if(data1.email==="Admin@gmail.com" && data1.password==="Admin@123" )
          navigate("/navbar")
          else
          navigate("/workinguser")
        }, 3000);
      })
            .catch((error)=>{
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
        <br/>
        <br/>
        <br/>
       <div>
            <Field type='email' name='email' placeholder="Enter Email" id="email"/>
            <ErrorMessage name='email'>
            {email=><div style={{color:'red'}}>{email}</div>}
                </ErrorMessage>
        </div>
        <br/>
       <div>
            <Field type='text' name='password' placeholder="Enter Password" id="password"/>
            <ErrorMessage name='password'>
            {password=><div style={{color:'red'}}>{password}</div>}
                </ErrorMessage>
        </div>
       <br/>
       <button type='submit' className="btn btn-primary" id="loginbutton">LOGIN</button>
       <br/>
       <br/>
       <p>
        New User/Admin?
       <button type="button" id='siginLink' className="btn btn-link" id="signupLink" onClick={() => { navigate("/user/signup") }}>Signup</button>
       </p>
      
</Form>
</Formik>
</div>
</div>
  );
}

export default Signup;
