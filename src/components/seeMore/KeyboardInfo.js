import { async } from '@firebase/util';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getKeyboardData, setKeyboardInfo } from '../../state/reducer/action';
import SingleInfo from './SingleInfo';

function KeyboardInfo() {
  const params = useParams();
  const state = useSelector((state) => state.keyboard);
  const redirect = useNavigate()
  const dispatch = useDispatch();
  const { keyboardInfo, keyboardData } = state
  const { keyboardId } = params

  const assignInfo = () => {
    keyboardData.map((keyboard) => {
      if (keyboard.id == keyboardId) {
        dispatch(
          setKeyboardInfo(keyboard)
        )
      }
    })
  }

  useEffect(() => {
    if (keyboardData.length <= 0) {
      dispatch(getKeyboardData())
    }
    else {
      assignInfo()
    }
  }, [keyboardData])

  return (
    <div className='KeyboardInfo OutletCommon'>
      <button
        onClick={() => redirect('/keyboards')}
      >
        Back
      </button>
      
      <SingleInfo info={keyboardInfo}/>
    </div>
  )
}

export default KeyboardInfo