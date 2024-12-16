import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./CropImage.module.scss";
import { ReactSVG } from "react-svg";
import BackwardArrow from "../../../assets/svg/backward_arrow.svg";
import Modal from "../../common/Modal/Modal";

const CropImage = () => {
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false); // For upload progress
  const [error, setError] = useState(null); // For error handling
  const location = useLocation();
  const navigate = useNavigate();
  const { cropData, originalImage } = location.state || {};
  const imageName = sessionStorage.getItem("imageName") || "uploaded-image.png";

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/graph/graph-results", { state: { imageData: cropData } });
  };

  const handleRetake = () => {
    navigate("/CreateExperiment", { state: { openWebcam: true } });
  };

  const handleUpload = async () => {
    if (!cropData) {
      setError("No image data available for upload.");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Convert Base64 cropData to Blob
      const base64Response = await fetch(cropData);
      const blob = await base64Response.blob();

      // Create a File object from the Blob
      const file = new File([blob], imageName, { type: "image/png" });

      // Prepare FormData
      const formData = new FormData();
      formData.append("file", file); // Key `file` as required by the API
      formData.append("swatch_name", "A_0124"); // Add `swatch_name` parameter

      console.log("Uploading FormData to API...");

      // API Call
      const response = await fetch(
        "https://shinemeasurementdev.ckdigital.in/api/uploadImage",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data.results && data.results[0]) {
        console.log("API Response:", data);
        const uploadedImageUrl = data.results[0].url;

        // Save the uploaded image URL to sessionStorage
        sessionStorage.setItem("uploadedImageUrl", uploadedImageUrl);

        // Show success modal and navigate after confirmation
        setShowModal(true);
      } else {
        throw new Error(data.message || "Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
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
            <img src={cropData} alt="Cropped Preview" />
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
        {error && <div className={s.error}>{error}</div>}
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
