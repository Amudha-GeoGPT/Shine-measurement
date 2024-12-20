import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../UserAvatar/UserAvatar';
import { ReactSVG } from 'react-svg';
import BackArrowIcon from '../../../assets/svg/arrow_back.svg';
import s from './ExperimentCard.module.scss'; // Import the SCSS module
import { Col, Row } from 'react-bootstrap';
// import mockExperiments from "../../components/Experiments/data/mockExperiments"
import mckres from "../data/mockExperiments"

const ExperimentCard = ({ experiment }) => {
  const { id_1, swatch_name, type, users, extraUserCount } = experiment;
  const navigate = useNavigate();

  const handleViewResults = (param) => {
    navigate('/graph/graph-results',{state:{id:param}});
  };
  
  return (
    <div className={`card ${s.card} shadow-sm mb-4`}>
      <div className={s['card-body']}>
        {/* Header Section */}
        <p className="text-muted">{`Experiment ID ${swatch_name}`}</p>
        <p className={`card-title ${s['card-title']}`}>Test Product Type 1</p>
        <p className={`text-truncate ${s['text-truncate']}`}>{type}</p>

        {/* Body Section */}
        <div className="d-flex flex-column gap-3">
          {/* Avatars and Button Section */}
          <Row className="align-items-center">
            {/* Avatars Section */}
            <Col xs={6} md={6}>
              <div className={`${s.avatars} d-flex flex-nowrap overflow-auto`}>
                {mckres?.map((user, index) => (
                  <UserAvatar key={index} user={user} />
                ))}
                {extraUserCount > 0 && (
                  <span className="text-muted">+{extraUserCount}</span>
                )}
              </div>
            </Col>

            {/* Button Section */}
            <Col xs={6} md={6} className="d-flex justify-content-end">
            <button 
  className={`${s.viewBtn} btn btn-primary d-flex align-items-center justify-content-center text-nowrap`} 
  onClick={() => handleViewResults(`${swatch_name}`)}
>
                <span className={`${s.viewBtnText}`}>View Results</span>
                <ReactSVG src={BackArrowIcon} style={{ paddingBottom: '5px', }} />
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ExperimentCard;
