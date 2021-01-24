import { categoryType } from "../action/type";

const initialState = {
  loading: false,
  category: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categoryType.GET_ALL_CATEGORTY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryType.GET_ALL_CATEGORTY_SUCCESS:
      state = {
        ...state,
        category: action.payload.category,
        loading: false,
      };
      break;
    case categoryType.GET_ALL_CATEGORTY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case categoryType.ADD_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryType.ADD_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        category: action.payload.category,
      };
      break;
    case categoryType.ADD_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
