import React from 'react';
import {useFormik} from 'formik';
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import {useNavigate} from 'react-router-dom';
import * as yup from 'yup';
import "yup-phone";
import YupPassword from 'yup-password';
import '../App.css';
YupPassword(yup)


function Signup() {
    const navigate=useNavigate();
   
    let initialValues={
            name:'',
            email:'',
            selectoption:'',
            phonenumber:'',
            password:'',
            cpassword:''
           
        }
        let validationSchema=yup.object(
        
                {
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
        name:values.name ,
        email: values.email,
        selectoption:values.selectoption,
        password: values.password,
        cpassword:values.cpassword,
        phonenumber: values.phonenumber
     }
     axios.post('https://8080-ecbbbeafcabcebdaccefabecfebdafaced.examlyiopb.examly.io/user/signup',data1).then(
        (response)=>{
          toast.success('👍 Registered sucessfully',{ position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          console.log(response);
          setTimeout(() => {
            navigate("/user/login")
          }, 3000);
         }).catch((error)=>{
          console.log(error);
          toast.error("👎 Oops Failed!,Try again", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          console.log("error");
        }
      )
      
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
           <Field type='email' name='email' placeholder="Enter email"/>
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
       <button type='submit' className="btn btn-primary">SUBMIT</button>
       <p>
           Already a user?
       <button type="button" id='siginLink' className="btn btn-link" onClick={() => { navigate("/user/login") }}>Login</button>
       </p>
          {/* <p>Already a user? <Link to='/login' className='link'>Login</Link></p>*/}
           
</Form>
</Formik>

</div>

</div>
  );
}

export default Signup;
