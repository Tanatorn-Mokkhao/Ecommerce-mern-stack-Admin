import { reportType } from "./type";
import axios from "../helper/axios";

export const getRevenue = (payload) => {
  return async (dispatch) => {
    dispatch({ type: reportType.GET_REVENUE_REQUST });

    const res = await axios.post("/get/dashboard", { payload });
    if (res.status == 200) {
      console.log();
      dispatch({
        type: reportType.GET_REVENUE_SUCCESS,
        payload: res.data,
      });
    }
  };
};
