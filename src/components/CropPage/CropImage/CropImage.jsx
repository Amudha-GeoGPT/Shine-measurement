import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./CropImage.module.scss";
import { ReactSVG } from "react-svg";
import BackwardArrow from "../../../assets/svg/backward_arrow.svg";
import Modal from "../../common/Modal/Modal";

const CropImage = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cropData, originalImage } = location.state || {};
  const imageName = sessionStorage.getItem("imageName");
  console.log("preview Image Name:", imageName);
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/graph/graph-results", { state: { imageData: cropData } });
  }

  const handleShowModal = () => setShowModal(true);

  const handleRetake = () => {
    navigate("/CreateExperiment", { state: { openWebcam: true } });
  };

  const handleUpload = () => {
    handleShowModal();
  };

  const handlePreviewPage = () => {
    navigate("/CropImage", { state: { image: imageName } });
  }

  return (
    <div className={s.pageMove}>
      <div className={s.cropImage}>
        <div className={s.previewHead}>
          <div className={s.leftIcon}>
            <ReactSVG src={BackwardArrow} onClick={handlePreviewPage} />
          </div>
          <h3 className={s.previewTitle}>Preview Cropped Image</h3>
        </div>
        {cropData && (
          <div className={s.imagePreview}>
            <img src={cropData} alt="cropped" />
          </div>
        )}
        <div className={s.imagePreviewBtn}>
          <div className={s.buttonContainer}>
            <button className={s.retakeButton} onClick={handleRetake}>
              <span>Retake</span>
            </button>
          </div>
          <div className={s.uploadBtnGroup}>
            <button className={s.uploadBtn} onClick={handleUpload}>Upload Photo</button>
          </div>
        </div>
        <Modal
          show={showModal}
          handleClose={handleCloseModal}
          body="photo uploaded sucessfully!"
          primaryButtonLabel="Ok"
          modalStyle={{ width: "80%" }}
        />
      </div>
    </div>
  );
};

export default CropImage;