import React from 'react'
import { BsList, BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import '../static/css/NavBar.scss'

function NavBar() {

    const redirect = useNavigate()

    return (
        <div className='NavBar'>
            <button>
                <BsList />
            </button>

            {//TODO: img or svg here
            }

            <div
                onClick={() => {
                    redirect('/')
                }}>
                KEEBLAND
            </div>

            <div>
                <input type="text" />
                <BsSearch />
            </div>

            <div className='auth-div'>
                <button>Login</button>
                <div>/</div>
                <button>Sign Up</button>
            </div>

        </div>
    )
}

export default NavBar