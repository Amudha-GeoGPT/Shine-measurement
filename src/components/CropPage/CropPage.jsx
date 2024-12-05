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
    navigate("/CreateExperiment");
  };

  return (
    <div className={`container-fluid ${s.crop}`}>
      {location.state?.image && (
        <>
          <div className={`row align-items-center mb-4 ${s.cropHead}`}>
            <div className="col-auto">
              <ReactSVG src={BackwardArrow} onClick={onCancel} className={s.leftIcon} />
            </div>
            <div className="col">
              <h3 className={s.cropTitle}>Crop Image</h3>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className={s.cropperContainer}>
                <Cropper
                  initialAspectRatio={1}
                  src={location.state.image}
                  viewMode={1}
                  guides={true}
                  minCropBoxHeight={90}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={`row justify-content-end ${s.buttonContainer}`}>
            <div className="col-auto">
              <button className={`btn ${s.cancelButton}`} onClick={onCancel}>
                <span>Cancel</span>
              </button>
            </div>
            <div className="col-auto">
              <button className={`btn ${s.applyButton}`} onClick={getCropData}>
                <span>Apply</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCrop;
