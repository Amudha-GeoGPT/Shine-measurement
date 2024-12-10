import React from 'react';
import { ReactSVG } from 'react-svg';
import BackwardArrow from '../../../assets/svg/backward_arrow.svg';
import s from '../FileUpload.module.scss';

export const Header = ({ onBack }) => (
  <div className={s.uploadHeader}>
    <ReactSVG
      className={s.headerBackIcon}
      src={BackwardArrow}
      onClick={onBack}
    />
    <span className={s.uploadTitle}>Create New Experiments</span>
  </div>
);