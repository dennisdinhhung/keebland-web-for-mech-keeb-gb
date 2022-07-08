import React from 'react'

function SingleInfo({info}) {
  return (
    <div>
      <div className="title">
        {info.name}
      </div>

      <div className="info">
        <img
          src={info.imgUrls?.[0]} alt="img here"
          className="img" />

        <div className="info-title">
          Start Date:
        </div>

        <div>
          {info.startDate?.getDate() + '/'
            + (info.startDate?.getMonth() + 1) + '/'
            + info.startDate?.getFullYear()}
        </div>

        <div className="info-">
          End Date:
        </div>

        <div>
          {info.endDate?.getDate() + '/'
            + (info.endDate?.getMonth() + 1) + '/'
            + info.endDate?.getFullYear()}
        </div>

        <div className="info-title">
          Prices
        </div>

        <div className="price">${info.basePrice}</div>

        <div className="info-title">
          Vendors
        </div>

        <div>
          {info.vendors?.map((vendor, index) => (
            <div key={index}>
              <div>{vendor.region}:</div>
              <div>{vendor.url}</div>
            </div>
          ))}
        </div>

        {/* //TODO: check if there is a geekhack link */}

      </div>
    </div>
  )
}

export default SingleInfo