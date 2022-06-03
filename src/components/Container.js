import React from 'react'
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom'
import Home from './Home'
import About from './menu/About'
import Keyboard from './menu/Keyboard'
import Keycaps from './menu/Keycaps'
import Switches from './menu/Switches'
import NavBar from './NavBar'
import OutletContainer from './OutletContainer'

function Container() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <>
            <NavBar/>
            <OutletContainer/>
          </>
        }>
          <Route index element={<Home/>}/>
          <Route path='keyboard' element={<Keyboard/>}/> 
          <Route path='keycaps' element={<Keycaps/>}/>
          <Route path='switches' element={<Switches/>}/>
          <Route path='about' element={<About/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Container