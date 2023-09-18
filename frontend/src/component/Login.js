import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode'
import { Navigate,useNavigate } from 'react-router-dom';
function Login({settoken,user}) {
    const navigate=useNavigate()
    const formik = useFormik({
        initialValues: {
        email: '',
        password: '',
        },
        validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(7, 'Password must be at least 7 characters').required('Password is required'),
        }),
        onSubmit:values=>{
            console.log('Form submitted:', values);
            if(values){
                let data={
                    "username":values.email,
                    "password":values.password
                }
                
                axios.post(' http://127.0.0.1:8000/api/token/',data).then((res)=>{
                    if(res.status==200){
                        localStorage.setItem('token',JSON.stringify(res.data))
                        settoken(res.data,jwt_decode(res.data.access).username)
                        navigate('/')
                    }
                    else{
                      alert(res.data.message)
                    }
                }).catch((err)=>{
                    alert(err.response.data.detail)
                })
                
                
            }
        },
    });
    
  return (

    <>
    {user?<Navigate to={'/'}/>:
    <div style={{textAlign:'center',fontSize:'2rem',display:'flex',flexDirection:'column',alignItems:'center',margin:'1rem'}}>
    <Card sx={{ maxWidth: 450 }}>
        <Typography gutterBottom variant="h4" component="div">
          Login 
        </Typography>
      
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
            {formik.touched.email && formik.errors.email?

            <TextField error helperText={formik.errors.email} name='email' onChange={formik.handleChange} value={formik.values.email} style={{width:'85%',margin:'1rem'}} label="Email" variant="outlined" />
            :
            <TextField name='email' onChange={formik.handleChange} value={formik.values.email} style={{width:'85%',margin:'1rem'}} label="Email" variant="outlined" />
            }
            {formik.touched.password && formik.errors.password?
            <TextField error helperText={formik.errors.password} name='password' onChange={formik.handleChange} value={formik.values.password} style={{width:'85%',margin:'1rem'}} label="Password" variant="outlined" />
            :
            <TextField name='password' onChange={formik.handleChange} value={formik.values.password} style={{width:'85%',margin:'1rem'}} label="Password" variant="outlined" />
            }
            <Button type='submit' variant="contained" style={{width:'85%',margin:'1rem'}}>Login</Button>
        </form>
        <Typography variant="body2" color="text.secondary">
          don't have an account <a href='/Signup'>Register</a>
        </Typography>
      </CardContent>
      
    </Card>
    </div>}
    </>
  )
}
const mapDispatchToProps=(dispatch)=>{
    return{
        settoken:(t,u)=>dispatch({type:"SET_TOKEN",payload: {"token":t,"user":u }}),
        
    }
}

export default connect('',mapDispatchToProps)(Login)