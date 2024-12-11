// FileUpload.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFileInfo, setUploadProgress, setUploadComplete, setImage, setSelectedFile } from '../../store/fileupload/fileuploadslice';
import Webcam from 'react-webcam';
import s from './FileUpload.module.scss';
import { ReactSVG } from 'react-svg';
import Modal from '../common/Modal/Modal';
import Input from '../common/Input/Input';
import UploadIcon from '../../assets/svg/upload.svg';
import AddPhotoIcon from '../../assets/svg/add_a_photo.svg';
import { client } from '../../utils/client';
import BackwardArrow from '../../assets/svg/backward_arrow.svg';
import { Row, Col } from 'react-bootstrap';
import FilePreview from './FilePreview'; // Importing the new FilePreview component

const FileUpload = ({ onBack }) => {
  const dispatch = useDispatch();
  const { fileInfo, uploadProgress, uploadComplete, image, selectedFile } = useSelector((state) => state.fileUpload);
  const [input, setInput] = useState('');
  const [swatchTitle, setSwatchTitle] = useState('');
  const [showWebcam, setShowWebcam] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const swatchId = location.state?.swatchName;
    if (swatchId) {
      setInput(swatchId);
    }
  }, [location.state]);

  const handleShowPopup = (title, body) => {
    setModalBody(body);
    setShowPopup(true);
    setModalTitle(title);
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleSwatchTitle = (value) => {
    setSwatchTitle(value);
  };
console.log(swatchTitle)
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
      formData.append('files', file);
      formData.append('swatch_name', input);
    });

    dispatch(setFileInfo([
      ...fileInfo,
      ...newFiles.map((file) => ({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + 'kb',
      })),
    ]));

    try {
      const response = await client('/uploadImage', {
        method: 'POST',
        body: formData,
        contentType: 'multipart/form-data',
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(setUploadProgress(progress));
          if (progress === 100) {
            dispatch(setUploadComplete(true));
          }
        },
      });

      if (response?.data?.message === 'sucess') {
        const imageUrl = newFiles.map((file) => URL.createObjectURL(file));
        dispatch(setImage([...image, ...imageUrl]));
      } else {
        handleShowPopup('Error', 'Failed to upload image.');
      }
    } catch (error) {
      handleShowPopup('Error', 'An error occurred while uploading the image.');
    }
  };

  const handleFile = () => {
    document.getElementById('fileInput').click();
  };

  const handleCameraClick = () => {
    setShowWebcam(true);
  };

  const handleAlert = () => {
    handleShowPopup();
    setModalBody('Please Enter a Swatch Name!');
    setModalTitle('Error');
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      dispatch(setImage([...image, imageSrc]));
    }
  };

  return (
    <div className={s.upload}>
      {/* Header */}
      <div xs={12} className={s.uploadHeader}>
        <ReactSVG className={s.headerBackIcon} src={BackwardArrow} onClick={onBack} />
        <span className={s.uploadTitle}>Create New Experiments</span>
      </div>

      {/* Input Section */}
      <Row className={s.inputSection}>
        <Col xs={12} md={6} lg={3} className={s.searchSection}>
          <Input label="Swatch ID" value={input} placeholder="XDEDEER333" required />
        </Col>
        <Col xs={12} md={6} lg={3} className={s.swatchTitle}>
          <Input
            type="text"
            label="Experiment Name"
            value={swatchTitle}
            onChange={(e) => handleSwatchTitle(e.target.value)}
            placeholder="Hair shine analysis"
            required
          />
        </Col>
      </Row>

      {/* Upload Area */}
      <Row>
        <Col xs={12} lg={6}>
          <div
            className={s.uploadArea}
            onClick={swatchTitle ? handleFile : handleAlert}
          >
            <input
              id="fileInput"
              type="file"
              onChange={onChange}
              multiple
              style={{ display: 'none' }}
            />
            <ReactSVG src={UploadIcon} className={s.uploadIcon} />
            <p>Select File</p>
            <span>Or</span>
            <div className={s.captureBtn}>
              <ReactSVG src={AddPhotoIcon} />
              <button
                className={s.cameraBtn}
                onClick={input ? (showWebcam ? capture : handleCameraClick) : handleAlert}
              >
                {showWebcam ? 'Capture Photo' : 'Open Camera & Take Photo'}
              </button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Webcam Preview */}
      {showWebcam && (
        <Col xs={12} className={s.webcam}>
          <Webcam
            audio={false}
            width={300}
            height={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
        </Col>
      )}

      {/* Pass image and file info to FilePreview */}
      <FilePreview
        image={image}
        fileInfo={fileInfo}
        uploadProgress={uploadProgress}
        uploadComplete={uploadComplete}
        selectedFile={selectedFile}
        setSelectedFile={(file) => dispatch(setSelectedFile(file))}
        setImage={(imageUrls) => dispatch(setImage(imageUrls))}
      />

      <Modal
        show={showPopup}
        handleClose={() => setShowPopup(false)}
        title={modalTitle}
        body={modalBody}
        primaryButtonLabel="Close"
      />
    </div>
  );
};

export default FileUpload;
