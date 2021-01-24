import { productType } from "./type";
import axios from "../helper/axios";
export const createProduct = (form) => {
  return async (dispatch) => {
    dispatch({ type: productType.ADD_NEW_PRODUCT_REQUEST });
    try {
      const res = await axios.post("/create/product", form);
      if (res.status == 201) {
        console.log("create success");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const getProduct = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/get/product");
      if (res.status == 200) {
        dispatch({
          type: productType.GET_ALL_PRODUCT_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error.repose);
    }
  };
};

export const deleteProductIndatabase = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/delete/product", { payload });
      if (res.status == 200) {
        console.log("Delete Success");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
