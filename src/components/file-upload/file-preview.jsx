// FilePreview.js
import React from "react";
import { Col, Row } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom"; 
import FileIcon from "../../assets/svg/file-icon.svg";
import DeleteIcon from "../../assets/svg/delete.svg";
import filewithclr from "../../assets/svg/file-icon_withcolor.svg";
import deletewithclr from "../../assets/svg/delete_withcolor.svg";
import s from "./file-upload.module.scss";

const FilePreview = ({
  image,
  fileInfo,
  uploadProgress,
  uploadComplete,
  selectedFile,
  setSelectedFile,
  setImage,
  input,
  swatchTitle
}) => {
  const navigate = useNavigate();

  const goToCropPage = () => {
    if (selectedFile !== null && image[selectedFile]) {
      navigate("/CropImage", { state: { image: image[selectedFile], input, swatchTitle } });
    } else {
      alert("Error: No image available to crop.");
    }
  };

  const handleDelete = (index) => {
    const updatedImages = [...image];
    const updatedFileInfo = [...fileInfo];
    updatedImages.splice(index, 1);
    updatedFileInfo.splice(index, 1); 
    setImage(updatedImages);
    if (updatedImages.length === 0) {
      setSelectedFile(null);
    } else if (selectedFile === index) {
      setSelectedFile(null); 
    }
  };

  return (
    <Row className={s.uploadPreview}>
      <Col xs={12} lg={6} className="pb-5">
        {image.length > 0 && <p>Selected Files</p>}
        <Row className={s.fileUpload}>
          {image.map((img, index) => (
            <Col
              key={index}
              style={{
                backgroundColor: selectedFile === index ? "#344BFD" : "#FFFFFF"
              }}
              onClick={() => setSelectedFile(index)}
              className={s.imageBox}
            >
              {/* Upload progress */}
              {uploadProgress > 0 && !uploadComplete && (
                <div className={s.progressBarContainer}>
                  <ReactSVG src={FileIcon} className={s.fileIcon} />
                  <div className={s.fileInfo}>
                    <p>{fileInfo[index]?.name}</p>
                    <div className={s.barPercentage}>
                      <div
                        className={s.progressBar}
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                      <p>{uploadProgress}%</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Uploaded file details */}
              {uploadProgress === 0 && !uploadComplete && (
                <div className={s.progressBarContainer}>
                  <ReactSVG
                    src={selectedFile === index ? filewithclr : FileIcon}
                    className={s.fileIcon}
                  />
                  <div className={s.fileInfo}>
                    <p style={{ color: selectedFile === index ? "#FFFFFF" : "black" }}>
                      {fileInfo[index]?.name}
                    </p>
                    <p style={{ color: selectedFile === index ? "#D9D9D9" : "#D9D9D9" }}>
                      {fileInfo[index]?.size}
                    </p>
                  </div>
                  <ReactSVG
                    src={selectedFile === index ? deletewithclr : DeleteIcon}
                    className={s.deleteIcon}
                    onClick={() => handleDelete(index)}
                  />
                </div>
              )}
            </Col>
          ))}
        </Row>
        {selectedFile !== null && image.length > 0 && (
          <div className={s.cropBtn} onClick={goToCropPage}>
            <button className={s.cropImageBtn}>
              <i className={`bi bi-crop ${s.bi}`}></i>
              Crop Image
            </button>
          </div>
        )}
      </Col>

      {/* Preview Section */}
      <Col xs={12} lg={6} className="d-flex justify-content-center align-items-end">
        {selectedFile !== null && image.length > 0 && (
          <Row className={s.previewContainer}>
            <p className="text-center">Image Preview</p>
            <Col className={s.preview}>
              <img
                src={image[selectedFile]}
                alt={`Selected ${selectedFile}`}
                className={s.previewImage}
              />
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default FilePreview;
