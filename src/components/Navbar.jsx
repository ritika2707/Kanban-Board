import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import { BsSliders, BsChevronDown } from "react-icons/bs"; //BsSliders2
import { useDispatch, useSelector } from "react-redux";
import { dataSelect } from "../actions/action";


const getSelectedGroup = () => {
  if (localStorage.getItem("selectedGroup")) {
    return localStorage.getItem("selectedGroup");
  } else {
    return "status";
  }
};


const getSelectedOrder = () => {
  if (localStorage.getItem("selectedOrder")) {
    return localStorage.getItem("selectedOrder");
  } else {
    return "priority";
  }
};

const Navbar = () => {
  const [slider, setSlider] = useState(false);
  const dispatch = useDispatch();
  const { tickets, users } = useSelector((state) => state.dataSlice);
  
  // Updated state variable names
  const [selectedGroup, setSelectedGroup] = useState(getSelectedGroup());
  const [selectedOrder, setSelectedOrder] = useState(getSelectedOrder());

  // Updated function names
  const handleSelection = (e, isGroup) => {
    if (isGroup) {
      setSelectedGroup(e.target.value);
      setSlider(!slider);
      localStorage.setItem("selectedGroup", e.target.value);
    } else {
      setSelectedOrder(e.target.value);
      setSlider(!slider);
      localStorage.setItem("selectedOrder", e.target.value);
    }
  };

  useEffect(() => {
    if (selectedGroup === "user") {
      dispatch(
        dataSelect(
          selectedGroup,
          {
            tickets,
            users,
          },
          selectedOrder
        )
      );
    } else {
      dispatch(dataSelect(selectedGroup, tickets, selectedOrder));
    }
  }, [tickets, dispatch, selectedGroup, users, selectedOrder]);

  return (
    <div className="navbar">
      <div className="navbarButton">
        <button className="groupButton" onClick={() => setSlider(!slider)}>
          <BsSliders /> Display <BsChevronDown />
        </button>

        {slider && (
          <>
            <div className="dropDown">
              <div className="group">
                <span style={{ color: "grey" }}>Grouping</span>
                <select
                  value={selectedGroup}
                  onChange={(e) => handleSelection(e, true)}
                  name="selectedGroup"
                  id="selectedGroup"
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              <div className="group">
                <span style={{ color: "grey" }}>Ordering</span>
                <select
                  value={selectedOrder}
                  onChange={(e) => handleSelection(e, false)}
                  name="selectedOrder"
                  id="selectedOrder"
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
