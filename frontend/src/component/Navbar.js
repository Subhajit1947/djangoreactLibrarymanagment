import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';

import {connect} from 'react-redux'
// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar({u,settoken}) {
    const navigate=useNavigate()
    const handlelogout=()=>{
        localStorage.removeItem('token')
        settoken(null,null)
        navigate('/login')
    }
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {u?
            <>
            <div style={{width:'90vw',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <div style={{display:'flex'}}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Home
                </Typography>

                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/order"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Dashboard
                </Typography>
              </div>
              <div style={{display:'flex'}}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  
                  sx={{
                    mr: 2,
                   
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 500,
                    
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  wellcome {u}
                </Typography>

                <Typography
                  variant="h6"
                  noWrap
                  
                  component="a"
                  onClick={handlelogout}
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex',cursor:'pointer' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Logout
                </Typography>
              
              </div>
            </div>
          </>
            :
            <div style={{width:'90vw',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
            <div style={{display:'flex'}}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href='/signup'
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex',cursor:'pointer' },
                    
                    fontWeight: 600,
                    
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Signup
                </Typography>

                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href='/login'
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex',cursor:'pointer' },
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Login
                </Typography>
              
              </div>
              </div>
          // <Box sx={{ flexGrow: 0 }} style={{display:'flex',flexDirection:'row'}}>
          //   <Button onClick={()=>navigate('/Signup')} sx={{ my: 2, color: 'white', display: 'block' }}>
          //       Register
          //   </Button>
          //   <Button onClick={()=>navigate('/login')} sx={{ my: 2, color: 'white', display: 'block' }}>
          //       Login
          //   </Button>
          // </Box>
}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
const mapDispatchToProps=(dispatch)=>{
    return{
        settoken:(t,u)=>dispatch({type:"SET_TOKEN",payload: {"token":t,"user":u }}),
        
    }
}
export default connect('',mapDispatchToProps)(Navbar);
