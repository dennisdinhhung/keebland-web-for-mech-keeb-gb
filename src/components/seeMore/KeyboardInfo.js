import React from 'react'
import { useParams } from 'react-router-dom'

function KeyboardInfo() {
    const params = useParams();

    const { keyboardId } = params

    console.log(keyboardId)
    
    return (
        <div className='KeyboardInfo OutletCommon'>
            <div className="title">
                {//TODO: insert title here
                }
                {keyboardId}
            </div>

            <div className="inf">
                <img src="" alt="img" />
                <div className="info-title">
                    Dates
                </div>

                <div className="info-title">
                    Prices
                </div>

                <div className="info-title">
                    Vendors
                </div>

                {/* //TODO: check if there is a geekhack link */}

            </div>
        </div>
    )
}

export default KeyboardInfo