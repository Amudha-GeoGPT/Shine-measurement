import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import UserAvatar from '../UserAvatar/UserAvatar';
import { ReactSVG } from 'react-svg';
import BackArrowIcon from "../../../assets/svg/arrow_back.svg";
import s from './ExperimentCard.module.scss'; // Ensure Bootstrap is imported
import { Col, Row } from 'react-bootstrap';

const ExperimentCard = ({ experiment }) => {
  const { id, title, type, users, status, extraUserCount } = experiment;
  const navigate = useNavigate(); // Initialize navigate hook
  const handleViewResults = () => {
    navigate('/graph-results'); // Navigate to the static Graph Results page
  };

  return (
    <div className="card shadow-sm mb-4" style={{ border:'0px',backgroundColor: '#E0F3FE',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
      <div className="card-body">
        {/* Header Section */}
       
            <p className="text-muted mb-1"style={{fontSize:'12px',fontWeight:500,lineHeight:'18px'}}>Study ID {id}</p>
     
            <p className="card-title mb-2" style={{fontSize:'16px',fontWeight:600,lineHeight:'24px'}}>{title}</p>
            <p className="text-muted text-truncate">{type}</p>
       

        {/* Body Section */}
        <div className="d-flex flex-column gap-3">
  {/* Avatars Section */}
  <Row className="align-items-center mb-3">
    {/* Users Section */}
    <Col xs={6} md={6} className="d-flex flex-wrap align-items-center gap-2">
      <div className="d-flex flex-nowrap overflow-auto">
        {users.map((user, index) => (
          <UserAvatar key={index} user={user} />
        ))}
        {extraUserCount > 0 && (
          <span className="text-muted">+{extraUserCount}</span>
        )}
      </div>
    </Col>

    {/* Button Section */}
    <Col xs={6} md={6} className="d-flex justify-content-end">
      <button style={{ backgroundColor: '#3F51B5',paddingX:'2%' }}
        className="btn btn-primary d-flex align-items-center justify-content-center text-nowrap "
        onClick={handleViewResults}
      >
        <span style={{ fontSize: '12px',fontWeight:500,lineHeight:'18px' }}>View Results</span>
        <ReactSVG src={BackArrowIcon} style={{paddingBottom:'5px',paddingLeft:'5px'}} />
      </button>
    </Col>
  </Row>
</div>

      </div>
    </div>
  );
};

export default ExperimentCard;
