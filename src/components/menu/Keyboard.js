import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getKeyboardData } from '../../state/reducer/action';

function Keyboard() {
  //TODO: Show all keyboard items
  
  //acquire state from kyeboard reducer with useSelector
  const state = useSelector((state) => state.keyboard)

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  const { keyboardData } = state

  useEffect(() => {
    dispatch(getKeyboardData())
    setLoading(false)
  }, [])

  console.log(keyboardData, 'data')

  return (
    <div className='Keyboard'>
      <div className="title">
        Keyboards
      </div>

      <div className="list">
        {loading ? <div>Loading</div> : ''}
        {keyboardData.map((item) => (
          <div className='item'>
            <div className='name'>
              {item.name}
            </div>

            <div className="tags">
              {item.tags.map((inner) => (
                <div className="tag">
                  {inner}
                </div>
              ))}
            </div>

            <div className="info">
              <div className="start-date">
                <div className="date-title">
                  Start Date
                </div>

                <div className="date">
                  {/* {item.startDate} */}
                </div>
              </div>

              <div className="end-date">

              </div>

              <div className="base-price">

              </div>

              <button className='see-more'>
                See more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Keyboard