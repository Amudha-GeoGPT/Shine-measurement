import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import UserAvatar from '../UserAvatar/UserAvatar';
import s from './ExperimentCard.module.scss';
import { ReactSVG } from 'react-svg';
import BackArrowIcon from "../../../assets/svg/arrow_back.svg";
 
const ExperimentCard = ({ experiment }) => {
  const { id, title, type, users, status, extraUserCount } = experiment;
  const navigate = useNavigate(); // Initialize navigate hook
 
  const handleViewResults = () => {
    navigate('/graph-results'); // Navigate to the static Graph Results page
  };
 
  return (
    <div className={s.card}>
      <div className={s.header}>
        <p>Study ID {id}</p>
        <h3>{title}</h3>
        <p>{type}</p>
      </div>
      <div className={s.body}>
        <div className={s.avatars}>
          {users.map((user, index) => (
            <UserAvatar key={index} user={user} />
          ))}
          {extraUserCount > 0 && <span>+{extraUserCount}</span>}
        </div>
        <button className={s.viewBtn} onClick={handleViewResults}>
          <span className={s.viewBtnText}>View Results</span>
          <ReactSVG src={BackArrowIcon} />
        </button>
      </div>
    </div>
  );
};
 
export default ExperimentCard;