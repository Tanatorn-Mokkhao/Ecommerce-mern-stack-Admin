import React from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
export default function layout(props) {
  return (
    <div>
      <Header />
      {props.sidebar ? <Sidebar>{props.children}</Sidebar> : props.children}
    </div>
  );
}
