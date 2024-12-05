import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import s from "./GraphHeader.module.scss";

const GraphHeader = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };
  return (
    <div className={s.layout}>
      <div className={s.backreturnTitle}>
        <span className={s.backTitle} onClick={handleReturn}>&lt; Results</span>
      </div>
      <nav className={s.graphNav}>
        <ul className={s.graphNavList}>
          <li>
            <NavLink
              to="graph-results"
              className={({ isActive }) => (isActive ? `${s.graphNavLink} ${s.active}` : s.graphNavLink)}
            >
              Graph Result
            </NavLink>
          </li>
          <li>
            <NavLink
              to="image-result" // Relative to /graph
              className={({ isActive }) => (isActive ? `${s.graphNavLink} ${s.active}` : s.graphNavLink)}
            >
              Image Result
            </NavLink>
          </li>
          <li>
            <NavLink
              to="calculation-results" // Relative to /graph
              className={({ isActive }) => (isActive ? `${s.graphNavLink} ${s.active}` : s.graphNavLink)}
            >
              Calculation
            </NavLink>
          </li>
        </ul>
      </nav>
      <div style={{ marginTop: "20px" }}>
        {/* Render child routes here */}
        <Outlet />
      </div>
    </div>
  );
};

export default GraphHeader;
