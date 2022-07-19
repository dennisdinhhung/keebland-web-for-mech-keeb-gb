import React from 'react'
import SingleItem from './SingleItem'

function ListItem({ data, savedEntry }) {
  // const savedState = useSelector((state) => state.savedEntry);

  return (
    <div className="center">
      <div className="list-item">
        {data.map((item, index) => (
          <SingleItem item={item} index={index} savedEntry={savedEntry}/>
        ))}
      </div>
    </div>
  )
}

export default ListItem