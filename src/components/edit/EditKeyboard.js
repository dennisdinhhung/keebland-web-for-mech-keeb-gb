import { addDoc, collection, doc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getKeyboardData, setKeyboardState } from '../../state/reducer/action';
import { db } from '../../utils/firebase-config';
import { statusList } from '../constants/statusList';

function EditKeyboard() {
  const state = useSelector((state) => state.keyboard)
  const params = useParams();
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const { keyboard, keyboardData } = state
  const { keyboardId } = params

  const assignKbInfo = () => {
    keyboardData.map((keyboard) => {
      if (keyboard.id == keyboardId) {
        dispatch(
          setKeyboardState(keyboard) //* remember to reset this if the user click somewhere else
        )
      }
    })
  }

  useEffect(() => {
    if (keyboardData.length <= 0) {
      dispatch(getKeyboardData())
    }
    else {
      assignKbInfo()
    }
  }, [keyboardData])

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

    fireKeyboard.tag.type = 'keyboard'
    fireKeyboard.timeCreated = Timestamp.fromDate(new Date())
    fireKeyboard.startDate = Timestamp.fromDate(new Date(fireKeyboard.startDate))
    fireKeyboard.endDate = Timestamp.fromDate(new Date(fireKeyboard.endDate))

    console.log(fireKeyboard, 'fire')

    const editDoc = doc(db, 'keyboards', fireKeyboard.id)
    delete fireKeyboard.id
    await updateDoc(editDoc, fireKeyboard)

    dispatch(setKeyboardState({
      imgUrls: [],
      name: '',
      tag: {
        status: '',
        type: ''
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
    <div className='OutletCommon'>
      <button
        onClick={() => redirect('/keyboards')}
      >
        Back
      </button>

      <div className="title">
        EditKeyboard
      </div>

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

export default EditKeyboard