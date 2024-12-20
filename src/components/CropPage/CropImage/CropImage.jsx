import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./CropImage.module.scss";
import { ReactSVG } from "react-svg";
import BackwardArrow from "../../../assets/svg/backward_arrow.svg";
import Modal from "../../common/Modal/Modal";
import {uploadFilesThunk} from '../../../store/fileuploadSlice/uploadthunk'
import { useDispatch,useSelector } from "react-redux";
import { processImage } from "../../services/fileuploadService";
import { resetFileSlice } from "../../../store/fileuploadSlice/uploadslice";
 
const CropImage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch=useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { cropData, originalImage,Swatchid,swatchTitle} = location.state || {};
  const imageName = sessionStorage.getItem("imageName");
  // //////console.log("preview Image Name:", imageName);
  const uploadResponse = useSelector((state) => state.finaldata);
  const listingresult = useSelector((state) => state.finaldata);
//  console.log("asdfg",listingresult?.uploadResponse?.results[0].url);
 console.log("uploadResponse",uploadResponse);
 
//  console.log(uploadResponse?.uploadResponse?.results[0].url,'jghg');
 
//  uploadResponse?.uploadResponse.forEach(e => {
//     console.log(e.url,'url of api')
//  });
 
//  console.log(uploadResponse?.uploadResponse?.message,'message');
 
const handleCloseModal = async () => {
  setShowModal(false);

  try {
    const uploadResult = await dispatch(uploadFilesThunk({ base64Image: cropData, Swatchid: Swatchid }));
    console.log("upload check", uploadResult.payload);
    
    let getimage = [];
    uploadResult.payload.results.forEach(e => {
      console.log(e.url, 'url of api');
      getimage.push(e.url);
    });
    console.log(getimage, 'url of api');
    if (getimage.length > 0) {
      const user_name = "user2";
      const processimagedata = await dispatch(
        processImage({
          userName: user_name,
          swatchName: Swatchid,
          inputImageName: getimage,
          outputImageName: getimage,
          expName: swatchTitle
        })
      );
      console.log("processImage dispatched", processimagedata);
    } else {
      console.error("Image URL not found in the upload response.");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
  dispatch(resetFileSlice());
  navigate("/graph/graph-results", { state: { id: Swatchid } });
};


  const handleShowModal = () => setShowModal(true);
 //////console.log(Swatchid);
 //////console.log(swatchTitle);
  const handleRetake = () => {
    navigate("/CreateExperiment", { state: { openWebcam: true } });
  };
 
  const handleUpload = () => {
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
 