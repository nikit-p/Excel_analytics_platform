import React, { useEffect, useState } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import axios from "axios";

function FileHistory() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  /* Get users data API call */
  const fetchFiles = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const { data } = await axios.get("http://localhost:5000/api/data", {
        headers: { Authorization: `${jwtToken}` },
      });
      setFiles(data);
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);
  return (
    <div style={{ marginLeft: "220px", padding: "20px" }}>
      {/* Get User Files */}
      <Row>
        <Col md={6}>
          <p className="fs-2 fw-medium">File History</p>
          {error && <p style={{ color: "red" }}> {error} </p>}
          {files.length === 0 ? (
            <p className="text-danger fw-medium">No files uploaded yet !</p>
          ) : (
            <ListGroup as="ol" numbered>
              {files.map((f) => (
                <ListGroup.Item
                  className="bg-success"
                  as="li"
                  key={f._id}
                  style={{ cursor: "pointer", color: "white" }}
                >
                  {f.filename} ({f.data.length} rows)
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default FileHistory;
