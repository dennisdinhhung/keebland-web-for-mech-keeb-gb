import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getSwitchesData } from '../../state/reducer/action'
import ListItem from './ListItem'

function Switches() {
  const state = useSelector((state) => state.switches)
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const { switchesData } = state

  useEffect(() => {
    if (switchesData.length <= 0) {
      dispatch(getSwitchesData());
    }
    else {
      setLoading(false);
    }
  }, [switchesData])

  return (
    <div className='Switches OutletCommon'>
      <div className="title">
        Switches
      </div>

      <button
        onClick={() => {
          redirect("add")
        }}>Add</button>

      <div className="filter">
        <div className="title-filter">
          Filter
        </div>

        {/* //TODO: map the status here as checkboxes */}
      </div>

      {loading ? <div className="loading"></div> : null}
      <ListItem data={switchesData}/>
    </div>
  )
}

export default Switches