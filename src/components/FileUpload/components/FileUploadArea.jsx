import React from 'react';
import { ReactSVG } from 'react-svg';
import UploadIcon from '../../../assets/svg/upload.svg';
import AddPhotoIcon from '../../../assets/svg/add_a_photo.svg';
import s from '../FileUpload.module.scss';

export const FileUploadArea = ({ formState, handleFileSelect, handleAlert, updateFormState }) => (
  <div 
    className={s.uploadArea}
    onClick={() => formState.swatchTitle ? document.getElementById('fileInput').click() : handleAlert()}
  >
    <input
      id="fileInput"
      type="file"
      onChange={handleFileSelect}
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
        onClick={(e) => {
          e.stopPropagation();
          if (!formState.swatchTitle) {
            handleAlert();
            return;
          }
          if (formState.input) {
            updateFormState({ showWebcam: !formState.showWebcam });
          }
        }}
      >
        {formState.showWebcam ? 'Capture Photo' : 'Open Camera & Take Photo'}
      </button>
    </div>
  </div>
);