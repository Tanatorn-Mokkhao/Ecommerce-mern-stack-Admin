import { category, categoryType } from "./type";
import axios from "../helper/axios";

export const addCategory = (payload) => {
  return async (dispatch) => {
    dispatch({ type: categoryType.ADD_CATEGORY_REQUEST });
    const res = await axios.post("/create/category", { payload });
    if (res.status === 201) {
      console.log("add new category ok");
    }
  };
};

export const getCategory = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: categoryType.GET_ALL_CATEGORTY_REQUEST });
      const res = await axios.post("/get/category");
      console.log(res.status);
      if (res.status === 200) {
        dispatch({
          type: categoryType.GET_ALL_CATEGORTY_SUCCESS,
          payload: { category: res.data.categoryList },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const upDateCategory = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/update/category", { payload });
      if (res.status === 200) {
        // console.log("test");
        // const res = await axios.post("/get/category");
        // dispatch({
        //   type: categoryType.GET_ALL_CATEGORTY_SUCCESS,
        //   payload: { category: res.data.categoryList },
        // });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const deleteCategory = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/delete/category", { payload });
      if (res.status === 200) {
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
