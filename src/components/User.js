import React, { useEffect } from 'react'
import { BsDoorOpenFill, BsBoxArrowRight, BsPersonCircle } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { getAllData, getAllSavedEntry, getSavedEntry, setSavedEntry } from '../state/reducer/action'
import { useAuth } from '../utils/AuthProvider'
import SingleItem from './menu/SingleItem'

function User() {
  const [savedState, allDataState] = useSelector((state) => [state.savedEntry, state.home])
  const { authUser, logout } = useAuth()
  const redirect = useNavigate()
  const dispatch = useDispatch()

  const { allData } = allDataState
  const { savedEntry } = savedState

  useEffect(() => {
    if (allData.length <= 0) {
      dispatch(getAllData())
    }
  }, [allData])

  useEffect(()=>{
    dispatch(getSavedEntry(authUser.uid))
  }, [])

  if (!authUser) {
    return <Navigate to='/login' />
  }

  const handleLogOut = async () => {
    try {
      await logout();
      dispatch(
        setSavedEntry({
          uid: '',
          keyboards: [],
          keycaps: [],
          switches: []
        })
      )
      redirect('/login')
    } catch {
      console.log('Failed to log out')
    }
  }

  return (
    <div className='OutletCommon'>
      <div className="title">
        User Profile
      </div>

      <div className="user-info">
        <div>{console.log(authUser, 'user')}</div>
        <div className="profile-img">
          <BsPersonCircle />
        </div>

        <div className="info">
          <div className="user-name">
            {authUser.displayName ? authUser.displayName : authUser.email}
          </div>

          <div className="creation-time">
            Joined: {authUser.metadata.creationTime}
          </div>

          <button
            className='btn-text'
            onClick={handleLogOut}>
            <BsBoxArrowRight className='logout-icon'/>
            Log Out
          </button>
        </div>
      </div>

      <div className="list-item">
        {console.log(savedEntry, 'savedEntry')}
        {savedEntry.keyboards.map((id, index) => {
          return allData.map((item, index) => {
            if (id === item.id) {
              console.log(item, 'user item')
              return (
                <div><SingleItem item={item} index={index} savedEntry={savedEntry} /></div>
              )
            }
          })
        })
        }
        {savedEntry.keycaps.map((id, index) => {
          // <div>ew</div>
          return allData.map((item, index) => {
            if (id === item.id) {
              console.log(item, 'user item')
              return (
                <div><SingleItem item={item} index={index} savedEntry={savedEntry} /></div>
              )
            }
          })
        })
        }
        {savedEntry.switches.map((id, index) => {
          // <div>ew</div>
          return allData.map((item, index) => {
            if (id === item.id) {
              console.log(item, 'user item')
              return (
                <div><SingleItem item={item} index={index} savedEntry={savedEntry} /></div>
              )
            }
          })
        })
        }
      </div>
    </div>
  )
}

export default User