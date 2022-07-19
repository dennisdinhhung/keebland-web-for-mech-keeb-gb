import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKeyboardData, getSavedEntry } from "../../state/reducer/action";
import '../../static/css/OutletCommon.scss'
import { useAuth } from "../../utils/AuthProvider";
import ListItem from "./ListItem";

function Keyboard() {
  //acquire state from keyboard reducer with useSelector
  const [keyboardState, savedState] = useSelector((state) => [state.keyboard, state.savedEntry]);
  const { authUser } = useAuth()

  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { keyboardData } = keyboardState;
  const { savedEntry } = savedState

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

      {authUser ? (
        <button
        className="btn-add"
        onClick={() => {
          redirect("add")
        }}
        >
          <BsPlusLg className="icon"/>
          Add
      </button>
      ) : ''}

      <div className="filter">
        <div className="title-filter">
          Filter
        </div>

        {/* //TODO: map the status here as checkboxes */}
      </div>

      {loading ? <div className="loading"></div> : null}

      <ListItem data={keyboardData} savedEntry={savedEntry}/>
    </div>
  );
}

export default Keyboard;
