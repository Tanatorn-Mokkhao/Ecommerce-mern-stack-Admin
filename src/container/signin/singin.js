import React, { useState } from "react";
import Layout from "../../component/layout/layout";
import { Form, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../action/authAction";
import { Redirect } from "react-router-dom";

function Singin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { email, password };
    dispatch(signin(payload));
  };
  if (auth.authenticate) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Layout>
        <Container>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            <br />
            {auth.error ? <p>{auth.error.error}</p> : null}
          </Form>
        </Container>
      </Layout>
    </div>
  );
}

export default Singin;
