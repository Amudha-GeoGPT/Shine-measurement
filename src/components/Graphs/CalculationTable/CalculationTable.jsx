import React, { useState } from "react";
import { Table, Pagination, Container, Row, Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Stockdata } from "./Calculation";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
 
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
 
const CalculationTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
 
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Stockdata.slice(indexOfFirstItem, indexOfLastItem);
 
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
 
  // Generate individual chart data
  const generateChartData = (item) => ({
    labels: [""], // Empty label for bar
    datasets: [
      {
        label: "Specular Area",
        data: [item.SpecularArea],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "FWHM",
        data: [item.FWHM],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Max Intensity",
        data: [item.MaxIntensity],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Baseline Offset",
        data: [item.BaselineOffset],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  });
 
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 'flex', // Flexible bar thickness
        maxBarThickness: 50, // Max bar thickness
        minBarLength: 5, // Ensure bars have a minimum size
    Yaxis:{ strokeWidth:0},
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true,
      },
    },
    // scales: {
    //   x: {
     
       
    //     beginAtZero: true,
    //     grid: {
    //       display: false, // Remove x-axis grid lines
    //       drawBorder: false, // Remove the x-axis border line
    //     },
    //     ticks: {
    //       display: false, // Hide x-axis tick labels (optional if needed)
    //     },
    //   },
    //   y: {
    //     beginAtZero: true,
    //     grid: {
    //       display: false, // Remove y-axis grid lines
    //       drawBorder: false, // Remove the y-axis border line
    //     },
    //     ticks: {
    //       stepSize: 20, // Keep y-axis values intact
    //       callback: (value) => value, // Display the y-axis values as is
    //     },
    //   },
   // },
   scales: {
    x: {
      type: "category", // Type of the x-axis (category scale)
      title: {
        display: true, // Display the axis title
      },
      grid: {
        display: false, // Show grid lines
        color: "rgba(0, 0, 0, 0.1)", // Grid line color
        borderDash: [5, 5], // Dashed grid lines
      },
      ticks: {
        display: true, // Show ticks
        color: "red", // Tick color
        // callback: (value, index) => {
        //   // Customize tick labels
        //   return `${value} (Q${index + 1})`;
        // },
      },
    },
    y: {
      type: "linear", // Type of the y-axis (linear scale)
      min: 10, // Minimum value of the scale
      max: 50, // Maximum value of the scale
      title: {
        display: true,
       
        color: "green",
      },
      grid: {
        display: true,
        color: "rgba(0, 0, 0, 0.1)",
      },
      ticks: {
        display: true,
        color: "purple",
        stepSize: 20, // Steps between ticks
        callback: (value) => {
          return `$${value}`; // Customize tick labels
        },
      },
      border: {
        display: false, // Remove y-axis line
      },
    },
  },
 
  };
 
  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <h2 className="text-center my-4">Calculations</h2>
 
      {/* Table Section */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Specular Area</th>
            <th>FWHM</th>
            <th>Max Intensity</th>
            <th>Center Offset</th>
            <th>Baseline Offset</th>
            <th>Sin-Curve-Area</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{`ROI#${indexOfFirstItem + index + 1}`}</td>
              <td>{item.SpecularArea}</td>
              <td>{item.FWHM}</td>
              <td>{item.MaxIntensity}</td>
              <td>{item.CenterOffset}</td>
              <td>{item.BaselineOffset}</td>
              <td>{item.SinCurveArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
 
      {/* Pagination Section */}
      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(Stockdata.length / itemsPerPage)).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
      </Pagination>
 
      {/* Bar Charts Section */}
      <div className="mt-4">
        <Row style={{ height: "100%" }}>
          {currentItems.map((item, index) => (
            <Col key={index} sm={6} className="mb-4">
              <div style={{ height: "100%", border: "1px solid #ccc", padding: "10px", position: "relative" }}>
                {/* ROI Label */}
                <div style={{ position: "absolute", top: "10px", left: "10px", fontWeight: "bold" }}>
                  {`ROI#${indexOfFirstItem + index + 1}`}
                </div>
                <Bar  className="mt-5" style={{ height: "380px" }} data={generateChartData(item)} options={chartOptions} />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};
 
export default CalculationTable;