import React from 'react';
import ExperimentCard from '../ExperimentCard/ExperimentCard';
import styles from './ExperimentList.module.scss';
import { Col, Row } from 'react-bootstrap';

const ExperimentList = ({ experiments }) => {
  return (
    <div className={styles.container}>
      <Row className="g-4">
        {experiments.map((experiment) => (
          <Col lg={4} md={6} key={experiment.id}>
            <ExperimentCard experiment={experiment} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ExperimentList;
