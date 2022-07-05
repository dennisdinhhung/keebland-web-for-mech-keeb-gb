import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getKeycapsData } from '../../state/reducer/action';
import ListItem from './ListItem';

function Keycaps() {
  //TODO: Show all keycaps items

  const state = useSelector((state) => state.keycaps);
  const redirect = useNavigate()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { keycapsData } = state

  useEffect(() => {
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

      <button
        onClick={() => redirect("add")}>
        Add
      </button>

      <div className="filter">
        <div className="title-filter">
          Filter
        </div>

        {/* //TODO: map the status here as checkboxes */}
      </div>

      {loading ? <div className="loading"></div> : null}

      <ListItem data={keycapsData} />
    </div>
  )
}

export default Keycaps