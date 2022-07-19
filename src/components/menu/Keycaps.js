import React, { useEffect, useState } from 'react'
import { BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getKeycapsData, getSavedEntry } from '../../state/reducer/action';
import { useAuth } from '../../utils/AuthProvider';
import ListItem from './ListItem';

function Keycaps() {
  const [ keycapsState, savedState] = useSelector((state) => [state.keycaps, state.savedEntry]);
  const { authUser } = useAuth();
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { keycapsData } = keycapsState;
  const { savedEntry } = savedState

  useEffect(() => {
    // dispatch(getSavedEntry(authUser.uid));

    if (keycapsData.length <= 0) {
      console.log('test')
      dispatch(getKeycapsData());
    }
    else {
      setLoading(false);
    }
  }, [keycapsData]);

  return (
    <div className='Keycaps OutletCommon'>
      <div className="title">
        Keycaps
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

      <ListItem data={keycapsData} savedEntry={savedEntry}/>
    </div>
  )
}

export default Keycaps