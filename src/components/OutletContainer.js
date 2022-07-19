import React from 'react'
import { Outlet } from 'react-router-dom'
import Menu from './Menu'
import '../static/css/OutletCommon.scss'

function OutletContainer() {
  return (
    <div className='OutletContainer'>
        <Outlet/>
    </div>
  )
}

export default OutletContainer