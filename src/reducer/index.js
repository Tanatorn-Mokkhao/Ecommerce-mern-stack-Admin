import { combineReducers } from "redux";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
});

export default rootReducer;
