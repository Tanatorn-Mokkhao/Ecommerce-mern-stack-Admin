import { productType } from "../action/type";

const initailState = {
  product: [],
  laoding: false,
  error: [],
};

export default (state = initailState, action) => {
  switch (action.type) {
    case productType.GET_ALL_PRODUCT_REQUEST:
      state = {
        ...state,
        laoding: true,
      };
      break;
    case productType.GET_ALL_PRODUCT_SUCCESS:
      state = {
        ...state,
        product: action.payload.product,
      };
      break;
    case productType.UPDATE_PRODUCT_REQUEST:
      state = {
        ...state,
        laoding: true,
      };
      break;
    case productType.UPDATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        laoding: false,
      };
      break;
    case productType.UPDATE_PRODUCT_FAILURE:
      state = {
        ...state,
        laoding: true,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
