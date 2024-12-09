import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./CropImage.module.scss";
import { ReactSVG } from "react-svg";
import BackwardArrow from "../../../assets/svg/backward_arrow.svg";
import Modal from "../../common/Modal/Modal";

const CropImage = () => {
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false); // For upload progress
  const location = useLocation();
  const navigate = useNavigate();
  const { cropData, originalImage } = location.state || {};
  const imageName = sessionStorage.getItem("imageName");

  console.log("preview Image Name:", imageName);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/graph/graph-results", { state: { imageData: cropData } });
  };

  const handleRetake = () => {
    navigate("/CreateExperiment", { state: { openWebcam: true } });
  };

  const handleUpload = async () => {
    if (!cropData) return;
  
    try {
      setUploading(true);
  
      console.log("Mock API call started...");
      // Simulate a network call with setTimeout
      setTimeout(() => {
        const mockResponse = {
          success: true,
          imageUrl: cropData, // Mock the same cropped image as the uploaded URL
        };
        console.log("Mock API response:", mockResponse);
  
        // Save the uploaded image to sessionStorage
        sessionStorage.setItem("uploadedImageUrl", mockResponse.imageUrl);
  
        // Navigate to home page after upload
        navigate("/", { state: { uploaded: true } });
        setUploading(false);
      }, 2000); // Simulated 2-second delay
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed. Please try again.");
      setUploading(false);
    }
  };
  

  const handlePreviewPage = () => {
    navigate("/CropImage", { state: { imageData: originalImage } });
  };

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
            <button
              className={s.uploadBtn}
              onClick={handleUpload}
              disabled={uploading} // Disable button during upload
            >
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
        </div>
        <Modal
          show={showModal}
          handleClose={handleCloseModal}
          body="Photo uploaded successfully!"
          primaryButtonLabel="Ok"
          modalStyle={{ width: "80%" }}
        />
      </div>
    </div>
  );
};

export default CropImage;