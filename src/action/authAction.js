import { authType } from "./type";
import axios from "../helper/axios";

export const signin = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authType.LOGIN_REQUEST });
      const res = await axios.post("/admin/signin", { payload });
      if (res.status === 202) {
        const { user } = res.data;
        localStorage.setItem("status", true);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authType.LOGIN_SUCCESS,
          payload: { user: user },
        });
      }
    } catch (error) {
      //   console.log(error.response.data);
      dispatch({
        type: authType.LOGIN_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
};

export const isLogged = () => {
  return async (dispatch) => {
    const status = localStorage.getItem("status");
    if (status) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authType.LOGIN_SUCCESS,
        payload: { user: user },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authType.LOGOUT_REQUEST });
    const res = await axios.post("/admin/signout");
    if (res.status === 202) {
      localStorage.clear();
      dispatch({ type: authType.LOGOUT_SUCCESS });
    }
  };
};

export const signup = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authType.SIGNUP_REQUEST });
      const res = await axios.post("/admin/signup", { payload });
      if (res.status === 201) {
        console.log("createpass");
      }
    } catch (error) {
      dispatch({
        type: authType.LOGIN_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
};
