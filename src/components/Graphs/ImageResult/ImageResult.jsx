import React, { useEffect } from "react";
import s from "./ImageResult.module.scss";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
 
 
const ImageResult = () => {
  const { data, loading, error } = useSelector((state) => state.calculation);
  if (loading) {
    return (
  <div className="p-3">
   
    <Row className="g-3">
    <Row style={{justifyContent:'left',alignItems:'center'}} >
      <Col sm={6}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Col sm={12} key={index}>
          <h5 className="card-title placeholder-wave">
            <span
              className="placeholder col-12 bg-secondary"
              style={{
                height: '300px',
                borderRadius: '12px',
                marginTop: '40px',
              }}
            ></span>
          </h5>
        </Col>
      ))}
      </Col>
    </Row>
     
    </Row>
  </div>
);
}
 
  if (error) {
    return <div className="error">{error}</div>;
  }
  const location = useLocation();
  const {id} = location.state||{};
 
  return (
    <div className={s.imageResult}>
      <div className="container-fluid">
        <div className={s.gridContainer}>
          {data?.results?.map((item,index) => (
            <div
              key={index}
              className={`${s.gridItem}`}
            >
              <div className={s.imageWrapper}>
                <div className={s.imageContainer}>
                  <img
                    src={item.inputImage_name}
                    alt={item.title}
                    className={s.image}
                  />
                </div>
              </div>
              <div className={s.contentWrapper}>
                <h3 className={s.title}>{ item.roi}</h3>
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
 
 
 