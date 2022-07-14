import React from 'react'
import { useEffect } from 'react'
import { BsList, BsSearch, BsDoorOpenFill, BsPerson } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import { MdKeyboardTab } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getSavedEntry } from '../state/reducer/action'

import '../static/css/NavBar.scss'
import { useAuth } from '../utils/AuthProvider'

function NavBar() {
  const dispatch = useDispatch()
  const redirect = useNavigate();
  const { authUser } = useAuth();

  useEffect(()=>{
    if (authUser){
      dispatch(getSavedEntry(authUser.uid));
    }
  }, [])

  return (
    <div className='NavBar'>
      {/* <button>
                <BsList />
            </button> */}

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
          onClick={() => redirect('/login')}>
          <BsPerson />
        </button>
      </div>

    </div>
  )
}

export default NavBar