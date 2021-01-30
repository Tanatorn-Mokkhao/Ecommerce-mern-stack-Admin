import { orderType } from "./type";
import axios from "../helper/axios";

export const getOrder = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderType.GET_ORDER_REQUEST });
      const res = await axios.post("/get/order");
      if (res.status == 200) {
        dispatch({
          type: orderType.GET_ORDER_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const updateStatus = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/change/status", { payload });
      if (res.status == 200) {
        console.log("pass");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
