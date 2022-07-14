import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getAllSavedEntry } from '../../state/reducer/action'
import { useAuth } from '../../utils/AuthProvider'
import Login from './Login'
import SignUp from './SignUp'

function Authentication() {
  const { authUser } = useAuth()
  const dispatch = useDispatch()
  const savedState = useSelector((state) => state.savedEntry);
  const { allSavedEntry } = savedState

  const isIncluded = (uid) => {
    let output = false
    allSavedEntry.filter((savedEntry) => savedEntry.uid === uid ? output = true : output = false)
    return output
  }

  if (authUser) {
    dispatch(getAllSavedEntry())

    const isIncludes = isIncluded(authUser.uid)
    if (!isIncludes) {
      // create new doc
      console.log('create')
    }

    return <Navigate to='/user' />
  }

  return (
    <div className='OutletCommon'>
      <Login />
      <SignUp />
    </div>
  )
}

export default Authentication