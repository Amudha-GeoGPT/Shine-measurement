import React from 'react';
import { Col } from 'react-bootstrap';
import Webcam from 'react-webcam';
import s from '../FileUpload.module.scss';

export const WebcamSection = ({ show, webcamRef, formState, updateFormState }) => {
  if (!show) return null;

  const openCamera = () => {
    updateFormState({
      showWebcam: true,
      capturedImage: null, // Clear any previously captured image
    });
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      updateFormState({
        capturedImage: imageSrc,
        showWebcam: false, // Close the webcam after capturing
      });
      console.log("Captured Image:", imageSrc);
    }
  };

  return (
    <Col xs={12} className={s.webcam} style={{ textAlign: 'center', padding: '20px' }}>
      <h2>DSLR Webcam Capture</h2>

      {formState.showWebcam && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: 'user',
          }}
          style={{
            width: '100%',
            maxWidth: '640px',
            border: '2px solid black',
          }}
        />
      )}

      <div style={{ marginTop: '20px' }}>
        {!formState.showWebcam && !formState.capturedImage && (
          <button onClick={openCamera} style={{ marginTop: '10px' }}>
            Open Camera
          </button>
        )}

        {formState.showWebcam && (
          <button onClick={captureImage} style={{ marginTop: '10px' }}>
            Capture Photo
          </button>
        )}

        {formState.capturedImage && (
          <button onClick={openCamera} style={{ marginTop: '10px' }}>
            Reopen Camera
          </button>
        )}
      </div>

      {formState.capturedImage && (
        <div style={{ marginTop: '20px' }}>
          <h3>Captured Image</h3>
          <img
            src={formState.capturedImage}
            alt="Captured"
            style={{ maxWidth: '640px', border: '2px solid black' }}
          />
        </div>
      )}
    </Col>
  );
};
