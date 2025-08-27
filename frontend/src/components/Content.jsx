import React from "react";
import { Button, Container, Row } from "react-bootstrap";

function Content() {
  return (
    <div
      className="mt-1"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "210px",
        backgroundColor: "#263238",
      }}
    >
      <Container className="">
        <Row className="">
          <p className="text-white fs-2 fw-semibold">
            A powerful platform for uploading any Excel file (.xls or .xlsx),
            analyzing the data, and generating interactive 2D and 3D charts.
          </p>
          <div>
            <Button href="/register" size="lg" variant="primary">
              Get Started
            </Button>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Content;
