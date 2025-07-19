//Include Both Helper File with needed methods
import {
  postLoginUser,
} from "../../../helpers/fakebackend_helper";

import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';

export const loginUser = (user : any, history : any) => async (dispatch : any) => {
  try {
    let response;

    response = await postLoginUser(user);

    if (response) {
      sessionStorage.setItem("authUser", JSON.stringify(response));

      var finallogin : any = JSON.stringify(response);
      finallogin = JSON.parse(finallogin)
      response = finallogin.data;
      if (finallogin.status === "success") {
        dispatch(loginSuccess(response));
        history('/')
      } 
      else {
        dispatch(apiError(finallogin));
      }
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch : any) => {
  try {
    sessionStorage.removeItem("authUser");
    dispatch(logoutUserSuccess(true));

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch : any) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};