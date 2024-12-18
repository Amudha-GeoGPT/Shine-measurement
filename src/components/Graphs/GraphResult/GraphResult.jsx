 
import React from "react";
import {
  AreaChart,
  BarChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Legend,
  Line,
} from "recharts";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
 
const GraphResult = () => {
//   const location = useLocation();
//   const {id} = location.state||{};
// console.log(id);

  const data = [
    { name: "Jan", uv: 4000, pv: 9000 },
    { name: "Feb", uv: 6000, pv: 7398 },
    { name: "Mar", uv: 3000, pv: 9800 },
    { name: "Apr", uv: 5780, pv: 6908 },
    { name: "May", uv: 3890, pv: 8800 },
    { name: "Jun", uv: 2390, pv: 7800 },
    { name: "July", uv: 5490, pv: 7300 },
  ];
 
  const chartData = [
    { name: "Mon", sales: 4000, pv: 7300 },
    { name: "Tue", sales: 3000, pv: 7800 },
    { name: "Wed", sales: 2000, pv: 8800 },
    { name: "Thu", sales: 6780, pv: 6908 },
    { name: "Fri", sales: 1890, pv: 9800 },
    { name: "Sat", sales: 9390, pv: 7398 },
    { name: "Sun", sales: 1490, pv: 9000 },
  ];
 
  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f8f9fa",
   
     
    },
    col: {
      marginBottom: "30px",
      textAlign: "center", // Aligning title and button text to the center
    },
    chartContainer: {
      padding: "20px",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "15px",
      textAlign:'left' // Ensuring consistent space below each chart
    },
    title: {
      fontSize: "1rem",
      fontWeight: 600,
      marginTop: "20px",
      // marginBottom: "15px",
      textAlign: "left", // Center the title text
    },
    button: {
      display: "flex",
      marginTop: "10px",
      left:'10px',
      padding:0,
      fontSize: "0.8rem",
      color: "#3F51B5",
      backgroundColor: "transparent",
      border: "none",
      // borderRadius: "5px",
      cursor: "pointer",
    },
  };
 
  return (
    <div style={styles.container}>
      <Row className="justify-content-center">
        {/* Chart 1: Area Chart */}
        <Col xs={12} sm={12} lg={6} style={styles.col}>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" aspect={2}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF3B3B" stopOpacity={1} />
                    <stop offset="100%" stopColor="rgba(255, 111, 97, 0.2)" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6A79F7" stopOpacity={1} />
                    <stop offset="100%" stopColor="rgba(177, 185, 248, 0)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="none" />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="none" fill="url(#gradient2)" />
                <Area type="monotone" dataKey="pv" stroke="none" fill="url(#gradient1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <h3 style={styles.title}>Spectacular Profile of ROI Design</h3>
          <button style={styles.button}>Download Graph</button>
        </Col>
 
        {/* Chart 2: Line Chart */}
        <Col xs={12} sm={12} lg={6} style={styles.col}>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" aspect={2}>
              <AreaChart data={data}>
                <XAxis dataKey="name" tickLine={false}  tickMargin={15}  />
                <YAxis
                  axisLine={{ strokeWidth: 0 }}
                  tickLine={false}
                  tickMargin={15}
                  tickFormatter={(value) => {
                    if (value === 0) return '1k';
                    return `${value / 1000}k`;
                  }}
                  // domain={[0, (dataMax) => Math.ceil(dataMax / 1000) * 1000]}
                />
                <CartesianGrid vertical={false} horizontal={true} stroke="#e0e0e0" />
                <Tooltip />
                <Area type="monotone" dataKey="pv" stroke="none" fill="url(#gradient1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <h3 style={styles.title}>Insights of Desired Overview</h3>
          <button style={styles.button}>Download Graph</button>
        </Col>
 
        {/* Chart 3: Simplified Area Chart */}
        <Col xs={12} sm={12} lg={6} style={styles.col}>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" aspect={2}>
              <AreaChart data={data}>
                <XAxis dataKey="name"   tickLine={false}   axisLine={{ strokeWidth: 0 }}/>
                <Tooltip />
                <Area type="monotone" dataKey="pv" stroke="none"  fill="url(#gradient1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <h3 style={styles.title}>Insights of Desired Overview</h3>
          <button style={styles.button}>Download Graph</button>
        </Col>
 
        {/* Chart 4: Bar Chart */}
        <Col  md={12} sm={12} lg={6} style={styles.col}>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" style={{overflowX:'auto'}} aspect={2}>
              <ComposedChart width={730} height={250} data={chartData}>
                <XAxis dataKey="name" tickFormatter={() => { return ''; }} tickLine={false} />
                <YAxis  tickLine={false}/>
                <Tooltip />
                <CartesianGrid vertical={false} horizontal={true} stroke="#e0e0e0" />
                <Area type="linear monotype" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="pv" barSize={35} fill="#E9ECF1" activeBar={{ fill:"#344BFD", }}/>
                <Line dataKey="sales" stroke="#344BFD" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <h3 style={styles.title}>Spectacular Profile of ROI Design</h3>
          <button style={styles.button}>Download Graph</button>
        </Col>
      </Row>
    </div>
  );
};
 
export default GraphResult;