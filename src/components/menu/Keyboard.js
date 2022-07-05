import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKeyboardData } from "../../state/reducer/action";
import '../../static/css/OutletCommon.scss'
import ListItem from "./ListItem";

function Keyboard() {
  //acquire state from keyboard reducer with useSelector
  const state = useSelector((state) => state.keyboard);

  const redirect = useNavigate()

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const { keyboardData } = state;

  useEffect(() => {
    if (keyboardData.length <= 0) {
      dispatch(getKeyboardData());
    }
    else {
      setLoading(false);
    }
  }, [keyboardData]);

  return (
    <div className="Keyboard OutletCommon">
      <div className="title">Keyboards</div>

      <button
        onClick={() => {
          redirect("add")
        }}>Add</button>

      <div className="filter">
        <div className="title-filter">
          Filter
        </div>

        {/* //TODO: map the status here as checkboxes */}
      </div>

      {loading ? <div className="loading"></div> : null}

      <ListItem data={keyboardData}/>
    </div>
  );
}

export default Keyboard;
