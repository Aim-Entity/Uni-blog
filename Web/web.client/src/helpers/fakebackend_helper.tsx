import { APIClient } from "./api_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

//MVP Auth
type LoginType = {
  email: string,
  password: string,
}

type RegisterType = {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  confirm_password: string
}

export const postLoginUser = (user: LoginType) => api.create("https://localhost:7007/api/CustomAuthentication/CustomLogin", user, {
  withCredentials: true
});

export const postRegisterUser = (user: RegisterType) => api.create("https://localhost:7007/api/CustomAuthentication/CustomRegister", user);