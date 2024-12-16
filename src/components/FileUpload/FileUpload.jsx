// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Webcam from "react-webcam";
// import s from "./FileUpload.module.scss";
// import { ReactSVG } from "react-svg";
// import Modal from "../common/Modal/Modal";
// import Input from "../common/Input/Input";
// import UploadIcon from "../../assets/svg/upload.svg";
// import AddPhotoIcon from "../../assets/svg/add_a_photo.svg";
// import { uploadImage } from "../services/ImageService";
// import { client } from "../../utils/client";
// import BackwardArrow from "../../assets/svg/backward_arrow.svg";
// import DeleteIcon from "../../assets/svg/delete.svg";
// import FileIcon from "../../assets/svg/file-icon.svg";
// import ImageCrop from "../CropPage/CropPage";
// import { Col, Row } from "react-bootstrap";
// import filewithclr from "../../assets/svg/file-icon_withcolor.svg"
// import deletewithclr from "../../assets/svg/delete_withcolor.svg"
 
// const FileUpload = ({ onBack }) => {
//   const [input, setInput] = useState("");
//   const [swatchTitle, setSwatchTitle] = useState("");
//   const [image, setImage] = useState([]);
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [modalTitle, setModalTitle] = useState("");
//   const [modalBody, setModalBody] = useState("");
//   const webcamRef = useRef(null);
//   const navigate = useNavigate();
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [fileInfo, setFileInfo] = useState([]);
//   const [uploadComplete, setUploadComplete] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [showCropPage, setShowCropPage] = useState(false);
//   const location = useLocation();
 
//   useEffect(() => {
//     const swatchId = location.state?.swatchName;
//     console.log(swatchId);
//     if (swatchId) {
//       setInput(swatchId);
//     }
//   }, [location.state]);
//   console.log(input);
 
//   const handleShowPopup = (title, body) => {
//     setModalBody(body);
//     setShowPopup(true);
//     setModalTitle(title);
//   };
//   const handleClosePopup = () => {
//     setShowPopup(false);
//     setModalBody("");
//     setModalTitle("");
//   };
 
//   const handleChange = (value) => {
//     setInput(value);
//   };
 
//   const handleSwatchTitle = (value) => {
//     setSwatchTitle(value);
//   };
 
//   const onChange = async (e) => {
//     e.preventDefault();
//     let files;
//     if (e.dataTransfer) {
//       files = e.dataTransfer.files;
//     } else if (e.target) {
//       files = e.target.files;
//     }
 
//     const newFiles = Array.from(files);
//     const formData = new FormData();
//     newFiles.forEach((file) => {
//       formData.append("files", file);
//       formData.append("swatch_name", input);
//     });
 
//     setFileInfo((prev) => [
//       ...prev,
//       ...newFiles.map((file) => ({
//         name: file.name,
//         size: (file.size / 1024 ).toFixed(2) + "kb",
//       })),
//     ]);
 
//     try {
//       const response = await client("/uploadImage", {
//         method: "POST",
//         body: formData,
//         contentType: "multipart/form-data",
//         onUploadProgress: (progressEvent) => {
//           const progress = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setUploadProgress((prev) => ({
//             ...prev,
//             [progressEvent.loaded]: progress,
//           }));
//           if (progress === 100) {
//             setUploadComplete(true);
//           }
//         },
//       });
 
//       if (response?.data?.message === "sucess") {
//         const imageUrl = newFiles.map((file) => URL.createObjectURL(file));
//         setImage((prev) => [...prev, ...imageUrl]);
//       } else {
//         handleShowPopup("Error", "Failed to upload image.");
//       }
//     } catch (error) {
//       handleShowPopup("Error", "An error occurred while uploading the image.");
//     }
//   };
 
//   const handleFile = () => {
//     document.getElementById("fileInput").click();
//   };
 
//   const goToCropPage = () => {
//     if (selectedFile !== null && image[selectedFile]) {
//       navigate("/CropImage", { state: { image: image[selectedFile] } });
//     } else {
//       handleShowPopup("Error", "No image available to crop.");
//     }
//   };
 
 
//   const handleCameraClick = () => {
//     setShowWebcam(true);
//   };
 
