import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getSavedEntry, getSwitchesData } from '../../state/reducer/action'
import { useAuth } from '../../utils/AuthProvider'
import { BsPlusLg } from "react-icons/bs";
import ListItem from './ListItem'

function Switches() {
  const [ switchesState, savedState] = useSelector((state) => [state.switches, state.savedEntry]);
  const { authUser } = useAuth();
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const { switchesData } = switchesState
  const { savedEntry } = savedState

  useEffect(() => {
    // dispatch(getSavedEntry(authUser.uid));

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

      {authUser ? (
        <button
        className="btn-add"
        onClick={() => {
          redirect("add")
        }}
        >
          <BsPlusLg className="icon"/>
          Add
      </button>
      ) : ''}

      <div className="filter">
        <div className="title-filter">
          Filter
        </div>

        {/* //TODO: map the status here as checkboxes */}
      </div>

      {loading ? <div className="loading"></div> : null}
      
      <ListItem data={switchesData} savedEntry={savedEntry}/>
    </div>
  )
}

export default Switches