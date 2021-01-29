import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "./Styles.css";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const login = (e) => {
    e.preventDefault();

    const data = { email, password };

    axios
      .post("ProfileManagement/LoginUser", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.result.userProfile)
        );
        localStorage.setItem(
          "userProfile",
          JSON.stringify(res.data.result.userProfile.profile)
        );
        localStorage.setItem("auth", res.data.result.authToken);
        localStorage.setItem(
          "userToken",
          res.data.result.userProfile.authToken
        );
        setIsSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // if request is granted, redirect to home page
  if (isSuccessful) {
    return <Redirect to="/home"></Redirect>;
  }

  return (
    <Container>
      <Row className="login">
        <Col xs="4" className="left-side">
          <h5 className="logo"> welkom.u </h5>
          <h3 className="sub-title">
            {" "}
            Start the Life, Career you Desired with ease{" "}
          </h3>
        </Col>
        <Col xs="9" className="right-side">
          <div className="login-content">
            <Form onSubmit={login}>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  className="inputType"
                  placeholder="Email"
                  id="email"
                  label="email"
                  autoComplete="username"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="password"
                  name="password"
                  label="Password"
                  className="inputType"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <Button className="submit" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
