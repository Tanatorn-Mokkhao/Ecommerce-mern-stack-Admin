import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./container/home/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "./container/signin/singin";
import { isLogged } from "./action/authAction";
import Private from "./HOC/privateRoutes";
import Signup from "./container/signup/signup";
import Category from "./container/category/category";
import { initialData } from "./action/initialDataAction";
import Product from "./container/product/product";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(async () => {
    if (!auth.authenticate) {
      dispatch(isLogged());
    }

    if (auth.authenticate) {
      dispatch(initialData());
    }
  }, [auth.authenticate]);
  return (
    <div className="App">
      <Switch>
        <Private path="/" exact component={Home} />
        <Private path="/category" component={Category} />
        <Private path="/product" component={Product} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
