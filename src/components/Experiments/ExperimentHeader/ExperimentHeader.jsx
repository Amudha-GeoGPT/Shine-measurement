import React from 'react';
import s from './ExperimentHeader.module.scss';
import { ReactSVG } from 'react-svg';
import SearchIcon from "../../../assets/svg/search-lg.svg";

const ExperimentHeader = ({ onSearchChange, onCreateNew }) => {
  return (
    <div className={s.headerContainer}>
      <div className={s.headerTop}>
        <h1 className={s.title}>Experiments</h1>
        <button className={s.createButton} onClick={onCreateNew}>
          + Create New
        </button>
      </div>
      <div className={s.searchContainer}>
        <ReactSVG className={s.searchIcon} src={SearchIcon} />
        <input
          type="text"
          placeholder="Search"
          className={s.searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ExperimentHeader;
