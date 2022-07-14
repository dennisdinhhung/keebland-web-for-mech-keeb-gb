import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setKeycapsState } from '../../state/reducer/action'
import { db } from '../../utils/firebase-config'
import { statusList } from '../constants/statusList'

function AddKeycaps() {
    const state = useSelector((state) => state.keycaps)

    const redirect = useNavigate()

    const dispatch = useDispatch()

    const { keycaps } = state

    // useEffect(() => {
    //     resetState()
    // }, [])

    const resetState = () => {
        dispatch(setKeycapsState({
            timeCreated: {
                seconds: '',
                nanoseconds: ''
            },

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
    }

    const addUrl = () => {
        dispatch(
            setKeycapsState({ ...keycaps, imgUrls: [...keycaps.imgUrls, ''] })
        )
    }

    const deleteUrl = (index) => {
        const newUrlList = [...keycaps.imgUrls]
        newUrlList.splice(index, 1)

        dispatch(
            setKeycapsState({
                ...keycaps,
                imgUrls: newUrlList
            })
        )
    }

    const addVendor = () => {
        dispatch(
            setKeycapsState({
                ...keycaps,
                vendors: [
                    ...keycaps.vendors,
                    {
                        region: '',
                        url: ''
                    }]
            })
        )
    }

    const handleSetVendors = (e, index) => {
        const newList = [...keycaps.vendors]
        const newObj = { ...keycaps.vendors[index], [e.target.name]: e.target.value }
        newList[index] = newObj
        dispatch(
            setKeycapsState({
                ...keycaps,
                vendors: newList
            })
        )
    }

    const deleteVendor = (index) => {
        const newList = [...keycaps.vendors]
        newList.splice(index, 1)

        dispatch(
            setKeycapsState({
                ...keycaps,
                vendors: newList
            })
        )
    }

    const handleSubmit = async () => {
        const collectionRef = collection(db, 'keycaps')

        const fireKeycaps = {...keycaps}
        fireKeycaps.timeCreated = Timestamp.fromDate(new Date())
        fireKeycaps.startDate = Timestamp.fromDate(new Date(fireKeycaps.startDate))
        fireKeycaps.endDate = Timestamp.fromDate(new Date(fireKeycaps.endDate))

        await addDoc(collectionRef, fireKeycaps)

        dispatch(setKeycapsState({
            imgUrls: [],
            name: '',
            tag: {
                status: '',
                type: 'keycaps'
            },
            startDate: '',
            endDate: '',
            basePrice: '',

            vendors: [],
            geekhack: ''
        }))

        redirect('/keycaps')
    }

    return (
        <div className='Add  OutletCommon'>
            <div className="title">
                Add Keycaps
            </div>

            <div className="input-title">Name</div>
            <input
                type="text"
                className='input'
                value={keycaps.name}
                onChange={(e) => {
                    dispatch(
                        setKeycapsState({
                            ...keycaps,
                            name: e.target.value
                        }))
                }}
            />

            <div className="input-title">
                Image URLs
            </div>

            <div className="input">
                {keycaps.imgUrls.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                                const newList = [...keycaps.imgUrls]
                                newList[index] = e.target.value
                                dispatch(
                                    setKeycapsState({
                                        ...keycaps,
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
                value={keycaps.tag.status}
                onChange={(e) => {
                    dispatch(
                        setKeycapsState(
                            {
                                ...keycaps,
                                tag: {
                                    ...keycaps.tag,
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
            {//TODO: Date time
            }
            <input
                type="date"
                className='input'
                value={keycaps.startDate}
                onChange={(e) => {
                    dispatch(
                        setKeycapsState({
                            ...keycaps,
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
                value={keycaps.endDate}
                onChange={(e) => {
                    dispatch(
                        setKeycapsState({
                            ...keycaps,
                            endDate: e.target.value
                        })
                    )
                }}
            />

            <div className="input-title">Base Price</div>
            <input
                type="number"
                className='input'
                value={keycaps.basePrice}
                onChange={(e) => {
                    dispatch(
                        setKeycapsState({
                            ...keycaps,
                            basePrice: e.target.value
                        }))
                }}
            />

            <div className="input-title">Vendors</div>
            <div className='vendors'>
                {// TODO: have an field add button for input region, input vendor's name and input to link to shop
                }
                {keycaps.vendors.map((vendor, index) => (
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
                value={keycaps.geekhack}
                onChange={(e) => {
                    dispatch(
                        setKeycapsState({
                            ...keycaps,
                            geekhack: e.target.value
                        }))
                }}
            />

            <button
                className='btn-add'
                onClick={() => handleSubmit()}>
                Add
            </button>
        </div>
    )
}

export default AddKeycaps