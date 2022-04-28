import React from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik';
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
 let onSubmit=(values,onSubmitProps)=>{
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
            <Field type='email' name='email' placeholder="Enter Email"/>
            <ErrorMessage name='email'>
            {email=><div style={{color:'red'}}>{email}</div>}
                </ErrorMessage>
        </div>
        <br/>
       <div>
            <Field type='text' name='password' placeholder="Enter Password"/>
            <ErrorMessage name='password'>
            {password=><div style={{color:'red'}}>{password}</div>}
                </ErrorMessage>
        </div>
       <br/>
       <button type='submit' className="btn btn-primary">LOGIN</button>
       <br/>
       <br/>
       <p>
        New User/Admin?
       <button type="button" id='siginLink' className="btn btn-link" onClick={() => { navigate("/user/signup") }}>Signup</button>
       </p>
      
</Form>
</Formik>
</div>
</div>
  );
}

export default Signup;
