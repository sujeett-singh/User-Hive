import React, { Fragment } from "react";
import style from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Navbar = () => {
  let userID = sessionStorage.getItem("userID");
  let adminID = sessionStorage.getItem("adminID");

  let navigate = useNavigate();

  let logout = () => {
    if (adminID) {
      sessionStorage.removeItem("adminID");
      toast.success("logged out");
      navigate("/");
    } else {
      sessionStorage.removeItem("userID");
      toast.success("logged out");
      navigate("/");
    }
  };

  return (
    <nav id={style.nav}>
      <figure>
        <img src="/hive.png" alt="hive-logo" title="hive" />
      </figure>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>

        {adminID || userID ? (
          <Fragment>
            <li><Link to={adminID ? "/admin" : "/profile"}>profile</Link></li>
            <li className="primary-btn" onClick={logout}>logout</li>
          </Fragment>
        ) : (
          <Fragment>
            <li className="primary-btn login-btn">
              <Link to="/login">login</Link>
            </li>

            <li className="secondary-btn">
              <Link to="/signup">signup</Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
