
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./CropImage.module.scss";
import { ReactSVG } from "react-svg";
import BackwardArrow from "../../../assets/svg/backward_arrow.svg";
import Modal from "../../common/Modal/Modal";
import {uploadFilesThunk} from '../../../store/fileuploadSlice/uploadthunk'
import { useDispatch,useSelector } from "react-redux";
import { processImage } from "../../services/fileuploadService";
import { resetFileSlice } from '../../../store/fileuploadSlice/uploadslice';

const CropImage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch=useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { cropData, originalImage,Swatchid,swatchTitle} = location.state || {};
  const imageName = sessionStorage.getItem("imageName");
  console.log("preview Image Name:", imageName);
  const uploadResponse = useSelector((state) => state.finaldata);
  const listingresult = useSelector((state) => state.finaldata);
 console.log("asdfg",listingresult?.result?.message)
  const getimage=uploadResponse?.uploadResponse?.results[0]?.url;
  console.log('Upload Response:', uploadResponse?.uploadResponse?.results[0]?.url);
 


  const handleCloseModal = async () => {
    setShowModal(false);
      // Wait for uploadFilesThunk to complete
      const completed = dispatch(uploadFilesThunk(cropData));
  
      console.log('kkkkk', getimage);
  
      if (completed) {
        console.log("hi");
        var user_name = 'user2';
        // Dispatch processImage after successful completion
        // dispatch(processImage( Swatchid, getimage, getimage, swatchTitle));
       const user='useer2'
        dispatch(processImage( user,Swatchid,cropData, originalImage, swatchTitle));
       
      } else {
        console.log("inside else");
      }
    
  
    // Navigate to another page after the operations
    // navigate("/");
  };
  

  const handleShowModal = () => setShowModal(true);
 console.log(Swatchid);
 console.log(swatchTitle);
  const handleRetake = () => {
    navigate("/CreateExperiment", { state: { openWebcam: true } });
  };

  const handleUpload = () => {
    dispatch(resetFileSlice())
    handleShowModal();
  };

  const handlePreviewPage = () => {
    navigate("/CreateExperiment", { state: { imageData: originalImage } });
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
