import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllData } from '../state/reducer/action'
import { BsChevronDoubleRight } from 'react-icons/bs'
import SingleItem from './menu/SingleItem'

function Home() {
  //TODO: Show all live items
  // Get all categories from the database and show them in "end date" order

  const [homeState, savedState] = useSelector((state) => [state.home, state.savedEntry])
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);

  const { allData } = homeState
  const { savedEntry } = savedState

  //?: change this to getting specific data based on what state has been called
  useEffect(() => {
    if (allData.length <= 0) {
      dispatch(getAllData())
    }
    else {
      setLoading(false);
    }
  }, [allData])

  const daysLeft = (endDate) => {
    const currentDate = new Date()
    const diff = endDate.getTime() - currentDate.getTime();

    if (diff <= 0) {
      return 'Ended'
    }

    const diffInDays = Number((diff / (1000 * 3600 * 24)).toFixed(0));
    return diffInDays
  }

  return (
    <div className='Home OutletCommon'>
      <div className="title">
        Home
      </div>

      {loading ? <div className="loading"></div> : null}

      <div className="center">
        <div className="list-item">
          {allData.map((item, index) => (
            <SingleItem item={item} index={index} savedEntry={savedEntry}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home