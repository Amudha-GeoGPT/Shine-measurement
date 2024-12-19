import React from "react";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import s from "./SideMenu.module.scss";

// Icons
import BookIcon from "../../../assets/svg/book_4.svg";
// Replace with your icon paths
import Back from "../../../assets/svg/backward_arrow.svg"; 

const SideMenu = () => {
  return (
    <nav className={s.nav}>
      {/* Main Menu */}
      <div className={s.menu}>
        <h5 className={s.fs_14}>MAIN MENU</h5>
        <div className={s.menuSection}>
          <ReactSVG src={BookIcon} className={s.menuIcon} />
          <Link to="/" className={s.menuTitle}>
            Experiments
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SideMenu;
