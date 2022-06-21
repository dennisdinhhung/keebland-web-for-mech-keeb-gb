import React from 'react'
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom'
import AddKeyboard from './add/AddKeyboard'
import Home from './Home'
import About from './menu/About'
import Keyboard from './menu/Keyboard'
import Keycaps from './menu/Keycaps'
import Switches from './menu/Switches'
import NavBar from './NavBar'
import OutletContainer from './OutletContainer'
import KeyboardInfo from './seeMore/KeyboardInfo'

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
          <Route path='keyboard/:keyboardId' element={<KeyboardInfo/>}/>
          <Route path='keycaps' element={<Keycaps/>}/>
          <Route path='switches' element={<Switches/>}/>
          <Route path='about' element={<About/>}/>

          <Route path='keyboard/add' element={<AddKeyboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Container