import React, { useState, useEffect } from "react";
import TotoalSale from "../../component/dashboard/totoalSale";
import Layout from "../../component/layout/layout";
import DatePicker from "react-date-picker";
import { useDispatch } from "react-redux";
import { getFilter, getRevenue } from "../../action/dashboardAction";
import { format } from "date-fns";

function Home() {
  // const [todate, setTodate] = useState(new Date(Date.now() - 86400000));
  // console.log(format(new Date(), "yyyy/MM/dd"));
  const [fromdate, setFromdate] = useState(format(new Date(), "yyyy-MM-dd"));

  // const [year, setYear] = useState(format(new Date(), "yyyy"));

  const dispatch = useDispatch();

  useEffect(() => {
    // const getdate = new Date(Date.now(fromdate) + 86400000);
    // const getdate = new Date().getTime();
    // const todate = format(getdate, "yyyy-MM-dd");

    const tomorrow = new Date(fromdate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const todate = format(tomorrow, "yyyy-MM-dd");

    // console.log(fromdate, todate);
    const payload = { fromdate, todate };
    dispatch(getRevenue(payload));
    dispatch(getFilter());
  }, [fromdate]);

  return (
    <div>
      <Layout sidebar>
        {/* <DatePicker onChange={setFromdate} value={fromdate} />
        <DatePicker onChange={setTodate} value={todate} /> */}
        <input
          type="date"
          value={fromdate}
          onChange={(e) => setFromdate(e.target.value)}
        ></input>
        <TotoalSale />
      </Layout>
    </div>
  );
}

export default Home;
