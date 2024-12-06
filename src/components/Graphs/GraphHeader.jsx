import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import s from "./GraphHeader.module.scss";

const GraphHeader = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={s.layout}>
        <div className={s.backreturnTitle}>
          <span className={s.backTitle} onClick={handleReturn}>
            &lt; Results
          </span>
        </div>
        <nav className={s.graphNav}>
          <ul className={s.graphNavList}>
            <li>
              <NavLink
                to="graph-results"
                className={({ isActive }) =>
                  isActive ? `${s.graphNavLink} ${s.active}` : s.graphNavLink
                }
              >
                Graph Result
              </NavLink>
            </li>
            <li>
              <NavLink
                to="image-result"
                className={({ isActive }) =>
                  isActive ? `${s.graphNavLink} ${s.active}` : s.graphNavLink
                }
              >
                Image Result
              </NavLink>
            </li>
            <li>
              <NavLink
                to="calculation-results"
                className={({ isActive }) =>
                  isActive ? `${s.graphNavLink} ${s.active}` : s.graphNavLink
                }
              >
                Calculation
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={s.outletContainer}>
        <Outlet />
      </div>
    </>
  );
};

export default GraphHeader;
