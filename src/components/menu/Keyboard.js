import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKeyboardData } from "../../state/reducer/action";
import { BsChevronDoubleRight } from 'react-icons/bs'
import '../../static/css/OutletCommon.scss'

function Keyboard() {
  //TODO: Show all keyboard items

  //acquire state from keyboard reducer with useSelector
  const state = useSelector((state) => state.keyboard);

  const redirect = useNavigate()

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const { keyboardData } = state;

  useEffect(() => {
    dispatch(getKeyboardData());
    setLoading(false);
  }, []);

  const daysLeft = (endDate) => {
    const currentDate = new Date()
    const diff = endDate.getTime() - currentDate.getTime();

    if (diff <= 0){
      return 'Ended'
    }
    
    const diffInDays = Number((diff / (1000 * 3600 * 24)).toFixed(0));
    return diffInDays
  }

  return (
    <div className="Keyboard OutletCommon">
      <div className="title">Keyboards</div>

      <button
        onClick={() => {
          redirect("add")
        }}>Add</button>

      {loading ? <div>Loading</div> : null}

      <div className="filter">
        <div className="title-filter">
          Filter
        </div>

        {/* //TODO: map the status here as checkboxes */}
      </div>

      <div className="center">
        <div className="list-item">
          {keyboardData.map((item, index) => (
            <div
              className="item"
              key={index}>
              <img 
              src="https://preview.redd.it/bjp4z4yqb2w81.png?width=2560&format=png&auto=webp&s=37f8d85f17e01844e49aa476c9c70792edf5fe1f" alt="img here"
              className="img" />

              <div className="info">
                <div className="name">{item.name}</div>

                <div className="tags">
                  <div className="tag">{item.tag.status}</div>
                  <div className="tag">{item.tag.type}</div>
                </div>


                <div className="start-date row-info">
                  <div className="date-title">Start Date:</div>

                  <div className="date">
                    {item.startDate.getDate() + '/'
                      + item.startDate.getMonth() + '/'
                      + item.startDate.getFullYear()}
                  </div>
                </div>

                <div className="end-date row-info">
                  <div className="date-title">End Date:</div>

                  <div className="date">
                    {item.endDate.getDate() + '/'
                      + item.endDate.getMonth() + '/'
                      + item.endDate.getFullYear()}
                  </div>
                </div>

                <div className="base-price row-info">
                  <div className="price-title">Base Price:</div>
                  <div className="price">${item.basePrice}</div>
                </div>

                <button 
                  className="see-more"
                  onClick={() => {redirect(item.id)}}>
                  See more
                  <BsChevronDoubleRight className="icon"/>
                </button>

                <div className="div-days-left">
                  Days left: {daysLeft(item.endDate)}
                </div>
              </div>
            </div>
          ))}

          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;
