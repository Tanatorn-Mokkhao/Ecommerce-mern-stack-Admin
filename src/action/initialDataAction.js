import { categoryType, productType } from "./type";
import axios from "../helper/axios";

export const initialData = () => {
  return async (dispatch) => {
    dispatch({ type: categoryType.GET_ALL_CATEGORTY_REQUEST });
    const res = await axios.post("/initial/category");
    if (res.status === 200) {
      dispatch({
        type: categoryType.GET_ALL_CATEGORTY_SUCCESS,
        payload: { category: res.data.listcategory },
      });
      dispatch({
        type: productType.GET_ALL_PRODUCT_SUCCESS,
        payload: res.data,
      });
    }
  };
};
