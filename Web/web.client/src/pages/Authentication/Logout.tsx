import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { logoutUser } from "../../slices/thunks";

import withRouter from "../../Components/Common/withRouter";
import { useDispatch } from "react-redux";

const Logout = (props : any) => {
  const dispatch : any = useDispatch();


  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return <Navigate to="/login" />;

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};


export default withRouter(Logout);