import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKeyboardData } from "../../state/reducer/action";

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

  console.log(keyboardData, "data");

  return (
    <div className="Keyboard">
      <div className="title">Keyboards</div>

      <button
        onClick={() => {
          redirect("add")
        }}>Add</button>

      <div className="list">
        {loading ? <div>Loading</div> : null}

        <div className="filter">
          <div className="title-filter">
            Filter
          </div>

          {/* //TODO: map the status here as checkboxes */}
        </div>

        {keyboardData.map((item, index) => (
          <div 
            className="item"
            key={index}>
            <img src="" alt="img here" />

            <div className="name">{item.name}</div>

            <div className="tags">
              {item.tags.map((inner, index) => (
                <div 
                  className="tag"
                  key={index}>
                    {inner}
                </div>
              ))}
            </div>

            <div className="info">
              <div className="start-date">
                <div className="date-title">Start Date</div>

                <div className="date">
                  {item.startDate.getDate() + '/'
                    + item.startDate.getMonth() + '/'
                    + item.startDate.getFullYear()}
                </div>
              </div>

              <div className="end-date">
                <div className="date-title">End Date</div>

                <div className="date">
                  {item.endDate.getDate() + '/'
                    + item.endDate.getMonth() + '/'
                    + item.endDate.getFullYear()}
                </div>
              </div>

              <div className="base-price">
                <div className="title">Base Price</div>
                <div className="price">${item.basePrice}</div>
              </div>

              <button className="see-more">See more</button>

              <div className="div-days-left">
                Days left: {/* calculate days here */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Keyboard;
