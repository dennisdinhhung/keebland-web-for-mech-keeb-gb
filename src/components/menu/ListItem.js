import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { BsChevronDoubleRight, BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSavedEntry } from '../../state/reducer/action'
import { db } from '../../utils/firebase-config'

function ListItem({ data, savedEntry }) {
  // const savedState = useSelector((state) => state.savedEntry);
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const [ saveIcon, setSaveIcon ] = useState(false)

  useEffect(()=>{
    
  }, [])

  const daysLeft = (endDate) => {
    const currentDate = new Date()
    const diff = endDate.getTime() - currentDate.getTime();

    if (diff <= 0) {
      return 'Ended'
    }

    const diffInDays = Number((diff / (1000 * 3600 * 24)).toFixed(0));
    return diffInDays
  }

  const handleDelete = (id, type) => {
    const itemDoc = doc(db, type, id);
    deleteDoc(itemDoc)
  }

  const onSavedClick =  async (type, id) => {
    //save id into appropriate type's list of the user
    //update the firebase info
    const isIncluded = savedEntry[type].includes(id)
    const newList = isIncluded ? savedEntry[type].filter(item => item !== id) : [...savedEntry[type], id]

    const newEntry = {...savedEntry, [type]: newList}
    const editDoc = doc(db, 'savedEntry', savedEntry.id)
    delete newEntry.id

    await updateDoc(editDoc, newEntry)

    dispatch(
      setSavedEntry({
        ...savedEntry,
        [type]: newList
      })
    )
  }

  return (
    <div className="center">
      <div className="list-item">
        {data.map((item, index) => (
          <div
            className="item"
            key={index}>
            <img
              src={item.imgUrls[0]} alt="img here"
              className="img" />

            <div className="info">
              <div className="name">{item.name}</div>

              <div 
                className="save-icon"
                onClick={() => {
                  onSavedClick(item.tag.type, item.id)
                }}>
                {savedEntry[item.tag.type].includes(item.id) ? <BsBookmarkFill/> : <BsBookmark/>} 
                {/* //TODO: this should check the database to see if the item is saved */}
              </div>
              <div className="tags">
                <div className="tag">{item.tag.status}</div>
              </div>


              <div className="start-date row-info">
                <div className="date-title">Start Date:</div>

                <div className="date">
                  {/* compensate getMonth() index from 0 */}
                  {item.startDate.getDate() + '/'
                    + (item.startDate.getMonth() + 1) + '/'
                    + item.startDate.getFullYear()}
                </div>
              </div>

              <div className="end-date row-info">
                <div className="date-title">End Date:</div>

                <div className="date">
                  {/* compensate getMonth() index from 0 */}
                  {item.endDate.getDate() + '/'
                    + (item.endDate.getMonth() + 1) + '/'
                    + item.endDate.getFullYear()}
                </div>
              </div>

              <div className="base-price row-info">
                <div className="price-title">Base Price:</div>
                <div className="price">${item.basePrice}</div>
              </div>

              <button
                className="see-more"
                onClick={() => { redirect(item.id) }}>
                See more
                <BsChevronDoubleRight className="icon" />
              </button>

              <div className="div-days-left">
                Days left: {daysLeft(item.endDate)}
              </div>

              <button
                onClick={() => { redirect(`edit/${item.id}`) }}>
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id, item.tag.type)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListItem