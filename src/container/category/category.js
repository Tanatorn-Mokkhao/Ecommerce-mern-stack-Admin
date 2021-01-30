import React, { useState } from "react";
import Layout from "../../component/layout/layout";
import { useSelector, useDispatch } from "react-redux";
import CheckboxTree from "react-checkbox-tree";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./style.css";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoMdCheckboxOutline,
  IoMdCheckbox,
  IoIosArrowDown,
  IoIosArrowForward,
  IoMdSquareOutline,
} from "react-icons/io";
import {
  addCategory,
  deleteCategory,
  getCategory,
  upDateCategory,
} from "../../action/categoryAction";

function Category() {
  const category = useSelector((state) => state.category);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [categoryname, setCategoryName] = useState("");
  const [categoryid, setCategoryid] = useState("");
  const [checkArray, setCheckArray] = useState([]);
  const [expandArray, setExpandArray] = useState([]);
  const [show, setShow] = useState(false);

  const [editmodal, setEditmodal] = useState(false);

  const handleCloseEdit = () => setEditmodal(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  //   if (category.category.length == 0) {
  //     return null;
  //   }
  const renderCategory = (category) => {
    return category.map((cat) => ({
      label: cat.name,
      value: cat._id,
      children: cat.children.length > 0 && renderCategory(cat.children),
    }));
    //   <li key={cat._id}>
    //     {cat.name}
    //     {cat.children.length > 0 ? (
    //       <ul>{renderCategory(cat.children)}</ul>
    //     ) : null}
    //   </li>
  };
  const renderOption = (category, option = []) => {
    for (let cat of category) {
      option.push(
        <option key={cat._id} value={cat._id}>
          {cat.name}
        </option>
      );
      if (cat.children.length > 0) {
        renderOption(cat.children, option);
      }
    }
    return option;
  };
  const handleSave = () => {
    const payload = { name: categoryname, parentId: categoryid };
    dispatch(addCategory(payload)).then(() => {
      dispatch(getCategory());
    });
    setCategoryid("");
    setCategoryName("");
  };
  const renderAddModal = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Form.Group controlId="formBasicPassword"> */}
            <Form.Label>Category name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category name"
              value={categoryname}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            {/* </Form.Group> */}
            <select
              value={categoryid}
              onChange={(e) => setCategoryid(e.target.value)}
            >
              <option>Selection Category</option>
              {renderOption(category.category)}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  const createOption = (category, option = []) => {
    for (let cat of category) {
      option.push({
        _id: cat._id,
        name: cat.name,
        parentId: cat.parentId,
      });
      if (cat.children.length > 0) {
        createOption(cat.children, option);
      }
    }
    return option;
  };
  const handleEdit = () => {
    const categories = createOption(category.category);
    let listchecked = [];
    let listexpanded = [];

    expanded.forEach((data) =>
      listexpanded.push(categories.find((cat) => cat._id === data))
    );

    checked.forEach((data) =>
      listchecked.push(categories.find((cat) => cat._id === data))
    );
    setCheckArray(listchecked);
    setExpandArray(listexpanded);
    setEditmodal(true);
  };
  const updateInput = (key, value, index, type) => {
    if (type === "expanded") {
      const updateExpandedArray = expandArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandArray(updateExpandedArray);
    } else if (type === "checked") {
      const updateCheckedArray = checkArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckArray(updateCheckedArray);
    }
  };
  const handleEditModal = () => {
    const listupdate = [];
    expandArray.forEach((item, index) => {
      listupdate.push({
        _id: item._id,
        name: item.name,
        parentId: item.parentId,
        category: item.category,
      });
    });
    checkArray.forEach((item, index) => {
      listupdate.push({
        _id: item._id,
        name: item.name,
        parentId: item.parentId,
        category: item.category,
      });
    });

    // console.log(listupdate);
    // const payload = { expandArray, checkArray };
    dispatch(upDateCategory(listupdate)).then(() => {
      dispatch(getCategory());
    });
    handleCloseEdit();
  };
  const renderEditmodal = () => {
    return (
      <>
        <Modal show={editmodal} onHide={handleCloseEdit} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Expanded
            {expandArray.length > 0
              ? expandArray.map((cat, index) => (
                  <>
                    <Row key={index}>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Category name"
                          value={cat.name}
                          onChange={(e) =>
                            updateInput(
                              "name",
                              e.target.value,
                              index,
                              "expanded"
                            )
                          }
                        />
                      </Col>
                      <Col>
                        {cat.parentId ? (
                          <select
                            value={cat.parentId}
                            onChange={(e) =>
                              updateInput(
                                "parentId",
                                e.target.value,
                                index,
                                "expanded"
                              )
                            }
                          >
                            {/* <option>Select Category</option> */}
                            {createOption(category.category).map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <select disabled>
                            <option>Select Category</option>
                          </select>
                        )}
                      </Col>
                    </Row>
                    <br />
                  </>
                ))
              : null}
            <br />
            Checked
            {checkArray.length > 0
              ? checkArray.map((cat, index) => (
                  <>
                    <Row key={index}>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Category name"
                          value={cat.name}
                          onChange={(e) =>
                            updateInput(
                              "name",
                              e.target.value,
                              index,
                              "checked"
                            )
                          }
                        />
                      </Col>
                      <Col>
                        <select
                          value={cat.parentId}
                          onChange={(e) =>
                            updateInput(
                              "parentId",
                              e.target.value,
                              index,
                              "checked"
                            )
                          }
                        >
                          {/* <option>Select Category</option> */}
                          {createOption(category.category).map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </Col>
                    </Row>
                  </>
                ))
              : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  const handleDelete = () => {
    const listDelete = [];
    checked.forEach((data) => listDelete.push(data));
    // console.log(listDelete);
    // expanded.forEach((data) => listDelete.push(data));
    dispatch(deleteCategory(listDelete)).then(() => {
      dispatch(getCategory());
    });
  };

  return (
    <div>
      <Layout sidebar>
        {/* <div className="category-list">
          <ul>{renderCategory(category.category)}</ul>
        </div> */}
        {renderAddModal()}
        {renderEditmodal()}
        <button style={{ float: "right" }} onClick={handleShow}>
          Add
        </button>
        <button style={{ float: "right" }} onClick={handleEdit}>
          Edit
        </button>
        <button style={{ float: "right" }} onClick={handleDelete}>
          delete
        </button>

        <CheckboxTree
          nodes={renderCategory(category.category)}
          checked={checked}
          expanded={expanded}
          onCheck={(checked) => setChecked(checked)}
          onExpand={(expanded) => setExpanded(expanded)}
          icons={{
            check: <IoMdCheckbox />,
            uncheck: <IoMdSquareOutline />,
            halfCheck: <IoMdCheckboxOutline />,
            expandClose: <IoIosArrowForward />,
            expandOpen: <IoIosArrowDown />,
          }}
        />
      </Layout>
    </div>
  );
}

export default Category;
