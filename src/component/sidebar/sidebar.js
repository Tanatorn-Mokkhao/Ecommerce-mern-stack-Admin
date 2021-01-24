import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

function Sidebar(props) {
  return (
    <div className="grid1">
      <div className="sidebar">
        <NavLink to="/">
          <p>Home</p>
        </NavLink>
        <NavLink to="/category">
          <p>Category</p>
        </NavLink>
        <NavLink to="/product">
          <p>Product</p>
        </NavLink>
      </div>
      <div className="main-field">{props.children}</div>
    </div>
  );
}

export default Sidebar;
