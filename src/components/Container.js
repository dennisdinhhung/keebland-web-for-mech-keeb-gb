import React from 'react'
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom'
import { AuthProvider } from '../utils/AuthProvider'
import AddKeyboard from './add/AddKeyboard'
import AddKeycaps from './add/AddKeycaps'
import AddSwitches from './add/AddSwitches'
import EditKeyboard from './edit/EditKeyboard'
import EditKeycaps from './edit/EditKeycaps'
import EditSwitches from './edit/EditSwitches'
import Home from './Home'
import About from './menu/About'
import Keyboard from './menu/Keyboard'
import Keycaps from './menu/Keycaps'
import Switches from './menu/Switches'
import NavBar from './NavBar'
import OutletContainer from './OutletContainer'
import KeyboardInfo from './seeMore/KeyboardInfo'
import KeycapsInfo from './seeMore/KeycapsInfo'
import SwitchesInfo from './seeMore/SwitchesInfo'
import SignUp from './AuthenPages/SignUp'
import Login from './AuthenPages/Login'
import Authentication from './AuthenPages/Authentication'
import User from './User'

function Container() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <NavBar />
                <OutletContainer />
              </>
            }>
            <Route path='login' element={<Authentication />} />
            <Route path='user' element={<User/>}/>

            <Route index element={<Home />} />

            <Route path='keyboards'>
              <Route index element={<Keyboard />} />
              <Route path='add' element={<AddKeyboard />} />
              <Route path=':keyboardId' element={<KeyboardInfo />} />
              <Route path='edit/:keyboardId' element={<EditKeyboard />} />
            </Route>

            <Route path='keycaps'>
              <Route index element={<Keycaps />} />
              <Route path='add' element={<AddKeycaps />} />
              <Route path=':keycapsId' element={<KeycapsInfo />} />
              <Route path='edit/:keycapsId' element={<EditKeycaps />} />
            </Route>

            <Route path='switches'>
              <Route index element={<Switches />} />
              <Route path='add' element={<AddSwitches />} />
              <Route path=':switchesId' element={<SwitchesInfo />} />
              <Route path='edit/:switchesId' element={<EditSwitches />} />
            </Route>

            <Route path='about' element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default Container