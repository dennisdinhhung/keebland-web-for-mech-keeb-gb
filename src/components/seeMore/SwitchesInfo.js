import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getSwitchesData, setSwitchesInfo } from '../../state/reducer/action';
import SingleInfo from './SingleInfo';

function SwitchesInfo() {
  const params = useParams();
  const state = useSelector((state) => state.switches);
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const { switchesInfo, switchesData } = state;
  const { switchesId } = params;

  const assignInfo = () => {
    switchesData.map((switches) => {
      if (switches.id == switchesId) {
        dispatch(
          setSwitchesInfo(switches)
        )
      }
    })
  }

  useEffect(() => {
    if (switchesData.length <= 0) {
      dispatch(getSwitchesData())
    }
    else {
      assignInfo()
    }
  }, [switchesData])

  return (
    <div className='OutletCommon'>
      <button
        onClick={() => redirect('/keyboards')}
      >
        Back
      </button>
      
      <SingleInfo info={switchesInfo}/>
    </div>
  )
}

export default SwitchesInfo