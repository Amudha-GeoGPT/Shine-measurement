import React from 'react';
import ExperimentCard from '../experiment-card/experiment-card';
import styles from './experiment-list.module.scss';
import { Col, Row } from 'react-bootstrap';

const ExperimentList = ({ experiments, loading }) => {
  const skeletonCards = Array.from({ length: 9 }); // Number of skeletons to display

  return (
    <div className={styles.container}>
      <Row className="g-4 px-3">
        {loading
          ? skeletonCards.map((_, index) => (
              <Col lg={4} md={6} key={index}>
                <div
                  className="placeholder-wave"
                  style={{
                    height: '150px',
                    borderRadius: '12px',
                    background: '#e9ecef',
                  }}
                >
                  <div
                    style={{
                      height: '20px',
                      width: '60%',
                      background: '#f8f9fa',
                      margin: '20px auto',
                      borderRadius: '4px',
                    }}
                  />
                  <div
                    style={{
                      height: '20px',
                      width: '40%',
                      background: '#f8f9fa',
                      margin: '10px auto',
                      borderRadius: '4px',
                    }}
                  />
                  <div
                    style={{
                      height: '30px',
                      width: '30%',
                      background: '#f8f9fa',
                      margin: '10px auto',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </Col>
            ))
          : experiments?.map((experiment) => (
              <Col lg={4} md={6} key={experiment.id_1}>
                <ExperimentCard experiment={experiment} />
              </Col>
            ))}
      </Row>
    </div>
  );
};

export default ExperimentList;
