import { combineReducers } from "redux";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import dashboardReducer from "./dashboardReducer";
import orderReducer from "./orderReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  dashboard: dashboardReducer,
  order: orderReducer,
});

export default rootReducer;
