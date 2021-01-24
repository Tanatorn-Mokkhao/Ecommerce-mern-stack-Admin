import { authType } from "../action/type";

const initial = {
  authenticate: false,
  authenticating: false,
  error: null,
  user: [],
  loading: false,
};

export default (state = initial, action) => {
  console.log(action);
  switch (action.type) {
    case authType.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authType.LOGIN_SUCCESS:
      state = {
        ...state,
        authenticate: true,
        authenticating: false,
        user: action.payload.user,
        error: null,
      };
      break;
    case authType.LOGIN_FAILURE:
      state = {
        ...state,
        authenticating: false,
        error: action.payload.error,
      };
      break;
    case authType.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authType.LOGOUT_SUCCESS:
      state = {
        ...initial,
      };
      break;
    case authType.SIGNUP_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authType.SIGNUP_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case authType.SIGNUP_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
