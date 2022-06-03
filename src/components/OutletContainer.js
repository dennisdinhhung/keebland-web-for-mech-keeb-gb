import React from 'react'
import { Outlet } from 'react-router-dom'
import Menu from './Menu'

function OutletContainer() {
  return (
    <div className='OutletContainer'>
        <Menu/>
        <Outlet/>
    </div>
  )
}

export default OutletContainer