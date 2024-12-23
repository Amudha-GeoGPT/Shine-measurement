import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import BackwardArrow from "../../assets/svg/backward_arrow.svg";
import s from "./crop-page.module.scss";
 
const ImageCrop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState(null);
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      const croppedData = cropper.getCroppedCanvas().toDataURL();
      setCropData(croppedData);
     
      navigate("/preview", { state: { cropData: croppedData, originalImage: location.state.image,Swatchid:location.state.input,swatchTitle:location.state.swatchTitle } });
    }
  };
  console.log("-->"+JSON.stringify(location.state.swatchTitle))
  const onCancel = () => {
    navigate("/CreateExperiment");
  };
 
  return (
    <div className={s.cropContainer}>
      {location.state?.image && (
        <>
          <div className={s.header}>
            <div className={s.headerContent}>
              <button className={s.backButton} onClick={onCancel}>
                <ReactSVG src={BackwardArrow} />
                <span>Crop Image</span>
              </button>
            </div>
          </div>
 
          <div className={s.content}>
            <div className={s.cropperWrapper}>
              <Cropper
                initialAspectRatio={1}
                src={location.state.image}
                viewMode={2}
                guides={true}
                minCropBoxHeight={200}
                minCropBoxWidth={200}
                background={true}
                responsive={true}
                autoCropArea={0.8}
                checkOrientation={false}
                zoomable={true}
                zoomOnTouch={true}
                zoomOnWheel={true}
                wheelZoomRatio={0.1}
                cropBoxMovable={true}
                cropBoxResizable={true}
                dragMode="move"
                toggleDragModeOnDblclick={true}
                minCanvasWidth={400}
                minCanvasHeight={400}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
            </div>
          </div>
 
          <div className={s.footer}>
            <div className={s.buttonGroup}>
              <button className={s.cancelButton} onClick={onCancel}>
                Cancel
              </button>
              <button className={s.applyButton} onClick={getCropData}>
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
 
export default ImageCrop;
 
 