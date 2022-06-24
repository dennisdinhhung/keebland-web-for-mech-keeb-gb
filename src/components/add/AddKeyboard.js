import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setKeyboardState } from '../../state/reducer/action';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../utils/firebase-config';
import { statusList } from '../statusList';
import { typeList } from '../typeList';
import '../../static/css/AddInfo.scss'

function AddKeyboard() {
  const state = useSelector((state) => state.keyboard)

  const redirect = useNavigate()

  const dispatch = useDispatch()

  const { keyboard } = state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const collectionRef = collection(db, 'keyboards')

    //TODO: convert all date values

    await addDoc(collectionRef, keyboard)

    dispatch(setKeyboardState({
      timeCreated: '',

      seflID: '',
      imgUrls: '',
      name: '',
      tag: {
        status: '',
        type: ''
      },
      startDate: '',
      endDate: '',
      basePrice: '',

      vendors: {},
      geekhack: ''
    }))

    redirect('/keyboard')
  }

  return (
    <div className='Add OutletCommon'>
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

        <div className="input-title">
          Image URLs
        </div>

        <div className="input">
          <input
            type="url"
            onChange={(e) => {
              dispatch(
                setKeyboardState({
                  ...keyboard,
                  imgUrls: e.target.value
                })
              )
            }} />
        </div>

        <div className="input-title">Tags</div>
        {//* multi choice
        }

        <div className="title-tag">
          Status
        </div>

        <select
          className='input'
          value={keyboard.tag.status}
          onChange={(e) => {
            dispatch(
              setKeyboardState(
                {
                  ...keyboard,
                  tag: {
                    ...keyboard.tag,
                    status: e.target.value
                  }
                }
              )
            )
          }}>
          <option value="" disabled>Choose status</option>
          {statusList.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        <div className="title-type">
          Type
        </div>

        <select
          className='input'
          value={keyboard.tag.type}
          onChange={(e) => {
            dispatch(
              setKeyboardState(
                {
                  ...keyboard,
                  tag: {
                    ...keyboard.tag,
                    type: e.target.value
                  }
                }
              )
            )
          }}>
          <option value="" disabled>Choose type</option>
          {typeList.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        <div className="input-title">Start Date</div>
        {//TODO: Date time
        }
        <input
          type="date"
          className='input'
          value={keyboard.startDate}
          onChange={(e) => {
            dispatch(
              setKeyboardState({
                ...keyboard,
                startDate: e.target.value
              })
            )
          }}
        />

        <div className="input-title">End Date</div>
        {//TODO: Date time
        }
        <input
          type="date"
          className='input'
          value={keyboard.endDate}
          onChange={(e) => {
            dispatch(
              setKeyboardState({
                ...keyboard,
                endDate: e.target.value
              })
            )
          }}
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
          type="url"
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