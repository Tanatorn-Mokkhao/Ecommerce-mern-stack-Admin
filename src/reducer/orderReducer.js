import { orderType } from "../action/type";

const initialState = {
  order: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case orderType.GET_ORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderType.GET_ORDER_SUCCESS:
      state = {
        ...state,
        order: action.payload.order,
        loading: false,
      };
      break;
    case orderType.GET_ORDER_FAILURE:
      state = {
        ...state,
        order: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};
