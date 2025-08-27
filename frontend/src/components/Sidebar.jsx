import React from "react";
import "./Sidebar.css";
import { Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("jwtToken");

    navigate("/login");
  };
  return (
    <div
      className="sidebar text-white d-flex flex-column p-3"
      style={{ backgroundColor: "#20B2AA" }}
    >
      <h2 className="text-white">Dashboard</h2>
      <Nav className="flex-column mt-4">
        <Nav.Link className="mb-2">
          <Link to="upload" className="text-white text-decoration-none">
            Upload File
          </Link>
        </Nav.Link>
        <Nav.Link className="mb-2">
          <Link to="files" className="text-white text-decoration-none">
            File History
          </Link>
        </Nav.Link>
        <Nav.Link className="mb-2">
          <Link to="table" className="text-white text-decoration-none">
            Table View
          </Link>
        </Nav.Link>
        <Nav.Link className="mb-4">
          <Link to="charts" className="text-white text-decoration-none">
            Charts
          </Link>
        </Nav.Link>
      </Nav>

      <div className="d-grid gap-2 mb-2 col-6 mx-2">
        <Button variant="light" className="" onClick={logout}>
          <Link className="text-dark text-decoration-none">Logout</Link>
        </Button>
      </div>

      
    </div>
  );
}

export default Sidebar;
