import React from 'react';
import s from './ExperimentHeader.module.scss';
import { ReactSVG } from 'react-svg';
import SearchIcon from "../../../assets/svg/search-lg.svg";
import { Col, Row } from 'react-bootstrap';
import plus from '../../../assets/svg/plusiconExp.svg'

const ExperimentHeader = ({ onSearchChange, onCreateNew }) => {
  return (
    <div className={s.headerContainer}>
      <div className={s.headerTop}>
        <h1 className={s.title}>Experiments</h1>
        <button style={{ backgroundColor: '#3F51B5' }}
         className="btn btn-primary d-flex align-items-center justify-content-center text-nowrap "
         onClick={onCreateNew}>
            <ReactSVG src={plus} style={{paddingBottom:'5px',paddingRight:'10px'}} />
            <span style={{ fontSize: '16px',fontWeight:600,lineHeight:'24px' }}>Create New</span> 
        </button>
      </div>
      <Row>
      <Col md={6} xs={12}lg={4}>
      <div  className={s.searchContainer}>
        <ReactSVG className={s.searchIcon} src={SearchIcon} />
        <input
          type="text"
          placeholder="Search"
          className={s.searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      </Col>
      </Row>
    </div>
  );
};

export default ExperimentHeader;
