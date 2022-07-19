import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { BsList, BsSearch, BsDoorOpenFill, BsPerson, BsPersonFill } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import { MdKeyboardTab } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getSavedEntry } from '../state/reducer/action'

import '../static/css/NavBar.scss'
import { useAuth } from '../utils/AuthProvider'
import Menu from './Menu'

function NavBar() {
  const dispatch = useDispatch()
  const redirect = useNavigate();
  const { authUser } = useAuth();

  const [sidebar, setSideBar] = useState(false)

  useEffect(() => {
    if (authUser) {
      dispatch(getSavedEntry(authUser.uid));
    }
  }, [])

  const activateSideBar = () => {
    setSideBar(!sidebar)
  }

  return (
    <div className='NavBar'>
      <button
        className='btn-menu'
        onClick={() => activateSideBar()}>
        <BsList className='icon' />
      </button>

      {//TODO: img or svg here
      }

      <div
        className='logo'
        onClick={() => {
          redirect('/')
        }}>
        <MdKeyboardTab className='icon' />
        KEEBLAND
      </div>

      <div className='auth-div'>
        <button className='btn-search'><FiSearch /></button>
        <button
          className='btn-text'
          onClick={() => {
            if (authUser) {
              redirect('/user')
            }

            redirect('/login')
          }}>
          {window.location.pathname === '/user' || window.location.pathname === '/login' ? <BsPersonFill className='icon-person' /> : <BsPerson className='icon-person' />}
        </button>
      </div>

      <Menu
        activateSideBar={activateSideBar}
        setSideBar={setSideBar}
        sidebar={sidebar}
      />

    </div>
  )
}

export default NavBar