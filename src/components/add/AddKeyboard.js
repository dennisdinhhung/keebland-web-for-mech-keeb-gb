import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setKeyboardState } from '../../state/reducer/action';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../utils/firebase-config';
import { statusList } from '../statusList';
import { typeList } from '../typeList';
import '../../static/css/AddInfo.scss'

function AddKeyboard() {
  const state = useSelector((state) => state.keyboard)

  const redirect = useNavigate()

  const dispatch = useDispatch()

  const { keyboard } = state

  const addUrl = (e) => {
    dispatch(
      setKeyboardState({ ...keyboard, imgUrls: [...keyboard.imgUrls, ''] })
    )
  }

  const deleteUrl = (index) => {
    const newUrlList = [...keyboard.imgUrls]
    newUrlList.splice(index, 1)

    dispatch(
      setKeyboardState({
        ...keyboard,
        imgUrls: newUrlList
      })
    )
  }

  const addVendor = () => {
    dispatch(
      setKeyboardState({
        ...keyboard,
        vendors: [
          ...keyboard.vendors,
          {
            region: '',
            url: ''
          }]
      })
    )
  }

  const handleSetVendors = (e, index) => {
    const newList = [...keyboard.vendors]
    const newObj = { ...keyboard.vendors[index], [e.target.name]: e.target.value }
    newList[index] = newObj
    dispatch(
      setKeyboardState({
        ...keyboard,
        vendors: newList
      })
    )
  }

  const deleteVendor = (index) => {
    const newList = [...keyboard.vendors]
    newList.splice(index, 1)

    dispatch(
      setKeyboardState({
        ...keyboard,
        vendors: newList
      })
    )
  }

  const handleSubmit = async () => {
    const collectionRef = collection(db, 'keyboards')

    const fireKeyboard = {...keyboard}
    fireKeyboard.timeCreated = Timestamp.fromDate(new Date())
    fireKeyboard.startDate = Timestamp.fromDate(new Date(fireKeyboard.startDate))
    fireKeyboard.endDate = Timestamp.fromDate(new Date(fireKeyboard.endDate))

    await addDoc(collectionRef, fireKeyboard)

    dispatch(setKeyboardState({
      imgUrls: [],
      name: '',
      tag: {
        status: '',
        type: 'keyboards'
      },
      startDate: '',
      endDate: '',
      basePrice: '',

      vendors: [],
      geekhack: ''
    }))

    redirect('/keyboards')
  }

  return (
    <div className='Add OutletCommon'>
      <div className="title">Add Keyboards</div>
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
        {keyboard.imgUrls.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newList = [...keyboard.imgUrls]
                newList[index] = e.target.value
                dispatch(
                  setKeyboardState({
                    ...keyboard,
                    imgUrls: newList
                  })
                )
              }}
            />
            <button onClick={() => deleteUrl(index)}>Delete</button>
          </div>
        ))}
        <button
          onClick={addUrl}
        >
          +
        </button>
      </div>

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

      <div className="input-title">Start Date</div>

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
        {keyboard.vendors.map((vendor, index) => (
          <div className='input-vendor' key={index}>
            <div className="input">
              <div>
                Region
              </div>
              <input
                type="text"
                name='region'
                value={vendor.region}
                onChange={(e) => {
                  handleSetVendors(e, index)
                }} />
            </div>
            <div>
              <div>URL</div>
              <input
                type="text"
                name='url'
                value={vendor.url}
                onChange={(e) => {
                  handleSetVendors(e, index)
                }} />
            </div>
            <button onClick={() => deleteVendor(index)}>Delete</button>
          </div>
        ))}
        <button
          onClick={addVendor}>+</button>
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
    </div>
  )
}

export default AddKeyboard