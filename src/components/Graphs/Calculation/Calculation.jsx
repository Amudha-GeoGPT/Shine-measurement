import React from 'react';
import CalculationTable from '../CalculationTable/CalculationTable';
import s from "./Calculation.module.scss";
import {
    AreaChart,
    Line,
    BarChart,
    Bar,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
  } from "recharts";
import Graph from '../GraphHeader';

const Calculation = () => {

    const chartData = [
        { name: "1", sales: 0 },
        { name: "2", sales: 0 },
        { name: "3", sales: 10 },
        { name: "4", sales: 0 },
        { name: "5", sales: 0 },
    ];

  return (
    <div className={s.calculation}>
        <CalculationTable />
        <h2 className={s.graphResultTitle}>Spectacular Design of ROI Design</h2>
        <button className={s.GraphDownloadBtn}>Download graph</button>
        <div className={s.graphMetrics}>
          <ResponsiveContainer width="100%" aspect={480 / 400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <h2 className={s.graphResultTitle}>Spectacular Design of ROI Design</h2>
        <button className={s.GraphDownloadBtn}>Download graph</button>

        <div className={s.graphMetrics}>
          <ResponsiveContainer width="100%" aspect={480 / 400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <h2 className={s.graphResultTitle}>Spectacular Design of ROI Design</h2>
        <button className={s.GraphDownloadBtn}>Download graph</button>

        <div className={s.graphMetrics}>
          <ResponsiveContainer width="100%" aspect={480 / 400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <h2 className={s.graphResultTitle}>Spectacular Design of ROI Design</h2>
        <button className={s.GraphDownloadBtn}>Download graph</button>
    </div>
  )
}

export default Calculation