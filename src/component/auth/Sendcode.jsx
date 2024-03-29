import React, { useContext } from 'react'
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { sendcodeSchema } from '../web/validate/Validate.js';
import Input from '../pages/Input.jsx';
import UserContex, { UserContexProvider } from '../web/context/User.jsx';
import './auth.css';
export default function Sendcode() {
  let {setUserToken} = useContext(UserContex);
    const navigate = useNavigate();
    
  
    const initialValues={
        email:'',
      };
      
      const onSubmit=async users=>{
        const {data} = await axios.patch('https://ecommerce-node4.vercel.app/auth/sendcode',users);
        if(data.message == 'success'){
         localStorage.setItem("UserToken",data.token);
         setUserToken(data.token);
         toast.success('send code', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
            navigate('/forgetpassword');
        }
      };
      const formik = useFormik({
          initialValues,
          onSubmit,
          validationSchema:sendcodeSchema,
        });
      const inputs =[
        { 
          id:'email',
          type: 'email',
          name:'email',
          title:'User Email',
          value:formik.values.email,
    
        },
       
      ];
      const renderInputs = inputs.map((input,index)=>
        <Input  
        type={input.type} 
        id={input.id} 
         name={input.name} 
         title={input.title}
         value={input.value}  
         key={index} 
         errors={formik.errors}
         onChange={input.onChange||formik.handleChange}
         onBlur={formik.handleBlur}
         touched={formik.touched}
        />
    
      
      );
      return (
        <>
        <div className='form mt-5  py-5'>
        <form className='content' onSubmit={formik.handleSubmit}>
        <h2 className='mb-3'>Enter Email</h2>
          {renderInputs}
          <button type='submit'className='mt-2 submit' >sendcode</button>
         </form>
        </div>
        
    
        </>
      )
}
