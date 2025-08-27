import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderNavbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const oldData = { ...loginData };
    const inputName = e.target.name;
    const inputValue = e.target.value;
    oldData[inputName] = inputValue;
    setLoginData(oldData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        loginData
      );
      const { jwtToken, email, name } = res.data;
      const user = { email, name };

      localStorage.setItem("jwtToken", jwtToken);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/Dashboard");
      setLoginData({ email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login Failed!");
      setLoginData({ email: "", password: "" });
    }
  };
  return (
    <>
      <HeaderNavbar />
    <div style={{ margin: "100px 100px" }}>
      <ToastContainer />
      <Container fluid>
        <Row className="col-md-4 mx-auto">
          <Form
            className="p-5"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            onSubmit={handleSubmit}
          >
            <h2 className="text-center">Login</h2>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={loginData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <div className="d-grid gap-2 col-6 mx-auto">
                {message && <p style={{ color: "red" }}>{message}</p>}
                <Button variant="success" size="lg" type="submit">
                  Login
                </Button>
              </div>
            </Col>
          </Form>
        </Row>
      </Container>
    </div>
    </>
  );
}

export default Login;
