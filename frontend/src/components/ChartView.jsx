import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function ChartView() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("bar");

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

  /* Generate chartType.js config */
  const chartData = () => {
    if (!selectedFile || !xAxis || !yAxis) return null;

    const rows = selectedFile.data;
    const labels = rows.map((row) => row[xAxis]);
    const values = rows.map((row) => row[yAxis]);

    if (chartType === "scatter") {
      return {
        datasets: [
          {
            label: `${yAxis} vs ${xAxis}`,
            data: rows.map((row) => ({
              x: row[xAxis],
              y: row[yAxis],
            })),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      };
    }

    return {
      labels,
      datasets: [
        {
          label: yAxis,
          data: values,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div style={{ marginLeft: "220px", padding: "20px" }}>
      <p className="fs-3 fw-medium">Chart View</p>
      <Row>
        <Col md={4}>
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
      {/* Dropdowns for column selection */}
      {selectedFile && (
        <div className="mt-4">
          <Row>
            <h3 className="text-center">Preview: {selectedFile.filename}</h3>
            <Col>
              <Form.Label className="fw-medium">X-Axis:{""}</Form.Label>
              <Form.Select
                value={xAxis}
                onChange={(e) => setXAxis(e.target.value)}
              >
                <option value="">Select Column</option>
                {Object.keys(selectedFile.data[0] || {}).map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Label className="fw-medium">Y-Axis:{""}</Form.Label>
              <Form.Select
                value={yAxis}
                onChange={(e) => setYAxis(e.target.value)}
              >
                <option value="">Select Column</option>
                {Object.keys(selectedFile.data[0] || {}).map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </Form.Select>
            </Col>
            {/* Select Chart Type */}
            <Col>
              <Form.Label className="fw-medium">Chart Type: {""} </Form.Label>
              <Form.Select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
              >
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="pie">Pie</option>
                <option value="scatter">Scatter</option>
              </Form.Select>
            </Col>
          </Row>
          {/* Chart Display */}
          <div
            style={{
              width: "1200px",
              height: "500px",
              marginTop: "20px",
            }}
          >
            <Row>
              {chartData() &&
                (chartType === "bar" ? (
                  <Bar data={chartData()} />
                ) : chartType === "line" ? (
                  <Line data={chartData()} />
                ) : chartType === "pie" ? (
                  <Pie data={chartData()} />
                ) : (
                  <Scatter data={chartData()} />
                ))}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChartView;
