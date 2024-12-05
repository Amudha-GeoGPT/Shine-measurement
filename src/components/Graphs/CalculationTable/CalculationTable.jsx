import React, { useState } from "react";
import { Table, Pagination, Container, Row, Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Stockdata } from "./Calculation";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import s from "./CalculationTable.module.scss";
import leftarrow from '../../../assets/svg/previous-arrow.svg';
import nextarrow from '../../../assets/svg/next-arrow.svg';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const styles = {
  title: {
    fontSize: "1rem",
    fontWeight: 600,
    marginTop: "20px",
    textAlign: "left", // Align text to the left
  },
  button: {
    backgroundColor: "#F6F8F7",
    color: "#34ade3",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    marginTop: "10px",
    cursor: "pointer",
    display:'transparent',
  },
};

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
        // backgroundColor: "rgba(75, 192, 192, 0.6)",
        // borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "FWHM",
        data: [item.FWHM],
        // backgroundColor: "rgba(54, 162, 235, 0.6)",
        // borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Max Intensity",
        data: [item.MaxIntensity],
        // backgroundColor: "rgba(255, 99, 132, 0.6)",
        // borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "CenterOffset",
        data: [item.CenterOffset],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Baseline Offset",
        data: [item.BaselineOffset],
        // backgroundColor: "rgba(255, 206, 86, 0.6)",
        // borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "SinCurveArea",
        data: [item.SinCurveArea],
        // backgroundColor: "rgba(255, 99, 132, 0.6)",
        // borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      }
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true, // Maintain the aspect ratio
    barThickness: "flex", // Flexible bar thickness
    maxBarThickness: 30, // Max bar thickness
    minBarLength: 5, // Minimum bar length
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
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
          //   return ${value} (Q${index + 1});
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
        },
        border: {
          display: false, // Remove y-axis line
        },
      },
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" , margin: '0 !important',padding:'20px'}}>
      <div style={{justifyContent:'left',backgroundColor:'white',fontWeight:'600',fontFamily:'poppins'}}><h2 style={{fontSize:'18px',lineHeight:'28px',paragraph:'18px'}}>Calculations</h2></div>

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
      <Row style={{ justifyContent: "space-between",backgroundColor:'#ffffff',paddingTop:'10px' }}>
        <Col xs="auto">
          <Pagination style={{color:'red'}}>
            <Pagination.Prev
              style={{color:'#243744'}}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              linkClassName={s.anu}
            >
             <span><img src={leftarrow}/> </span> Previous
            </Pagination.Prev>
          </Pagination>
        </Col>

        <Col xs="auto">
          <Pagination >
            {Array.from({ length: Math.ceil(Stockdata.length / itemsPerPage) }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
                linkClassName={s.page}
                linkStyle={{
                  color: 'black',
                  backgroundColor: i + 1 === currentPage ? '#F6F8F7' : 'white', 
                  overflow:'hidden',
                  border:'none',
                  borderRadius:'8px'
                }}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>

        <Col xs="auto">
          <Pagination>
            <Pagination.Next
              disabled={currentPage === Math.ceil(Stockdata.length / itemsPerPage)}
              onClick={() => handlePageChange(currentPage + 1)}
              linkClassName={s.anu}
            >
              Next<span><img src={nextarrow}/> </span>
            </Pagination.Next>
          </Pagination>
        </Col>
      </Row>

      {/* Bar Charts Section */}
      <div className="mt-4">
        <Row style={{ height: "100%"}}>
          {currentItems.map((item, index) => (
            <Col key={index} sm={6} className=" mb-4" style={{height:"100%"}}>
              <div
                style={{
                  height: "100%",
                  border: "1px solid #ccc",
                  padding: "10px",
                  position: "relative",
                  backgroundColor: "white",borderRadius:'8px'
                }}
              >
                {/* ROI Label */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    fontWeight: "bold",
                    backgroundColor: "white",
                  }}
                >
                  {`ROI#${indexOfFirstItem + index + 1}`}
                </div>

                {/* Bar Chart */}
                <Bar
                  className="mt-5"
                  style={{
                    height: "100%",
                    maxHeight: "100%",
                    width: "100%",
                    maxWidth: "100%",
                    margin: "0 auto",
                    borderRadius:'20px'
                  }}
                  data={generateChartData(item)}
                  options={chartOptions}
                />

                {/* Insights Title and Button */}
                
              </div>
              <div>
                <h3 style={styles.title}>Spectacular profile of ROI Design</h3>
                <button style={styles.button}>Download Graph</button>
              </div>
            </Col>

          ))}
        </Row>
      </div>
    </div>
  );
};

export default CalculationTable;
