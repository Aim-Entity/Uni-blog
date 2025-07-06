import {
  postRegisterUser
} from "../../../helpers/fakebackend_helper";

// action
import {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
  // apiErrorChange
} from "./reducer";


// Is user register successfull then direct plot user in redux.
export const registerUser = (user : any) => async (dispatch : any) => {
  try {
    let response;

    response = await postRegisterUser(user);
    if (response.status === "success") {
      dispatch(registerUserSuccessful(response));
    } else {
      dispatch(registerUserFailed(response));
    }
  } catch (error : any) {
    dispatch(registerUserFailed(error));
  }
};

export const resetRegisterFlag = () => {
  try {
    const response = resetRegisterFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};
// export const apiError = () => async (dispatch : any) => {
//   try {
//     const response = dispatch(apiErrorChange(false));
//     return response;
//   } catch (error) {
//     return error;
//   }
// };