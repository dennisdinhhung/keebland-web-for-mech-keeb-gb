import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsHouseDoorFill, BsHouseDoor, BsKeyboardFill, BsKeyboard, BsToggleOn, BsToggleOff, BsInfoCircle , BsInfoCircleFill} from 'react-icons/bs'
import { FaKeyboard, FaRegKeyboard } from 'react-icons/fa'
import { MdKeyboardReturn } from 'react-icons/md'
import '../static/css/Menu.scss'

function Menu() {
    const redirect = useNavigate()

    const [activeBtn, setActiveBtn] = useState();

    useEffect(() => {
        setActiveBtn(window.location.pathname)
    })

    return (
        <div className='Menu'>
            <button
            className={activeBtn === '/' ? 'active-nav' : 'inactive-nav'}
                onClick={() => {
                    redirect('/')
                }
                }>
                {activeBtn === '/' ? 
                <BsHouseDoorFill className='menu-icon'/> : <BsHouseDoor  className='menu-icon'/>}
                Home
            </button>

            <button
                className={activeBtn === '/keyboards' ? 'active-nav' : 'inactive-nav'}
                onClick={() => {
                    redirect('keyboards')
                }
                }>
                {activeBtn === '/keyboards' ? 
                <BsKeyboardFill className='menu-icon'/> : <BsKeyboard className='menu-icon'/>}
                Keyboards
            </button>

            <button
            className={activeBtn === '/keycaps' ? 'active-nav' : 'inactive-nav'}
            onClick={() => {
                redirect('keycaps')
            }}>
                <MdKeyboardReturn className='menu-icon'/>
                Keycaps
            </button>

            <button
            className={activeBtn === '/switches' ? 'active-nav' : 'inactive-nav'}
            onClick={() => {
                redirect('switches')
            }}>
                { activeBtn === '/switches' ? 
                <BsToggleOn className='menu-icon'/> : <BsToggleOff className='menu-icon'/>} 
                Switches
            </button>

            <button
            className={activeBtn === '/about' ? 'active-nav' : 'inactive-nav'}
            onClick={() => {
                redirect('about')
            }}>
                { activeBtn === '/about' ? 
                <BsInfoCircleFill className='menu-icon'/> : <BsInfoCircle className='menu-icon'/>}
                About
            </button>
        </div>
    )
}

export default Menu