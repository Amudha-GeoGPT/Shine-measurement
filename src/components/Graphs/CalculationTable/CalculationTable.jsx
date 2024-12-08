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
    textAlign: "left",
  },
  button: {
    backgroundColor: "#F6F8F7",
    color: "#34ade3",
    border: "none",
    borderRadius: "5px",
    marginTop: "10px",
    padding: '0 0px',
    cursor: "pointer",
    display: 'transparent',
  },
};
 
const centerOffsetColors = ["#F68D2B", "#FFD200", "#9891FF", "#344BFD"];
 
const CalculationTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(Stockdata.length / itemsPerPage);
 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Stockdata.slice(indexOfFirstItem, indexOfLastItem);
 
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
 
  const getPaginationItems = () => {
    const items = [];
 
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
          linkClassName={s.page}
          linkStyle={{
            color: 'black',
            backgroundColor: i === currentPage ? '#F6F8F7' : 'white',
            overflow: 'hidden',
            border: 'none',
            borderRadius: '8px',
          }}
        >
          {i}
        </Pagination.Item>
      );
    }
 
    if (currentPage > 3 && totalPages > 5) {
      items.push(
        <Pagination.Item
          key="ellipsis-start"
          disabled
          className={s.ellipsis}
        >
          ...
        </Pagination.Item>
      );
    }
 
    const startPage = Math.max(4, currentPage - 1);
    const endPage = Math.min(totalPages - 2, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
          linkClassName={s.page}
          linkStyle={{
            color: 'black',
            backgroundColor: i === currentPage ? '#F6F8F7' : 'white',
            overflow: 'hidden',
            border: 'none',
            borderRadius: '8px',
          }}
        >
          {i}
        </Pagination.Item>
      );
    }
 
    if (currentPage < totalPages - 2 && totalPages > 5) {
      items.push(
        <Pagination.Item
          key="ellipsis-end"
          disabled
          className={s.ellipsis}
        >
          ...
        </Pagination.Item>
      );
    }
 
    for (let i = Math.max(totalPages - 2, endPage + 1); i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
          linkClassName={s.page}
          linkStyle={{
            color: 'black',
            backgroundColor: i === currentPage ? '#F6F8F7' : 'white',
            overflow: 'hidden',
            border: 'none',
            borderRadius: '8px',
          }}
        >
          {i}
        </Pagination.Item>
      );
    }
 
    return items;
  };
 
  const generateChartData = (item, index) => ({
    labels: [""],
    datasets: [
      {
        label: "Specular Area",
        data: [item.SpecularArea],
        backgroundColor: "#E9ECF1",
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "FWHM",
        data: [item.FWHM],
        backgroundColor: "#E9ECF1",
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "Max Intensity",
        data: [item.MaxIntensity],
        backgroundColor: "#E9ECF1",
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "CenterOffset",
        data: [item.CenterOffset],
        backgroundColor: centerOffsetColors[index % 4],
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "Baseline Offset",
        data: [item.BaselineOffset],
        backgroundColor: "#E9ECF1",
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "SinCurveArea",
        data: [item.SinCurveArea],
        backgroundColor: "#E9ECF1",
        borderWidth: 1,
        borderRadius: 5,
      }
    ],
  });
 
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    display: "flex",
    barThickness: "flex",
    maxBarThickness: 30,
    minBarLength: 5,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
        },
        grid: {
          display: false,
          color: "rgba(0, 0, 0, 0.1)",
          borderDash: [5, 5],
        },
        ticks: {
          display: true,
          color: "red",
        },
      },
      y: {
        type: "linear",
        min: 10,
        max: 50,
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
          stepSize: 20,
        },
        border: {
          display: false,
        },
      },
    },
  };
 
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: '0 !important', padding: '20px', background: '#F6F8F7' }}>
      <div style={{width:'100%',overflowX:'scroll'}}>
      <Table style={{borderRadius:"10px",overflow:"hidden", borderColor:'none', }}>
      <thead >
        <tr style={{width:'100%',overflowX:'hidden'}}>
          <th  colSpan={7} style={{ fontSize: '18px', lineHeight: '28px' }}>Calculations</th>
        </tr>
        <tr className={s.header} style={{textWrap:'nowrap', }}>
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
          <tr className={s.tabledata}      style={{
            "--bs-table-bg": index % 2 != 0 ? '#F9FAFB' : "#E4E7EC",
            backgroundColor: "var(--bs-table-bg)",
          }} >
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
      <tfoot>
        <tr>
          <td colSpan={7}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Col xs="auto">
                <Pagination>
                  <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    linkClassName={s.name}
                  >
                    <span><img src={leftarrow} alt="Previous" /></span> Previous
                  </Pagination.Prev>
                </Pagination>
              </Col>
 
              <Col xs="auto">
                <Pagination style={{zIndex:0,position:'relative'}}>
                  {getPaginationItems()}
                </Pagination>
              </Col>
 
              <Col xs="auto">
                <Pagination>
                  <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    linkClassName={s.name}
                  >
                    Next <span><img src={nextarrow} alt="Next" /></span>
                  </Pagination.Next>
                </Pagination>
              </Col>
            </Row>
          </td>
        </tr>
      </tfoot>
    </Table>
    </div>
 
        <div className="mt-4">
          <Row style={{ height: "100%" }}>
            {currentItems.map((item, index) => (
              <Col key={index} lg={6} className="mb-4" style={{ height: "100%" }}>
                <div
                  style={{
                    height: "100%",
                    border: "1px solid #ccc",
                    padding: "10px",
                    position: "relative",
                  backgroundColor: "white",
                  borderRadius: '8px'
                }}
              >
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
 
                <Bar
                  className="mt-5"
                  style={{
                    height: "100%",
                    maxHeight: "100%",
                    width: "100%",
                    maxWidth: "100%",
                    borderRadius: '20px'
                  }}
                  data={generateChartData(item, index)}
                  options={chartOptions}
                />
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