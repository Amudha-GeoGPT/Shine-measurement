import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const DSLRWebcamCapture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const openCamera = () => {
    setIsCameraActive(true);
    setImage(null); // Clear previous image if any
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      setIsCameraActive(false); // Close the camera after capturing
      console.log("img-->"+imageSrc);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>DSLR Webcam Capture</h2>

      {/* Webcam Feed */}
      {isCameraActive && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: "user",
          }}
          style={{
            width: "100%",
            maxWidth: "640px",
            border: "2px solid black",
          }}
        />
      )}

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        {!isCameraActive && !image && (
          <button onClick={openCamera} style={{ marginTop: "10px" }}>
            Open Camera
          </button>
        )}

        {isCameraActive && (
          <button onClick={captureImage} style={{ marginTop: "10px" }}>
            Capture Photo
          </button>
        )}

        {image && (
          <button onClick={openCamera} style={{ marginTop: "10px" }}>
            Reopen Camera
          </button>
        )}
      </div>

      {/* Display Captured Image */}
      {image && (
        <div style={{ marginTop: "20px" }}>
          <h3>Captured Image</h3>
          <img src={image} alt="Captured" style={{ maxWidth: "640px", border: "2px solid black" }} />
        </div>
      )}
    </div>
  );
};

export default DSLRWebcamCapture;
