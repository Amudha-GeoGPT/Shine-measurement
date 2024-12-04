import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import s from "./GraphHeader.module.scss";

const GraphHeader = () => {
  return (
    <div className={s.layout}>
      {/* Back or Return Section */}
      <div className={s.backreturnTitle}>
        <span className={s.backTitle}>&lt; Results</span>
      </div>

      {/* Navigation Links */}
      <nav className={s.graphNav}>
        <ul className={s.graphNavList}>
          <li>
            <NavLink
              to="graph-results" // Relative path
              className={({ isActive }) =>
                isActive ? `${s.graphNavLink} ${s.active}` : s.graphNavLink
              }
            >
              Graph Result
            </NavLink>
          </li>
          <li>
            <NavLink
              to="image-result" // Relative path
              className={({ isActive }) =>
                isActive ? `${s.graphNavLink} ${s.active}` : s.graphNavLink
              }
            >
              Image Result
            </NavLink>
          </li>
          <li>
            <NavLink
              to="calculation-results" // Relative path
              className={({ isActive }) =>
                isActive ? `${s.graphNavLink} ${s.active}` : s.graphNavLink
              }
            >
              Calculation
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Content Display Area */}
      <div style={{ marginTop: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default GraphHeader;
