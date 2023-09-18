import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
function Signup({user}) {
    const navigate=useNavigate()
    const formik = useFormik({
        initialValues: {
            name:'',
            email: '',
            address:'',
            college:'',
            mobile:'+91',
            password: '',
        },
        validationSchema: Yup.object({
            name:Yup.string().min(3,'name mini 3 characters').required('name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            address: Yup.string().min(3,'name mini 3 characters').required('address is required'),
            college: Yup.string().min(3,'name mini 3 characters').required('college is required'),
            mobile: Yup.string().matches(/^\+91\d{10}$/, 'Invalid mobile number').required('Email is required'),
            password: Yup.string().min(7, 'Password must be at least 7 characters').required('Password is required'),
        }),
        onSubmit:values=>{
            if(values){
                let data={
                    "email":values.email,
                    "password":values.password,
                    "name":values.name,
                    "phone":values.mobile,
                    "college":values.college,
                    "address":values.address
                }
                axios.post('http://127.0.0.1:8000/api/register/',data).then((res)=>{
                  console.log(res)
                  if(res.status==201){
                    navigate('/login')
                  }
                  else{
                    alert(res.data.message)
                  }
                    
                }).catch((err)=>{
                  alert(err.message)
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
          Signup 
        </Typography>
      
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
            {formik.touched.name && formik.errors.name?
            <TextField error helperText={formik.errors.name} name='name' onChange={formik.handleChange} value={formik.values.name} style={{width:'85%',margin:'1rem'}} label="Name" variant="outlined" />:
            <TextField name='name' onChange={formik.handleChange} value={formik.values.name} style={{width:'85%',margin:'1rem'}} label="Name" variant="outlined" />}
            {formik.touched.email && formik.errors.email?
            <TextField error helperText={formik.errors.email} name='email' onChange={formik.handleChange} value={formik.values.email} style={{width:'85%',margin:'1rem'}} label="Email" variant="outlined" />:
            <TextField name='email' onChange={formik.handleChange} value={formik.values.email} style={{width:'85%',margin:'1rem'}} label="Email" variant="outlined" />}
            {formik.touched.address && formik.errors.address?
            <TextField error helperText={formik.errors.address} name='address' onChange={formik.handleChange} value={formik.values.address} style={{width:'85%',margin:'1rem'}} label="Address" variant="outlined" />:
            <TextField name='address' onChange={formik.handleChange} value={formik.values.address} style={{width:'85%',margin:'1rem'}} label="Address" variant="outlined" />}
            {formik.touched.college && formik.errors.college?
            <TextField error helperText={formik.errors.college} name='college' onChange={formik.handleChange} value={formik.values.college} style={{width:'85%',margin:'1rem'}} label="College" variant="outlined" />:
            <TextField name='college' onChange={formik.handleChange} value={formik.values.college} style={{width:'85%',margin:'1rem'}} label="College" variant="outlined" />}
            {formik.touched.mobile && formik.errors.mobile?
            <TextField error helperText={formik.errors.mobile} name='mobile' onChange={formik.handleChange} value={formik.values.mobile} style={{width:'85%',margin:'1rem'}} label="Phone No" variant="outlined" />:
            <TextField name='mobile' onChange={formik.handleChange} value={formik.values.mobile} style={{width:'85%',margin:'1rem'}} label="Phone No" variant="outlined" />}
            {formik.touched.password && formik.errors.password?
            <TextField error helperText={formik.errors.password} name='password' onChange={formik.handleChange} value={formik.values.password} style={{width:'85%',margin:'1rem'}} label="Password" variant="outlined" />:
            <TextField name='password' onChange={formik.handleChange} value={formik.values.password} style={{width:'85%',margin:'1rem'}} label="Password" variant="outlined" />}

            <Button type='submit' variant="contained" style={{width:'85%',margin:'1rem'}}>Signup</Button>
        </form>
        <Typography variant="body2" color="text.secondary">
          already have an account <a href='/login'>Login</a>
        </Typography>
      </CardContent>
      
    </Card>
    </div>}
    </>
  )
}

export default Signup