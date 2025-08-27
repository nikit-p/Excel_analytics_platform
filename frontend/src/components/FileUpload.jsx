import React, { useRef, useState } from "react";
import axios from "axios";
import { Button, Card, Form, Row, Col } from "react-bootstrap";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // check extensions before setting file
    const allowedExtensions = ["xls", "xlsx"];
    const fileExt = selectedFile.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      setError("Only Excel files (.xls, .xlsx) are allowed");
      setMessage("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFile(selectedFile);
    setError("");
    setMessage(`Ready to upload: ${selectedFile.name}`);
  };

  /* Upload file API call */
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file !");
      setMessage("");
      return;
    }

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const formData = new FormData();
      formData.append("file", file);

      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "content-Type": "multipart/form-data",
          Authorization: `${jwtToken}`,
        },
      });
      setMessage("File uploaded successfully");
      setError("");
      setFile(null);

      if (fileInputRef.current) fileInputRef.current.value = ""; // reset input
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
      setMessage("");
    }
  };

  return (
    <div style={{ marginLeft: "220px", padding: "20px" }}>
      {/* User file upload */}
      <Row>
        <Col>
          <Card className="text-center mx-auto mt-5" style={{ width: "500px" }}>
            <Card.Body>
              <p className="mb-4 fs-3 fw-medium">Upload Excel File</p>
              <Form.Control
                className="mb-3"
                type="file"
                accept=".xls,.xlsx"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button
                className="d-grid gap-2 col-6 mx-auto"
                variant="primary"
                onClick={handleUpload}
              >
                Upload
              </Button>

              {/* Feedback messages */}
              {message && (
                <p className="fs-3 fw-medium mt-2" style={{ color: "green" }}>
                  {message}
                </p>
              )}
              {error && (
                <p className="fs-3 fw-medium mt-2" style={{ color: "red" }}>
                  {error}
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default FileUpload;
