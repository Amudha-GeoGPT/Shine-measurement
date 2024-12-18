import React from 'react';
import ExperimentCard from '../ExperimentCard/ExperimentCard';
import styles from './ExperimentList.module.scss';
import { Col, Row } from 'react-bootstrap';

const ExperimentList = ({ experiments, loading }) => {
  if (loading) {
    // Render skeletons if loading
    return (
      <div className={styles.container}>
        <Row className="g-4 px-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Col lg={4} md={6} key={index}>
               <h5 class="card-title placeholder-wave " > 
                <span class="placeholder col-12 bg-secondary" style={{height:'150px', borderRadius:"12px"}}></span>
              </h5>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Row className="g-4 px-3">
        {experiments?.map((experiment) => (
          <Col lg={4} md={6} key={experiment.id_1}>
            <ExperimentCard experiment={experiment} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ExperimentList;
