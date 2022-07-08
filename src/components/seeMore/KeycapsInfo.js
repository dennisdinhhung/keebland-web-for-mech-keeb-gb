import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getKeycapsData, setKeycapsInfo } from '../../state/reducer/action';
import SingleInfo from './SingleInfo';

function KeycapsInfo() {
  const params = useParams();
  const state = useSelector((state) => state.keycaps);
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const { keycapsInfo, keycapsData } = state;
  const { keycapsId } = params;

  const assignInfo = () => {
    keycapsData.map((keycaps) => {
      if (keycaps.id == keycapsId) {
        dispatch(
          setKeycapsInfo(keycaps)
        )
      }
    })
  }

  useEffect(() => {
    if (keycapsData.length <= 0) {
      dispatch(getKeycapsData())
    }
    else {
      assignInfo()
    }
  }, [keycapsData])

  return (
    <div className='OutletCommon'>
      <button
        onClick={() => redirect('/keyboards')}
      >
        Back
      </button>
      
      <SingleInfo info={keycapsInfo}/>
    </div>
  )
}

export default KeycapsInfo