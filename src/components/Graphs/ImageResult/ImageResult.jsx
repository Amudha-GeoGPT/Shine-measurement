import React, { useEffect } from "react";
import s from "./ImageResult.module.scss";
import { useDispatch,useSelector } from "react-redux";
import * as thunk from '../../../store/calculationslice/calculationthunk'
import { useLocation } from "react-router-dom";

const ImageResult = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.calculation);
  const location = useLocation();
  const {id} = location.state||{};

  console.log(id);
  // console.log("result"+JSON.stringify(data?.data?.results));
  useEffect(() => {
    dispatch(thunk.getbycalculatelist(id))
  }, [dispatch]);
  return (
    <div className={s.imageResult}>
      <div className="container-fluid">
        <div className={s.gridContainer}>
          {data?.data?.results.map((item,index) => (
            <div
              key={index}
              className={`${s.gridItem} ${index === 1 ? s.gridItemLarge : s.gridItemSmall}`}
            >
              <div className={s.imageWrapper}>
                <div className={s.imageContainer}>
                  <img
                    src={item.outputImage_name}
                    alt={item.title}
                    className={s.image}
                  />
                </div>
              </div>
              <div className={s.contentWrapper}>
                <h3 className={s.title}>{item.title}</h3>
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

