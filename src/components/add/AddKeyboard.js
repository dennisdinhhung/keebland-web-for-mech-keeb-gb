import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setKeyboardState } from '../../state/reducer/action';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../utils/firebase-config';

function AddKeyboard() {
  const state = useSelector((state) => state.keyboard)

  const redirect = useNavigate()

  const dispatch = useDispatch()

  const { keyboard } = state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const collectionRef = collection(db, 'keyboards')

    // await addDoc(collectionRef, keyboard)

    dispatch(setKeyboardState({
      timeCreated: '',

      seflID: '',
      imgID: [],
      name: '',
      tags: [],
      startDate: '',
      endDate: '',
      basePrice: '',

      vendors: {},
      geekhack: ''
    }))
  }

  return (
    <div className='AddKeyboard OutletCommon'>
      <div className="title">Add Keyboards</div>
      <form action="">
        <div className="input-title">Name</div>
        <input
          type="text"
          className='input'
          value={keyboard.name}
          onChange={(e) => {
            dispatch(
              setKeyboardState({
                ...keyboard,
                name: e.target.value
              }))
          }}
        />

        <div className="input-title">Tags</div>
        {//* multi choice
        }
        <div className="title-tag">
          Status
        </div>

        {/*// TODO: status choices here (ex: live, gb, in stock) */}

        <div className="title-type">
          Type
        </div>

        {/* //TODO: type choices here (ex: keyboard, keycaps) */}

        <div className="input-title">Start Date</div>
        {//TODO: Date time
        }
        <input
          type="text"
          className='input'
        />

        <div className="input-title">End Date</div>
        {//TODO: Date time
        }
        <input
          type="text"
          className='input'
        />

        <div className="input-title">Base Price</div>
        <input
          type="number"
          className='input'
          value={keyboard.basePrice}
          onChange={(e) => {
            dispatch(
              setKeyboardState({
                ...keyboard,
                basePrice: e.target.value
              }))
          }}
        />

        <div className="input-title">Vendors</div>
        <div className='vendors'>
          {// TODO: have an field add button for input region, input vendor's name and input to link to shop
          }
          <button
            onClick={(e) => {
              e.preventDefault()
            }}>+</button>
        </div>

        <div className="input-title">Geekhack link</div>
        <input
          type="text"
          className='input'
          value={keyboard.geekhack}
          onChange={(e) => {
            dispatch(
              setKeyboardState({
                ...keyboard,
                geekhack: e.target.value
              }))
          }}
        />

        <button
          className='btn-add'
          onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  )
}

export default AddKeyboard