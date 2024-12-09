import React from "react";
import s from "./ImageResult.module.scss";
import { useLocation } from "react-router-dom";

const ImageResult = () => {
  const location = useLocation();
  const uploadedImageUrl =
    location.state?.uploadedImageUrl || sessionStorage.getItem("uploadedImageUrl");

  // Static data with dynamically added uploaded image
  const data = uploadedImageUrl
    ? [
        {
          id: 0, // Unique ID for the uploaded image
          imageUrl: uploadedImageUrl,
          title: "Spectacular Profile Of ROI Design",
          downloadLink: "#", // Replace with the actual download link if available
        },
        {
          id: 1, // Unique ID for the uploaded image
          imageUrl: uploadedImageUrl,
          title: "Insights Of Desired Overview",
          downloadLink: "#", // Replace with the actual download link if available
        },
      ]
    : [];

  return (
    <div className={s.imageResult}>
      <div className="container-fluid">
        <div className={s.gridContainer}>
          {data.map((item) => (
            <div
              key={item.id}
              className={`${s.gridItem} ${item.id === 0 ? s.gridItemLarge : s.gridItemSmall}`}
            >
              <div className={s.imageWrapper}>
                <div className={s.imageContainer}>
                  <img
                    src={item.imageUrl}
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