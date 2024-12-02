import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./CropPage.module.scss";
import { ReactSVG } from "react-svg";
import BackwardArrow from "../../assets/svg/backward_arrow.svg";

const ImageCrop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState(null);

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      const croppedData = cropper.getCroppedCanvas().toDataURL();
      setCropData(croppedData);
      navigate("/preview", { state: { cropData: croppedData, originalImage: location.state.image } });
    }
  };

  const onCancel = () => {
    navigate("/CreateExperiment")
  }
  
  return (
    <div className={s.crop}>
      {location.state?.image && (
        <>
          <div className={s.cropHead}>
            <div className={s.leftIcon}>
              <ReactSVG src={BackwardArrow} onClick={onCancel} />
            </div>
            <h3 className={s.cropTitle}>Crop Image</h3>
          </div>
          <div className={s.cropperContainer}>
            <Cropper
              //style={{ height: 400, width: "100%" }}
              initialAspectRatio={1}
              src={location.state.image}
              viewMode={1}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
            {/* <button className={s.applyButton} onClick={goToPreviewPage}>
              <ReactSVG src={ArrowRightIcon} />
              <span>Preview</span>
            </button> */}
          </div>
          <div className={s.buttonContainer}>
              <button className={s.applyButton} onClick={getCropData}>
                <span>Apply</span>
              </button>
              <button className={s.cancelButton} onClick={onCancel}>
                <span>Cancel</span>
              </button>
            </div>
        </>
      )}
      {/* {cropData && (
        <div className={s.preview}>
          <h2>Cropped Image</h2>
          <img src={cropData} alt="cropped" />
        </div>
      )} */}
    </div>
  );
};

export default ImageCrop;
