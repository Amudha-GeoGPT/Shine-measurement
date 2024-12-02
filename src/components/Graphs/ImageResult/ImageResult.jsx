 
import React from "react";
import s from "./ImageResult.module.scss";
import firstImage from "../../../assets/svg/imageResultsFirstPic.svg";
import secondImage from "../../../assets/svg/imageResultsSecondPic.svg";
 
const ImageResult = () => {
  const data = [
    {
      id: 1,
      imageUrl: firstImage, // Replace with backend-generated image URL
      title: "Spectacular Profile Of ROI Design",
      downloadLink: "#", // Replace with actual link
    },
    {
      id: 2,
      imageUrl: secondImage, // Replace with backend-generated image URL
      title: "Insights Of Desired Overview",
      downloadLink: "#", // Replace with actual link
    },
  ];
 
  return (
    <div className={s.imageResult}>
      <div className="row">
        {data.map((item) => (
          <div
            key={item.id}
            className={`col-md-${item.id === 1 ? "8" : "4"}`}
          >
            <div className={s.imageCard}>
              {/* Image with White Background */}
              <div className={s.imageContainer}>
                <img
                  src={item.imageUrl}
                  alt="Result"
                  className={`${s.image} img-fluid`}
                />
              </div>
              {/* Title and Download Link */}
              <h5 className={s.title}>{item.title}</h5>
              <a href={item.downloadLink} className={s.downloadLink}>
                Download Graph
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default ImageResult;
 
