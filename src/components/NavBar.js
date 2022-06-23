import React from 'react'
import { BsList, BsSearch } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import { MdKeyboardTab } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import '../static/css/NavBar.scss'

function NavBar() {

    const redirect = useNavigate()

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
                <MdKeyboardTab className='icon'/>
                KEEBLAND
            </div>

            <div className='auth-div'>
                <button className='btn-search'><FiSearch /></button>
                <button className='btn-text'>Login</button>
                <div>|</div>
                <button className='btn-text'>Sign Up</button>
            </div>

        </div>
    )
}

export default NavBar