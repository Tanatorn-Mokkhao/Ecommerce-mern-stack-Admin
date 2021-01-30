import React from "react";
import "./totalSale.css";
import { useDispatch, useSelector } from "react-redux";
function TotoalSale() {
  const dashboard = useSelector((state) => state.dashboard);
  return (
    <div>
      <div className="dash-board">
        <div className="count">
          <div className="sale-revenue">
            <p
              style={{
                fontSize: "20px",
                marginRight: "10px",
                direction: "rtl",
                marginTop: "10px",
              }}
            >
              Sale Revenue
            </p>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                direction: "rtl",
                marginRight: "10px",
              }}
            >
              ${dashboard.report}
            </p>
            <hr style={{ width: "95%" }} />
          </div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  );
}

export default TotoalSale;
