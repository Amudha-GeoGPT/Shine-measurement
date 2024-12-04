import React from "react";
import s from "./ImageResult.module.scss";

const ImageResult = () => {
  const data = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop",
      title: "Spectacular Profile Of ROI Design",
      downloadLink: "#",
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
      title: "Insights Of Desired Overview",
      downloadLink: "#",
    },
  ];

  return (
    <div className={s.imageResult}>
      <div className="container-fluid">
        <div className={s.gridContainer}>
          {data.map((item) => (
            <div
              key={item.id}
              className={`${s.gridItem} ${item.id === 1 ? s.gridItemLarge : s.gridItemSmall}`}
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