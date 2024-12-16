import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./CropImage.module.scss";
import { ReactSVG } from "react-svg";
import BackwardArrow from "../../../assets/svg/backward_arrow.svg";
import Modal from "../../common/Modal/Modal";
import {uploadFilesThunk} from '../../../store/Fileuploadslice/fileuploadthunk'
import { useDispatch,useSelector } from "react-redux";

const CropImage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch=useDispatch();
  // const location = useLocation();
  const navigate = useNavigate();
    const { croppedImage } = useSelector((state) => state.fileUpload);
  // const { cropData, originalImage } = location.state || {};
  const imageName = sessionStorage.getItem("imageName");
  console.log("preview Image Name:", imageName);
  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(uploadFilesThunk( croppedImage ))
    navigate("/graph/graph-results");
  }

  const handleShowModal = () => setShowModal(true);

  const handleRetake = () => {
    navigate("/CreateExperiment", { state: { openWebcam: true } });
  };

  const handleUpload = () => {
    handleShowModal();
  };

  const handlePreviewPage = () => {
    navigate("/CreateExperiment");
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
        {croppedImage && (
          <div className={s.imagePreview}>
            <img src={croppedImage} alt="cropped" />
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