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


// import React, { useEffect, useState } from "react";
// import s from "./ImageResult.module.scss";

// const ImageResult = () => {
//   const [imageData, setImageData] = useState([]); // State to hold the API data
//   const [loading, setLoading] = useState(true); // State for loading status
//   const [error, setError] = useState(null); // State for error handling

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("https://shinemeasurementdev.ckdigital.in/api/getbyswatchname", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ swatch_name: "A004" }), // JSON payload
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} - ${response.statusText}`);
//         }

//         const data = await response.json();

//         if (data.message === "sucess" && data.results) {
//           // Map API results to the required format
//           const formattedData = data.results.map((item, index) => ({
//             id: index, // Unique ID for each item
//             imageUrl: item.inputImage_name, // Image URL for display
//             downloadLink: item.outputImage_name, // Downloadable link
//             title: item.roi || `ROI ${index + 1}`, // Title (use `roi` or default)
//           }));
//           setImageData(formattedData);
//         } else {
//           throw new Error("No results found in the API response");
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchImages();
//   }, []);

//   return (
//     <div className={s.imageResult}>
//       <div className="container-fluid">
//         {loading ? (
//           <div>Loading...</div> // Show loading message while fetching data
//         ) : error ? (
//           <div className="error">{error}</div> // Show error message
//         ) : (
//           <div className={s.gridContainer}>
//             {imageData.map((item) => (
//               <div
//                 key={item.id}
//                 className={`${s.gridItem} ${item.id === 0 ? s.gridItemLarge : s.gridItemSmall}`}
//               >
//                 <div className={s.imageWrapper}>
//                   <div className={s.imageContainer}>
//                     <img
//                       src={item.imageUrl}
//                       alt={item.title}
//                       className={s.image}
//                     />
//                   </div>
//                 </div>
//                 <div className={s.contentWrapper}>
//                   <h3 className={s.title}>{item.title}</h3>
//                   <a
//                     href={item.downloadLink}
//                     className={s.downloadLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Download Graph
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageResult;
