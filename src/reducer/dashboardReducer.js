import { reportType } from "../action/type";

const initialState = {
  report: [],
  loading: false,
  error: null,
  filter: [],
  privot: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case reportType.GET_REVENUE_REQUST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case reportType.GET_REVENUE_SUCCESS:
      state = {
        ...state,
        loading: false,
        report: action.payload.revenue,
      };
      break;
    case reportType.GET_REVENUE_FALIURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case reportType.GET_FILTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case reportType.GET_FILTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        filter: action.payload.filter,
      };
      break;
    case reportType.GET_FILTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case reportType.GET_PRIVOT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case reportType.GET_PRIVOT_SUCCESS:
      state = {
        ...state,
        loading: false,
        privot: action.payload.privot,
      };
      break;
    case reportType.GET_PRIVOT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
