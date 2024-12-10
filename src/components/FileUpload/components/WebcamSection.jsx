import React from 'react';
import { Col } from 'react-bootstrap';
import Webcam from 'react-webcam';
import s from '../FileUpload.module.scss';

export const WebcamSection = ({ show, webcamRef }) => {
  if (!show) return null;

  return (
    <Col xs={12} className={s.webcam}>
      <Webcam
        audio={false}
        width={300}
        height={300}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
    </Col>
  );
};