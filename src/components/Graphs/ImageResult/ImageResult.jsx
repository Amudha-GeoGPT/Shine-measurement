import React, { useEffect } from "react";
import s from "./ImageResult.module.scss";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ImageResult = () => {
  const { data, loading, error } = useSelector((state) => state.calculation);
  if (loading) {
    return <div className='p-3'>Loading...</div>;
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
                  {/* <img
                    src={item.inputImage_name}
                    alt={item.title}
                    className={s.image}
                  /> */}
                    <img
                    src="https://surveyoutlet.blob.core.windows.net/resdev/shinemeasurement/A004/uploaded-image.png?se=2024-12-19T15%3A52%3A08Z&sp=r&sv=2024-11-04&sr=b&sig=dcKnz172sCXDThDXoW0o9NI09/oBjKZAxEJi8vv34Xk%3D"
                    alt="img"
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

