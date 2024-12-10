import React from 'react';
import { Col, Row } from 'react-bootstrap';
import s from '../FileUpload.module.scss';

export const InputSection = ({ formState, updateFormState }) => (
  <Row className={s.inputSection}>
    <Col xs={12} md={6} lg={3} className={s.searchSection}>
      <input
        type="text"
        value={formState.input}
        onChange={(e) => updateFormState({ input: e.target.value })}
        placeholder="XDEDEER333"
        className="form-control"
      />
    </Col>
    <Col xs={12} md={6} lg={3} className={s.swatchTitle}>
      <input
        type="text"
        value={formState.swatchTitle}
        onChange={(e) => updateFormState({ swatchTitle: e.target.value })}
        placeholder="Hair shine analysis"
        className="form-control"
      />
    </Col>
  </Row>
);