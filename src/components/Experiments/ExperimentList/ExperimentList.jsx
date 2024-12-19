import React from 'react';
import ExperimentCard from '../ExperimentCard/ExperimentCard';
import styles from './ExperimentList.module.scss';
import { Col, Row } from 'react-bootstrap';

const ExperimentList = ({ experiments, loading }) => {
  const skeletonCards = Array.from({ length: 9}); // Number of skeletons to display

  return (
    <div className={styles.container}>
      <Row className="g-4 px-3">
        {loading
          ? skeletonCards.map((_, index) => (
              <Col lg={4} md={6} key={index}>
                <h5 className="card-title placeholder-wave">
                  <span
                    className="placeholder col-12 bg-secondary"
                    style={{ height: '150px', borderRadius: '12px' }}
                  >
                    <span class="placeholder col-5 bg-light" style={{marginTop:"20px",marginLeft:"20px"}}></span>
                    <br />  
                    <span class="placeholder col-5 bg-light" style={{marginTop:"20px",marginLeft:"20px"}}></span>
                    <br />
                    <a href="#" tabindex="-1" class="btn btn-light disabled placeholder col-4" aria-hidden="true" style={{height:"30px",marginTop:"20px",marginRight:"20px",float:'right'}}></a>
                  </span>
                </h5>
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
