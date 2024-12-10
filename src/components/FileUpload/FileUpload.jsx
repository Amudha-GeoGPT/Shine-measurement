import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import s from './FileUpload.module.scss';
import { useFileUploadState } from './hooks/useFileUploadState';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { FileUploadArea } from './components/FileUploadArea';
import { WebcamSection } from './components/WebcamSection';
import { FilePreviewSection } from './components/FilePreviewSection';
import { ImagePreviewSection } from './components/ImagePreviewSection';
import { Modal } from './components/Modal';

const FileUpload = ({ onBack }) => {
  const {
    formState,
    updateFormState,
    handleFileSelect,
    handleDelete,
    goToCropPage,
    handleAlert,
    webcamRef
  } = useFileUploadState();

  return (
    <div style={{ paddingLeft: '30px' }}>
      <div className={s.upload}>
        <Header onBack={onBack} />
        <InputSection formState={formState} updateFormState={updateFormState} />
        
        <Row>
          <Col xs={12} lg={6}>
            <FileUploadArea 
              formState={formState}
              handleFileSelect={handleFileSelect}
              handleAlert={handleAlert}
              updateFormState={updateFormState}
            />
          </Col>
        </Row>

        <WebcamSection 
          show={formState.showWebcam}
          webcamRef={webcamRef}
        />

        <Row className={s.uploadPreview}>
          <FilePreviewSection 
            formState={formState}
            handleDelete={handleDelete}
            goToCropPage={goToCropPage}
            updateFormState={updateFormState}
          />
          <ImagePreviewSection formState={formState} />
        </Row>

        <Modal 
          show={formState.showPopup}
          title={formState.modalTitle}
          body={formState.modalBody}
          onClose={() => updateFormState({ showPopup: false })}
        />
      </div>
    </div>
  );
};

export default FileUpload;