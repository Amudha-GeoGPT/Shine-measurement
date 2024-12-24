import React from "react";
import s from "./image-result.module.scss";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';

const ImageResult = () => {
  // Ensure hooks are called at the top level
  const { data, loading, error } = useSelector((state) => state.calculation);
  const location = useLocation();
  const { id } = location.state || {};

  // Conditional rendering for loading state
  if (loading) {
    return (
      <div className="p-4 container">
        <Row className="g-4" style={{ justifyContent: 'left', alignItems: 'center' }}>
          {Array.from({ length: 1 }).map((_, index) => (
            <Col sm={12} md={12} key={index}>
              <h5 className="card-title placeholder-glow">
                <span
                  className="placeholder col-12 bg-secondary"
                  style={{
                    height: '210px',
                    borderRadius: '12px',
                    width: '100%',
                  }}
                ></span>
                <span
                  className="placeholder col-12 bg-secondary"
                  style={{
                    height: '30px',
                    width: '60px',
                    marginTop: '10px',
                  }}
                ></span>
                <br />
                <span
                  className="placeholder col-12 bg-secondary"
                  style={{
                    height: '30px',
                    width: '100px',
                    marginTop: '10px',
                  }}
                ></span>
              </h5>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  // Conditional rendering for error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className={s.imageResult}>
      <div className="container-fluid">
        <div className={s.gridContainer}>
          {data?.results?.imageResults?.inputImages?.map((item, index) => (
            <div key={index} className={s.gridItem}>
              <div className={s.imageWrapper}>
                <div className={s.imageContainer}>
                  <img src={item} alt={`Image ${index + 1}`} className={s.image} />
                </div>
              </div>
              <div className={s.contentWrapper}>
              <h3 className={s.imagetitle}>Output Images</h3>                
              <a href={item.downloadLink} className={s.downloadLink}>
                  Download Graph
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ImageResult;