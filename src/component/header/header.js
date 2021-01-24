import React, { useState } from "react";
import {} from "react-bootstrap";
import "./style.css";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../action/authAction";

function Header() {
  const auth = useSelector((state) => state.auth);
  const [logout, setLogout] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signout());
    setLogout(true);
  };

  const renderLogged = () => {
    return (
      <span onClick={handleLogout}>
        <p>signout</p>
      </span>
    );
  };
  const renderNonLogged = () => {
    return (
      <>
        <NavLink to="/signin">signin</NavLink>
        <NavLink to="/signup">signup</NavLink>
        {logout ? <Redirect to="/signin" /> : null}
      </>
    );
  };

  return (
    <div>
      <div className="grid">
        <div className="header-1">
          <NavLink to="/">
            {" "}
            <img src="img/aws.svg" width="80px" />{" "}
          </NavLink>
        </div>
        <div className="header-2">2</div>
        <div className="header-3">
          {auth.authenticate ? renderLogged() : renderNonLogged()}
        </div>
      </div>
    </div>
  );
}

export default Header;
