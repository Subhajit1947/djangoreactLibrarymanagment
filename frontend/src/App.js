import Signup from './component/Signup';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './component/Navbar';
import Login from './component/Login';
import { connect } from 'react-redux'
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import Home from './component/Home';
import Privateroute from './component/Privateroute';
import Book from './component/Book'
import Orderbook from './component/Orderbook';

function App({updatetoken,refresh11,user}) {
  
  useEffect(()=>{
    if(refresh11){
      console.log(refresh11)
      let data={
        "refresh":refresh11
      }
      let timem=4*1000*60
      let inter=setInterval(()=>{
        axios.post(' http://127.0.0.1:8000/api/token/refresh/',data).then((res)=>{
          if(res.status==200){
              localStorage.setItem('token',JSON.stringify(res.data))
              updatetoken(res.data,jwt_decode(res.data.access).username)
          }
        }).catch((err)=>{
            alert(err.message)
        })
      },[timem])
      return ()=>clearInterval(inter)
    }
  },[refresh11])
  return (
    <BrowserRouter>
      <Navbar u={user}/>
      <Routes>
        <Route path='/Signup' element={<Signup user={user}/>}/>
        <Route path='/login' element={<Login user={user}/>}/>
        <Route element={<Privateroute user={user}/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/:id' element={<Book/>}/>
          <Route path='/order' element={<Orderbook/>}/>
        </Route>
      </Routes>

    </BrowserRouter>
  );
}
const mapDispatchToProps=(dispatch)=>{
  return{
    updatetoken:(t,u)=>dispatch({type:"UPDATE_TOKEN",payload: {"token":t,"user":u }}),
      
  }
}
const mapStateToProps=(state)=>{
  if(state.token){
    return{
    
      refresh11:state.token.refresh,
      user:state.user
    }
  }
  
  
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