//   const handleAlert = () => {
//     handleShowPopup();
//     setModalBody("Please Enter a Swatch Name!");
//     setModalTitle("Error");
//   };
 
//   const handleDelete = (index) => {
//     const updatedImages = [...image];
//     const updatedFileInfo = [...fileInfo];
//     updatedImages.splice(index, 1);
//     updatedFileInfo.splice(index, 1); // Remove corresponding file info
//     setImage(updatedImages);
//     setFileInfo(updatedFileInfo);
//     if (updatedImages.length === 0) {
//       setSelectedFile(null);
//     } else if (selectedFile === index) {
//       setSelectedFile(null); // Reset selected file if it was deleted
//     }
//   };
 
//   const handleCancelCrop = () => {
//     setShowCropPage(false);
//   };
 
//   const handleSelectFile = (index) => {
//     setSelectedFile(index);
//   };
 
//   return (
//     <div style={{paddingLeft:'30px'}}>
//       <div className={s.upload}>
//         {/* Header */}
//         <div xs={12} className={s.uploadHeader}>
//           <ReactSVG
//             className={s.headerBackIcon}
//             src={BackwardArrow}
//             onClick={onBack}
//           />
//           <span className={s.uploadTitle}>Create New Experiments</span>
//         </div>
 
//         {/* Input Section */}
//         <Row className={s.inputSection}>
//           <Col xs={12} md={6} lg={3} className={s.searchSection}>
//             <Input
//               label="Swatch ID"
//               value={input}
//               placeholder="XDEDEER333"
//               required
//             />
//           </Col>
//           <Col xs={12} md={6} lg={3} className={s.swatchTitle}>
//             <Input
//               type="text"
//               label="Experiment Name"
//               value={swatchTitle}
//               onChange={handleSwatchTitle}
//               placeholder="Hair shine analysis"
//               required
//             />
//           </Col>
//         </Row>
 
//         {/* Upload Area */}
//         <Row>
//           <Col xs={12} lg={6}>
//             <div
//               className={s.uploadArea}
//               onClick={swatchTitle ? handleFile : handleAlert}
           
//             >
//               <input
//                 id="fileInput"
//                 type="file"
//                 onChange={onChange}
//                 multiple
//                 style={{ display: "none" }}
//               />
//               <ReactSVG src={UploadIcon} className={s.uploadIcon} />
//               <p>Select File</p>
//               <span>Or</span>
//               <div className={s.captureBtn}>
//                 <ReactSVG src={AddPhotoIcon} />
//                 <button
//                   className={s.cameraBtn}
//                   onClick={input ? (showWebcam ? capture : handleCameraClick) : handleAlert}
//                 >
//                   {showWebcam ? "Capture Photo" : "Open Camera & Take Photo"}
//                 </button>
//               </div>
//             </div>
//           </Col>
//         </Row>
 
//         {/* Webcam Preview */}
//         {showWebcam && (
//           <Col xs={12} className={s.webcam}>
//             <Webcam
//               audio={false}
//               width={300}
//               height={300}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//             />
//           </Col>
//         )}
 
//         {/* File Upload & Preview */}
//         <Row className={s.uploadPreview}>
//           {/* First Column: File Upload Section */}
//           <Col xs={12} lg={6} className="pb-5">
//           {image.length>0 && <p>Selected Files</p>}
//             <Row className={s.fileUpload} style={{paddingLeft:0,paddingTop:0}}>
             
//               {image.map((img, index) => (
//                 <Col
//                   key={index}
               
//                   style={{backgroundColor:selectedFile===index?'#344BFD':'#FFFFFF'}}
//                   onClick={() => handleSelectFile(index)}
//                   className={s.imageBox}
//                 >
//                   {/* Upload progress */}
//                   {uploadProgress[index] > 0 && !uploadComplete && (
//                     <div className={s.progressBarContainer}>
//                       <ReactSVG src={FileIcon} className={s.fileIcon} />
//                       <div className={s.fileInfo}>
//                         <p>{fileInfo[index]?.name}</p>
//                         <div className={s.barPercentage}>
//                           <div
//                             className={s.progressBar}
//                             style={{ width: `${uploadProgress[index]}%` }}
//                           ></div>
//                           <p>{uploadProgress[index]}%</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
 
