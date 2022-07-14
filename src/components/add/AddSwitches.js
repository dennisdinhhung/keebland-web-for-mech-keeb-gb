import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSwitchesState } from '../../state/reducer/action'
import { db } from '../../utils/firebase-config'
import { statusList } from '../constants/statusList'

function AddSwitches() {
  const state = useSelector((state) => state.switches)
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const { switches } = state

  const addUrl = (e) => {
    dispatch(
      setSwitchesState({ ...switches, imgUrls: [...switches.imgUrls, ''] })
    )
  }

  const deleteUrl = (index) => {
    const newUrlList = [...switches.imgUrls]
    newUrlList.splice(index, 1)

    dispatch(
      setSwitchesState({
        ...switches,
        imgUrls: newUrlList
      })
    )
  }

  const addVendor = () => {
    dispatch(
      setSwitchesState({
        ...switches,
        vendors: [
          ...switches.vendors,
          {
            region: '',
            url: ''
          }]
      })
    )
  }

  const handleSetVendors = (e, index) => {
    const newList = [...switches.vendors]
    const newObj = { ...switches.vendors[index], [e.target.name]: e.target.value }
    newList[index] = newObj
    dispatch(
      setSwitchesState({
        ...switches,
        vendors: newList
      })
    )
  }

  const deleteVendor = (index) => {
    const newList = [...switches.vendors]
    newList.splice(index, 1)

    dispatch(
      setSwitchesState({
        ...switches,
        vendors: newList
      })
    )
  }

  const handleSubmit = async () => {
    const collectionRef = collection(db, 'switches')

    const fireSwitches = {...switches}
    fireSwitches.timeCreated = Timestamp.fromDate(new Date())
    fireSwitches.startDate = Timestamp.fromDate(new Date(fireSwitches.startDate))
    fireSwitches.endDate = Timestamp.fromDate(new Date(fireSwitches.endDate))

    await addDoc(collectionRef, fireSwitches)

    console.log(switches, 'switchesState')

    dispatch(setSwitchesState({
      imgUrls: [],
      name: '',
      tag: {
        status: '',
        type: 'switches'
      },
      startDate: '',
      endDate: '',
      basePrice: '',

      vendors: [],
      geekhack: ''
    }))

    redirect('/switches')
  }

  return (
    <div className='OutletCommon'>
      <div className="title">
        Add Switches
      </div>

      <div className="input-title">Name</div>
      <input
        type="text"
        className='input'
        value={switches.name}
        onChange={(e) => {
          dispatch(
            setSwitchesState({
              ...switches,
              name: e.target.value
            }))
        }}
      />

      <div className="input-title">
        Image URLs
      </div>

      <div className="input">
        {switches.imgUrls.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newList = [...switches.imgUrls]
                newList[index] = e.target.value
                dispatch(
                  setSwitchesState({
                    ...switches,
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
        value={switches.tag.status}
        onChange={(e) => {
          dispatch(
            setSwitchesState(
              {
                ...switches,
                tag: {
                  ...switches.tag,
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
        value={switches.startDate}
        onChange={(e) => {
          dispatch(
            setSwitchesState({
              ...switches,
              startDate: e.target.value
            })
          )
        }}
      />

      <div className="input-title">End Date</div>

      <input
        type="date"
        className='input'
        value={switches.endDate}
        onChange={(e) => {
          dispatch(
            setSwitchesState({
              ...switches,
              endDate: e.target.value
            })
          )
        }}
      />

      <div className="input-title">Base Price</div>
      <input
        type="number"
        className='input'
        value={switches.basePrice}
        onChange={(e) => {
          dispatch(
            setSwitchesState({
              ...switches,
              basePrice: e.target.value
            }))
        }}
      />

      <div className="input-title">Vendors</div>
      <div className='vendors'>
        {switches.vendors.map((vendor, index) => (
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
        value={switches.geekhack}
        onChange={(e) => {
          dispatch(
            setSwitchesState({
              ...switches,
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

export default AddSwitches