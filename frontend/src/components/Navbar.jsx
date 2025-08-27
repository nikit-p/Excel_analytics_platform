import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeaderNavbar() {
  return (
    <Navbar expand="lg" className="p-3" style={{ backgroundColor: "#20B2AA" }}>
      <Container className="gap-5">
        <Navbar.Brand className="text-white">
          Excel Analytics Platform
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto gap-3 fs-5">
            <Nav.Link className="text-white">
              <Link
                to={"/"}
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#about" className="text-white">
              About
            </Nav.Link>
          </Nav>
          <Form className="d-flex gap-4">
            <Button variant="light">
              <Link
                to={"/register"}
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                Register
              </Link>
            </Button>
            <Button variant="light">
              <Link
                to={"/login"}
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                Login
              </Link>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNavbar;
