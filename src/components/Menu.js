import React from 'react'
import { useNavigate, useNavigationType } from 'react-router-dom'

function Menu() {
    const redirect = useNavigate()

    return (
        <div className='Menu'>
            <button
                onClick={() => {
                    redirect('/')
                }
                }>
                Home
            </button>

            <button
                onClick={() => {
                    redirect('keyboard')
                }
                }>
                Keyboard
            </button>

            <button
            onClick={() => {
                redirect('keycaps')
            }}>
                Keycaps
            </button>

            <button
            onClick={() => {
                redirect('switches')
            }}>
                Switches
            </button>

            <button
            onClick={() => {
                redirect('about')
            }}>
                About
            </button>
        </div>
    )
}

export default Menu