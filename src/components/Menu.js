import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsHouseDoorFill, BsHouseDoor, BsKeyboardFill, BsKeyboard, BsToggleOn, BsToggleOff, BsInfoCircle , BsInfoCircleFill, BsArrowLeft} from 'react-icons/bs'
import { FaKeyboard, FaRegKeyboard } from 'react-icons/fa'
import { MdKeyboardReturn } from 'react-icons/md'
import '../static/css/Menu.scss'

function Menu({activateSideBar, setSideBar, sidebar}) {
    const redirect = useNavigate()
    const MenuRef = useRef()

    const [activeBtn, setActiveBtn] = useState();

    useEffect(() => {
        setActiveBtn(window.location.pathname)
    })  

    // useEffect(() => {
    //     // click outside function
    //     let handler = (event) => {
    //       if (!MenuRef.current.contains(event.target)) {
    //         setSideBar(false)
    //       }
    //     }
    
    //     document.addEventListener("click", handler)
    
    //     return () => {
    //       document.removeEventListener("click", handler)
    //     }
    //   })

    const collapseSideBar = () => {
        activateSideBar()
    }

    return (
        <div 
        className={sidebar ? "Menu menu-on" : "Menu menu-off"}
        ref={MenuRef}>
            <button
                className='collapse-btn'
                onClick={collapseSideBar}
                >
                    <BsArrowLeft className='icon'/>
            </button>

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