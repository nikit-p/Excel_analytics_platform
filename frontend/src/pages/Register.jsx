import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import HeaderNavbar from "../components/Navbar";

function Register() {
  const [message, setMessage] = useState("");
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const oldData = { ...signupData };
    const inputName = e.target.name;
    const inputValue = e.target.value;
    oldData[inputName] = inputValue;
    setSignupData(oldData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/signup",
        signupData
      );
      toast.success(res.data.msg);
      setSignupData({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error registering user");
      setSignupData({ name: "", email: "", password: "" });
    }
  };

  return (
    <>
      <HeaderNavbar />
      <div className="" style={{ margin: "80px 80px" }}>
        <ToastContainer />
        <Container fluid className="">
          <Row className="col-md-4 mx-auto">
            <Form
              className="p-5"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              onSubmit={handleSubmit}
            >
              <h2 className="text-center">Sign Up</h2>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={signupData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={signupData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={signupData.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <p style={{ color: "red" }}>{message}</p>
                  <Button
                    variant="primary"
                    name="register"
                    size="lg"
                    type="submit"
                  >
                    Register
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

export default Register;
