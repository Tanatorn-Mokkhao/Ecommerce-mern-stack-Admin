import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/layout";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, updateStatus } from "../../action/orderAction";
import { format } from "date-fns";
import { Modal, Button } from "react-bootstrap";
function Order() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [orderid, serOrderid] = useState("");
  const [status, setStatus] = useState("");
  const order = useSelector((state) => state.order);

  const handleClose = () => setShow(false);

  const handleShow = (data) => {
    serOrderid(data._id);
    setShow(true);
  };

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  const handleSaveChange = () => {
    if (status == "") {
      alert("Please select status");
    } else {
      const payload = { _id: orderid, status };
      dispatch(updateStatus(payload)).then(() => {
        dispatch(getOrder());
      });
      setStatus("");
      setShow(false);
    }
  };

  const renderModalOrder = () => {
    return (
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>status</option>
            <option>pending</option>
            <option>packing</option>
            <option>shipping</option>
            <option>success</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      <Layout sidebar>
        <Table responsive="sm">
          <thead>
            <tr style={{ textAlign: "start" }}>
              <th>#</th>
              <th>ID</th>
              <th>DATE</th>
              <th>CUSTOMER</th>
              <th>PRODUCTNAME</th>
              <th>QUANTITY</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {order.order.map((data, index) => (
              <tr
                key={index}
                style={{ textAlign: "start" }}
                onClick={handleShow.bind(this, data)}
              >
                <td>#</td>
                <td>{data._id}</td>
                <td>
                  {format(new Date(data.createdAt), " yyyy-MM-dd || HH:mm")}
                </td>
                <td>
                  {data.user.firstName} {data.user.lastName}
                </td>
                <td>
                  {data.orderItems.map((_data, index) => (
                    <p key={index}>{_data.product.name}</p>
                  ))}
                </td>
                <td>
                  {data.orderItems.map((_data, index) => (
                    <p key={index}>{_data.quantity}</p>
                  ))}
                </td>

                <td>{data.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {renderModalOrder()}
      </Layout>
    </div>
  );
}

export default Order;
