import { async } from '@firebase/util';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getKeyboardData, setKeyboardInfo } from '../../state/reducer/action';

function KeyboardInfo() {
    const params = useParams();
    const state = useSelector((state) => state.keyboard);
    const redirect = useNavigate()
    const dispatch = useDispatch();
    const { keyboardInfo, keyboardData } = state
    const { keyboardId } = params

    const assignKbInfo = () => {
        keyboardData.map((keyboard) => {
            if (keyboard.id == keyboardId) {
                dispatch(
                    setKeyboardInfo(keyboard)
                )
            }
        })
    }

    useEffect(() => {
        if (keyboardData.length <= 0){
            dispatch(getKeyboardData())
        }
        else{
            assignKbInfo()
        }
    }, [keyboardData])

    return (
        <div className='KeyboardInfo OutletCommon'>
            <button
                onClick={() => redirect('/keyboard')}
                >
                Back
            </button>
            <div className="title">
                {keyboardInfo.name}
            </div>

            <div className="info">
                <img 
                    src={keyboardInfo.imgUrls?.[0]} alt="img here"
                    className="img" />

                <div className="info-title">
                    Start Date:
                </div>

                <div>
                    {keyboardInfo.startDate?.getDate() + '/'
                      + (keyboardInfo.startDate?.getMonth()+1) + '/'
                      + keyboardInfo.startDate?.getFullYear()}
                </div>

                <div className="info-">
                    End Date:
                </div>

                <div>
                    {keyboardInfo.endDate?.getDate() + '/'
                      + (keyboardInfo.endDate?.getMonth()+1) + '/'
                      + keyboardInfo.endDate?.getFullYear()}
                </div>

                <div className="info-title">
                    Prices
                </div>

                <div className="price">${keyboardInfo.basePrice}</div>

                <div className="info-title">
                    Vendors
                </div>

                <div>
                    {keyboardInfo.vendors?.map((vendor, index) => (
                        <div key={index}>
                            <div>{vendor.region}:</div>
                            <div>{vendor.url}</div>
                        </div>
                    ))}
                </div>

                {/* //TODO: check if there is a geekhack link */}

            </div>
        </div>
    )
}

export default KeyboardInfo