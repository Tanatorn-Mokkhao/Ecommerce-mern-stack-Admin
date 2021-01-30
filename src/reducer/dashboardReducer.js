import { reportType } from "../action/type";

const initialState = {
  report: [],
  loading: false,
  error: null,
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
  }
  return state;
};
