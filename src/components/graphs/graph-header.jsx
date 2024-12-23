import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import s from "./graph-header.module.scss";
import * as thunk from '../../store/calculation-page/calculation-thunk'
import { useDispatch } from "react-redux";

const GraphHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = location.state || {};
  console.log(id);

  useEffect(() => {
    dispatch(thunk.getbycalculatelist(id))
  }, [dispatch]);

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
                state={{ id }}
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
                state={{ id }}
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
                state={{ id }}
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

