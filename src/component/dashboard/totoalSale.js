import React, { useEffect, useState } from "react";
import "./totalSale.css";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { format } from "date-fns";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { getPrivot } from "../../action/dashboardAction";

function TotoalSale() {
  const dashboard = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const [year, setYear] = useState(format(new Date(), "yyyy"));

  useEffect(() => {
    dispatch(getPrivot(year));
  }, [year]);

  // const data = [
  //   { year: "1950", population: 1000 },
  //   { year: "1960", population: 2000 },
  //   { year: "1970", population: 500 },
  //   { year: "1980", population: 5000 },
  //   { year: "1990", population: 8000 },
  //   { year: "2000", population: 300 },
  //   { year: "2010", population: 10000 },
  //   { year: "20111", population: 10000 },
  // ];
  const renderPrivotData = () => {
    const list = [];
    dashboard.privot.map((data, index) => {
      list.push({ year: `${data._id.month}`, population: data.totalsale });
    });
    console.log(list);
    return list;
  };

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
        <div>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {dashboard.filter.map((data) => (
              <option key={data._id}>{data._id}</option>
            ))}
          </select>
        </div>
        <div>
          <Paper>
            <Chart data={renderPrivotData()}>
              <ArgumentAxis />
              <ValueAxis max={12} />
              <BarSeries valueField="population" argumentField="year" />
              <Title text="Revenue each month" />
              <Animation />
            </Chart>
          </Paper>
        </div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  );
}

export default TotoalSale;
