import { reportType } from "./type";
import axios from "../helper/axios";

export const getRevenue = (payload) => {
  return async (dispatch) => {
    dispatch({ type: reportType.GET_REVENUE_REQUST });

    const res = await axios.post("/get/dashboard", { payload });
    if (res.status === 200) {
      console.log();
      dispatch({
        type: reportType.GET_REVENUE_SUCCESS,
        payload: res.data,
      });
    }
  };
};

export const getFilter = () => {
  return async (dispatch) => {
    dispatch({ type: reportType.GET_FILTER_REQUEST });
    try {
      const res = await axios.post("/get/filter");
      if (res.status === 200) {
        dispatch({
          type: reportType.GET_FILTER_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const getPrivot = (year) => {
  return async (dispatch) => {
    try {
      dispatch({ type: reportType.GET_PRIVOT_REQUEST });
      const res = await axios.post("/get/privot", { year });
      if (res.status === 200) {
        dispatch({
          type: reportType.GET_PRIVOT_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error.reponse);
    }
  };
};
