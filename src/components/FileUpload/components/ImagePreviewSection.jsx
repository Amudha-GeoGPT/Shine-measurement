import React from 'react';
import { Col, Row } from 'react-bootstrap';
import s from '../FileUpload.module.scss';

export const ImagePreviewSection = ({ formState }) => {
  if (!(formState.selectedFile !== null && formState.image.length > 0)) return null;

  return (
    <Col xs={12} lg={6} className="d-flex justify-content-center align-items-end">
      <Row className={s.previewContainer}>
        <p className="text-center">Image Preview</p>
        <Col className={s.preview}>
          <img
            src={formState.image[formState.selectedFile]}
            alt={`Selected ${formState.selectedFile}`}
            className={s.previewImage}
          />
        </Col>
      </Row>
    </Col>
  );
};