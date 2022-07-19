import { addDoc, collection } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { getAllSavedEntry } from '../../state/reducer/action'
import { useAuth } from '../../utils/AuthProvider'
import { db } from '../../utils/firebase-config'
import Login from './Login'
import SignUp from './SignUp'
import '../../static/css/Authen.scss'

function Authentication() {
  const { authUser } = useAuth()
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const savedState = useSelector((state) => state.savedEntry);
  const { allSavedEntry } = savedState

  const createNewDoc =  async () => {
    console.log(allSavedEntry, 'allSavedEntry')

    if (!allSavedEntry.filter((savedEntry) => savedEntry.uid === authUser.uid).length) {  
      // TODO: create new doc
      const collectionRef = collection(db, 'savedEntry')

      const newSavedDoc = {
        uid: authUser.uid,
        keyboards: [],
        keycaps: [],
        switches: []
      }

      await addDoc(collectionRef, newSavedDoc)
    }
  }

  if (authUser) {
    dispatch(getAllSavedEntry())
    createNewDoc()
    // console.log(allSavedEntry.filter((savedEntry) => savedEntry.uid === authUser.uid), 'filter')
    return <Navigate to='/user'/>
  }

  return (
    <div className='OutletCommon Authen'>
      <Login />
      <SignUp />
    </div>
  )
}

export default Authentication