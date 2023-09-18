import React from 'react'
import { Route,Navigate,Outlet } from 'react-router-dom'
function Privateroute({user}) {
    
    
  return (
    user?<Outlet/>:<Navigate to={'/login'}/>
  )
}

export default Privateroute