//                   {/* Uploaded file details */}
//                   {uploadComplete && (
//                     <div className={s.progressBarContainer}>
//                       <ReactSVG src={selectedFile === index ? filewithclr : FileIcon} className={s.fileIcon} />
//                       <div className={s.fileInfo}>
//                         <p style={{color:selectedFile===index?'#FFFFFF':'black'}}>{fileInfo[index]?.name}</p>
//                         <p style={{color:selectedFile===index?'#FFFFFF':'black'}}>{fileInfo[index]?.size}</p>
//                       </div>
//                       <ReactSVG
//                         src={selectedFile === index ? deletewithclr : DeleteIcon}
//                         className={s.deleteIcon}
//                         onClick={() => handleDelete(index)}
//                       />
//                     </div>
//                   )}
//                 </Col>
               
//               ))}
             
//             </Row>
//             {uploadComplete && selectedFile !== null && image.length>0 &&(
//             <div className={s.cropBtn} onClick={goToCropPage}>
           
//               <button className={s.cropImageBtn} >
//               <i class={`bi bi-crop ${s.bi}` }  ></i>
//                 Crop Image
//               </button>
//               </div>
//             )}
           
//           </Col>
 
//           {/* Second Column: Preview Section */}
//           <Col xs={12} lg={6} className="d-flex justify-content-center align-items-end">
         
//             {selectedFile !== null  && image.length>0 && (
             
//               <Row className={s.previewContainer}>
//                 <p className="text-center">Image Preview</p>
//                 <Col  className={s.preview}>
//                   <img
//                     src={image[selectedFile]}
//                     alt={`Selected ${selectedFile}`}
//                     className={s.previewImage}
//                   />
//                 </Col>
//               </Row>
//             )}
//           </Col>
//         </Row>
//         <Modal
//           show={showPopup}
//           handleClose={handleClosePopup}
//           title={modalTitle}
//           body={modalBody}
//           primaryButtonLabel="Close"
//         />
//       </div>
//     </div>
//   );
// }  
// export default FileUpload;
 
 // FileUpload.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFileInfo, setUploadProgress, setUploadComplete, setImage, setSelectedFile } from '../../store/fileuploadSlice/uploadslice';
import Webcam from 'react-webcam';
import s from './FileUpload.module.scss';
import { ReactSVG } from 'react-svg';
import Modal from '../common/Modal/Modal';
import Input from '../common/Input/Input';
import UploadIcon from '../../assets/svg/upload.svg';
import AddPhotoIcon from '../../assets/svg/add_a_photo.svg';
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
  // navigate('/cropage', { state: { input, swatchTitle } });

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

  const onChange = async (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

   
    const newFiles = Array.from(files);
    console.log(newFiles,'files')
     
    dispatch(setFileInfo([...fileInfo, ...newFiles.map((file) => ({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + 'kb',
      })),
    ]));
    const imageUrl = newFiles.map((file) => URL.createObjectURL(file));
    dispatch(setImage([...image, ...imageUrl]));
    dispatch(setSwatchName(swatchTitle))
    
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
  
  const handleback =()=>{
    navigate("/");
  }

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
        <ReactSVG className={s.headerBackIcon} src={BackwardArrow} onClick={handleback} />
        <span className={s.uploadTitle}>Create New Experiments</span>
      </div>

      {/* Input Section */}
      <Row className={s.inputSection}>
        <Col xs={12} md={6} lg={3} className={s.searchSection}>
          <Input label="Swatch ID" value={input} placeholder="XDEDEER333"/>
        </Col>
        <Col xs={12} md={6} lg={3} className={s.swatchTitle}>
          <Input
            type="text"
            label="Experiment Name"
            value={swatchTitle}
            onChange={(e) => handleSwatchTitle(e)}
            placeholder="Hair shine analysis"
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
        input={input}
         swatchTitle={swatchTitle}
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
