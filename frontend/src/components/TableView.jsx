import React, { useEffect, useState } from "react";
import { Table, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
function TableView() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      const { data } = await axios.get("http://localhost:5000/api/data", {
        headers: { Authorization: `${jwtToken}` },
      });
      setFiles(data);
    };
    fetchFiles();
  }, []);

  return (
    <div style={{ marginLeft: "220px", padding: "20px" }}>
      <Row>
        <Col md={4}>
        <p className="fs-3 fw-medium">Select a file</p>
        <Form.Select
          onChange={(e) =>
            setSelectedFile(files.find((f) => f._id === e.target.value))
          }
        >
          <option value="">Select File</option>
          {files.map((f) => (
            <option key={f._id} value={f._id}>
              {" "}
              {f.filename}{" "}
            </option>
          ))}
        </Form.Select>
        </Col>
      </Row>
      {/* Table view for files */}
      <Row className="mt-5">
        {selectedFile && (
          <div>
            <h3 className="text-center">Preview: {selectedFile.filename} </h3>
            <Table bordered hover responsive variant="dark">
              <thead>
                <tr>
                  {Object.keys(selectedFile.data[0] || {}).map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedFile.data.slice(0, 20).map((row, i) => (
                  <tr key={i}>
                    {Object.keys(row).map((col) => (
                      <td key={col}> {row[col]} </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            <p className="fs-3 fw-medium">Showing first 20 rows...</p>
          </div>
        )}
      </Row>
    </div>
  );
}

export default TableView;
