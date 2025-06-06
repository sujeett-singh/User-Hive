import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";

const AdminPrivate = ({ children }) => {
  let adminID = sessionStorage.getItem("adminID");

  return (
    <div>{adminID ? <Fragment>{children}</Fragment> : <Navigate to="/" />}</div>
  );
};

export default AdminPrivate;
