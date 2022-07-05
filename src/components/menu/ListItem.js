import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { BsChevronDoubleRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { db } from '../../utils/firebase-config'

function ListItem({ data }) {
  const redirect = useNavigate()

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