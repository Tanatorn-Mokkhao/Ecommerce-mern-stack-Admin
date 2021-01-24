import React, { useState, useEffect } from "react";
import Layout from "../../component/layout/layout";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { IoMdAddCircle } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import {
  createProduct,
  getProduct,
  deleteProductIndatabase,
} from "../../action/productAction";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { AiFillDelete } from "react-icons/ai";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function Product() {
  const product = useSelector((state) => state.product);
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [productname, setProductname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrict] = useState("");
  const [description, setDescription] = useState("");
  const [productPicture, setProductPicture] = useState([]);
  const [category, setCategory] = useState([]);

  const [inputname, setInputname] = useState("");
  const [inputquantity, setInputquantity] = useState("");
  const [inputprice, setInputprice] = useState("");
  const [inputcategory, setInputcategory] = useState("");
  const [inputdescription, setInputdescription] = useState("");
  const [inputpicture, setInputpicture] = useState([]);

  const [deletelist, setDeletelist] = useState([]);
  const [senddeletelist, setSenddeletelist] = useState([]);
  const categoryStore = useSelector((state) => state.category);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.product.length > 0) {
      // console.log(product.product.length);
      const test = [];
      for (let i = 0; i < product.product.length; i++) {
        test.push(false);
      }
      // test[4] = true;
      setDeletelist(test);
    }
  }, [product.product]);

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setProductname(product.name);
    setQuantity(product.quantity);
    setPrict(product.price);
    setDescription(product.description);
    setProductPicture(product.picture);
    setCategory(product.category);
    setShow(true);
  };

  const handleChecked = (index, type, id, name) => {
    const list = [...deletelist];
    if (type == "checked") {
      list[index] = true;
      setSenddeletelist([...senddeletelist, { _id: id, name: name }]);
    } else if (type == "unchecked") {
      list[index] = false;
      let listdelete;
      listdelete = senddeletelist.filter((data) => data._id != id);
      setSenddeletelist(listdelete);
    }

    setDeletelist(list);
  };
  const renderTableProduct = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {deleteProduct
            ? product.product.length > 0
              ? product.product.map((data, index) => (
                  <tr key={data._id}>
                    <td>
                      {!deletelist[index] ? (
                        <MdCheckBoxOutlineBlank
                          style={{ cursor: "pointer" }}
                          onClick={handleChecked.bind(
                            this,
                            index,
                            "checked",
                            data._id,
                            data.name
                          )}
                        />
                      ) : (
                        <MdCheckBox
                          style={{ cursor: "pointer" }}
                          onClick={handleChecked.bind(
                            this,
                            index,
                            "unchecked",
                            data._id
                          )}
                        />
                      )}
                      {/* {index + 1} */}
                    </td>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{data.quantity}</td>
                    <td>{data.price}</td>
                    <td>{data.category ? data.category.name : null}</td>
                  </tr>
                ))
              : null
            : product.product.length > 0
            ? product.product.map((data, index) => (
                <tr
                  key={data._id}
                  onClick={() => handleShow(data)}
                  style={{ cursor: "pointer" }}
                >
                  <td></td>
                  {/* <td>{index + 1}</td> */}
                  <td>{data.name}</td>
                  <td>{data.description}</td>
                  <td>{data.quantity}</td>
                  <td>{data.price}</td>
                  <td>{data.category ? data.category.name : null}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };
  const renderModalPopup = () => {
    return (
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <p style={{ fontWeight: "bold" }}>PRODUCTNAME</p>
              {productname}
            </Col>
            <Col>
              <p style={{ fontWeight: "bold" }}>QUANTITY</p>
              {quantity}
            </Col>
            <Col>
              <p style={{ fontWeight: "bold" }}>PRICE</p>
              {price}
              <img
                src="/img/thailand-baht.png"
                width="20px"
                style={{ marginBottom: "5px" }}
              />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <p style={{ fontWeight: "bold" }}>DESCRIPTION</p>
              {description}
            </Col>
            <Col>
              <p style={{ fontWeight: "bold" }}>CATEGORY</p>
              {category.name}
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <p style={{ fontWeight: "bold" }}>PICTURE</p>
              {productPicture.length > 0
                ? productPicture.map((pic) => (
                    <img
                      src={"http://localhost:2000/public/" + pic.img}
                      width="150px"
                      height="150px"
                      className="img-thumbnail"
                      style={{ border: "0px solid" }}
                      key={pic._id}
                    />
                  ))
                : null}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  const createOption = (category, option = []) => {
    for (let cat of category) {
      option.push({
        _id: cat._id,
        name: cat.name,
      });
      if (cat.children.length > 0) {
        createOption(cat.children, option);
      }
    }
    return option;
  };
  const handleCloseAddProduct = () => {
    const form = new FormData();
    form.append("name", inputname);
    form.append("quantity", inputquantity);
    form.append("price", inputprice);
    form.append("description", inputdescription);
    form.append("category", inputcategory);
    for (let pic of inputpicture) {
      form.append("productPictures", pic);
    }
    dispatch(createProduct(form)).then(() => {
      dispatch(getProduct());
    });

    setInputname("");
    setInputquantity("");
    setInputpicture("");
    setInputprice("");
    setInputdescription("");
    setInputcategory("");

    // console.log(
    //   inputname,
    //   inputcategory,
    //   inputquantity,
    //   inputdescription,
    //   inputprice
    // );
  };

  //   const handlePictureArray = (picture) => {
  //     setInputpicture([...inputpicture, picture]);
  //     console.log(inputpicture);
  //   };
  const handlePictureArray = (e) => {
    setInputpicture([...inputpicture, e.target.files[0]]);
  };
  const handledeletePicture = (name) => {
    let listpicture;
    listpicture = inputpicture.filter((data, index) => index != name);
    setInputpicture(listpicture);
  };
  const renderModalAdd = () => {
    return (
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product name"
                value={inputname}
                onChange={(e) => setInputname(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Quantity"
                value={inputquantity}
                onChange={(e) => setInputquantity(e.target.value)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Price"
                value={inputprice}
                onChange={(e) => setInputprice(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Category</Form.Label>
              <br />
              <select
                value={inputcategory}
                onChange={(e) => setInputcategory(e.target.value)}
              >
                <option>Select Category</option>
                {createOption(categoryStore.category).map((data) => (
                  <option key={data._id} value={data._id}>
                    {data.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Description</Form.Label>
              <br />
              <textarea
                style={{ width: "350px", height: "150px" }}
                value={inputdescription}
                onChange={(e) => setInputdescription(e.target.value)}
              ></textarea>
            </Col>
          </Row>
          <Row>
            <Col>
              {inputpicture.length > 0
                ? inputpicture.map((pic, index) => (
                    <p key={index}>
                      {pic.name}{" "}
                      <IoTrashOutline
                        onClick={handledeletePicture.bind(this, index)}
                      />
                    </p>
                  ))
                : null}
              <input
                type="file"
                // onChange={(e) => handlePictureArray(e.target.files[0])}
                onChange={handlePictureArray}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseAddProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const handleCollectionBin = () => {
    if (senddeletelist.length > 0) {
      confirmAlert({
        title: "Are you sure to delete this ",
        message: senddeletelist.map((data, index) => (
          <p key={index}>{data.name}</p>
        )),
        buttons: [
          {
            label: "Yes",
            onClick: () =>
              dispatch(deleteProductIndatabase(senddeletelist)).then(() => {
                dispatch(getProduct());
                setSenddeletelist([]);
              }),
          },
          {
            label: "No",
          },
        ],
      });
    }
  };

  const CancleDelete = () => {
    if (product.product.length > 0) {
      const test = [];
      for (let i = 0; i < product.product.length; i++) {
        test.push(false);
      }
      setDeletelist(test);
    }
    setSenddeletelist([]);
    setDeleteProduct(false);
  };
  return (
    <div>
      <Layout sidebar>
        {/* <IoMdAddCircle
          style={{ position: "fixed", right: "0px" }}
          size="50px"
          onClick={() => setShowAdd(true)}
        /> */}
        <div style={{ position: "fixed", right: "0px" }}>
          <p>
            <IoMdAddCircle size="50px" onClick={() => setShowAdd(true)} />
          </p>
          <p>
            {!deleteProduct ? (
              <IoTrashOutline
                size="50px"
                onClick={() => setDeleteProduct(true)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <>
                <AiFillDelete
                  size="50px"
                  onClick={handleCollectionBin}
                  style={{ cursor: "pointer" }}
                />
                <br />
                <br />
                <ImCross
                  size="35px"
                  onClick={CancleDelete}
                  style={{ cursor: "pointer" }}
                />
              </>
            )}
          </p>
        </div>
        {renderTableProduct()}
        {renderModalPopup()}
        {renderModalAdd()}
      </Layout>
    </div>
  );
}

export default Product;
