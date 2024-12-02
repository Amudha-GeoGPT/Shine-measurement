import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import s from "./FileUpload.module.scss";
import { ReactSVG } from "react-svg";
import cropimg from "../../assets/svg/crop.svg";
import filewithclr from "../../assets/svg/file-icon_withcolor.svg"
import deletewithclr from "../../assets/svg/delete_withcolor.svg"
import Modal from "../common/Modal/Modal";
import Input from "../common/Input/Input";
import UploadIcon from "../../assets/svg/upload.svg";
import AddPhotoIcon from "../../assets/svg/add_a_photo.svg";
import { uploadImage } from "../services/ImageService";
import { client } from "../../utils/client";
import BackwardArrow from "../../assets/svg/backward_arrow.svg";
import DeleteIcon from "../../assets/svg/delete.svg";
import FileIcon from "../../assets/svg/file-icon.svg";
import ImageCrop from "../CropPage/CropPage";
 
const FileUpload = ({ onBack }) => {
  const [input, setInput] = useState("");
  const [swatchTitle, setSwatchTitle] = useState("");
  const [image, setImage] = useState([]);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState([]);
  const [fileInfo, setFileInfo] = useState([]);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCropPage, setShowCropPage] = useState(false);
  const location = useLocation();
 
 
  useEffect(() => {
    const swatchId = location.state?.swatchName;
    console.log(swatchId);
    if (swatchId) {
      setInput(swatchId);
    }
  }, [location.state]);
  console.log(input);
 
  const handleShowPopup = (title, body) => {
    setModalBody(body);
    setShowPopup(true);
    setModalTitle(title);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
    setModalBody("");
    setModalTitle("");
  };
 
  const handleChange = (value) => {
    setInput(value);
  };
 
  const handleSwatchTitle = (value) => {
    setSwatchTitle(value);
  };
 
  const onChange = async (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
 
    const newFiles = Array.from(files);
    const formData = new FormData();
    newFiles.forEach((file) => {
      formData.append("files", file);
      formData.append("swatch_name", input);
    });
 
    setFileInfo((prev) => [
      ...prev,
      ...newFiles.map((file) => ({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " kb", // Convert to KB
      })),
    ]);
 
 
    try {
      const response = await client("/uploadImage", {
        method: "POST",
        body: formData,
        contentType: "multipart/form-data",
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress((prev) => ({
            ...prev,
            [progressEvent.loaded]: progress,
          }));
          if (progress === 100) {
            setUploadComplete(true);
          }
        },
      });
 
      if (response?.data?.message === "sucess") {
        const imageUrl = newFiles.map((file) => URL.createObjectURL(file));
        setImage((prev) => [...prev, ...imageUrl]);
      } else {
        handleShowPopup("Error", "Failed to upload image.");
      }
    } catch (error) {
      handleShowPopup("Error", "An error occurred while uploading the image.");
    }
  };
 
 
  const handleFile = () => {
    document.getElementById("fileInput").click();
  };
 
  const goToCropPage = () => {
    if (selectedFile !== null && image[selectedFile]) {
      navigate("/CropImage", { state: { image: image[selectedFile] } });
    } else {
      handleShowPopup("Error", "No image available to crop.");
    }
  };
 
  const handleCameraClick = () => {
    setShowWebcam(true);
  };
 
  const handleAlert = () => {
    handleShowPopup();
    setModalBody("Please Enter a Swatch Name!");
    setModalTitle("Error");
  };
 
  const handleDelete = (index) => {
    const updatedImages = [...image];
    const updatedFileInfo = [...fileInfo];
    updatedImages.splice(index, 1);
    updatedFileInfo.splice(index, 1); // Remove corresponding file info
    setImage(updatedImages);
    setFileInfo(updatedFileInfo);
    if (updatedImages.length === 0) {
      setSelectedFile(null);
    } else if (selectedFile === index) {
      setSelectedFile(null); // Reset selected file if it was deleted
    }
  };
 
 
  const handleCancelCrop = () => {
    setShowCropPage(false);
  };
 
  const handleSelectFile = (index) => {
    setSelectedFile(index);
  };
 
  return (
    <div className={s.layout}>
      <div className={s.upload}>
        <div className={s.uploadHeader}>
          <ReactSVG
            className={s.headerBackIcon}
            src={BackwardArrow}
            onClick={onBack}
          />
          <span className={s.uploadTitle}>Create New Experiments</span>
        </div>
        <div className={s.inputSection}>
          <div className={s.searchSection}>
            <Input
              label="Swatch ID"
              value={input}
              placeholder="XDEDEER333"
              required
            />
          </div>
          <div className={s.swatchTitle}>
            <Input
              type="text"
              label="Experiment Name"
              value={swatchTitle}
              onChange={handleSwatchTitle}
              placeholder="Hair shine analysis"
              required
            />
          </div>
        </div>
 
        <div
          className={s.uploadArea}
          //onClick={() => document.getElementById('fileInput').click()}
          onClick={swatchTitle ? handleFile : handleAlert}
        >
          <input
            id="fileInput"
            type="file"
            onChange={onChange}
            multiple
            style={{ display: "none" }}
          />
          <ReactSVG src={UploadIcon} className={s.uploadIcon} />
          <p>Select File</p>
          <span>Or</span>
 
          <div className={s.captureBtn}>
            <ReactSVG src={AddPhotoIcon} />
            <button
              className={s.cameraBtn}
              onClick={
                input ? (showWebcam ? capture : handleCameraClick) : handleAlert
              }
            >
              {showWebcam ? "Capture Photo" : "Open Camera & Take Photo"}
            </button>
          </div>
        </div>
 
        {showWebcam && (
          <div className={s.webcam}>
            <Webcam
              audio={false}
              width={300}
              height={300}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          </div>
        )}
 
        <div className={s.uploadPreview}>
          <div className={s.fileUpload}>
            {image.length > 0 && <h3>Selected Files</h3>}
            <div className={s.scrollbar}>
              {image.map((image, index) => (
              <div
                key={index}
                onClick={() => handleSelectFile(index)}
                className={`${s.imageBox} ${selectedFile === index ? s.selected : ""}`}
                style={{ cursor: "pointer" }}
              >
                {uploadProgress[index] > 0 && !uploadComplete && (
                  <div className={s.progressBarContainer}>
                    <ReactSVG src={FileIcon} className={s.fileIcon} />
                    <div className={s.fileInfo}>
                      <div>
                        <p>{fileInfo[index]?.name}</p>
                      </div>
                      <div className={s.barPercentage}>
                        <div
                          className={s.progressBar}
                          style={{ width: `${uploadProgress[index]}%` }}
                        ></div>
                        <p>{uploadProgress[index]}%</p>
                      </div>
                    </div>
                  </div>
                )}
 
                {uploadComplete && (
                  <div className={s.progressBarContainer}>
                    <ReactSVG
                      src={selectedFile === index ? filewithclr : FileIcon}
                      className={s.fileIcon}
                    />
                    <div className={s.fileInfo}>
                      <p>{fileInfo[index]?.name}</p>
                      <p>{fileInfo[index]?.size}</p>
                    </div>
                    <ReactSVG
                      src={selectedFile === index ? deletewithclr : DeleteIcon}
                      className={s.deleteIcon}
                      onClick={() => handleDelete(index)}
                    />
                  </div>
                )}
              </div>
            ))}
            </div>
            {uploadComplete && selectedFile !== null && image.length > 0 && (
              <div className={s.cropBtn}>
                <ReactSVG
                  src={cropimg}
                />
                <button className={s.cropImageBtn} onClick={goToCropPage}>
                  Crop Image
                </button>
              </div>
            )}
          </div>
 
          <div className={s.previewContainer}>
            {selectedFile !== null && image[selectedFile] && (
              <div className={s.preview}>
              <h3 style={{marginLeft:"500px"}}>Image Preview</h3>
              <div className={s.imgsize}>
                <img style={{marginLeft:"150px",maxHeight:"900px",maxWidth:"900px",minWidth:"900px",minHeight:"500px"}}
                  src={image[selectedFile]}
                  alt={`Selected ${selectedFile}`}
                />
                </div>
              </div>
            )}
          </div>
        </div>
 
        <Modal
          show={showPopup}
          handleClose={handleClosePopup}
          title={modalTitle}
          body={modalBody}
          primaryButtonLabel="Close"
        />
      </div>
    </div>
  );
};
export default FileUpload;
 
