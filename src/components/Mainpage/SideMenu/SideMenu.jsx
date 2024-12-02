import React from "react";
import s from "./SideMenu.module.scss";
import cx from "classnames";
import { ReactSVG } from "react-svg";
import BookIcon from "../../../assets/svg/book_4.svg";

const SideMenu = () => {
  return (
    <div className={s.layout}>
      <div className={s.menu}>
        <h5 className={cx(s.fs_14)}>main menu</h5>
        <div className={s.menuSection}>
          <ReactSVG src={BookIcon} />
          <h2 className={s.menuTitle}>Experiments</h2>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
