import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FilePreview } from './FilePreview';
import s from '../FileUpload.module.scss';

export const FilePreviewSection = ({ formState, handleDelete, goToCropPage, updateFormState }) => (
  <Col xs={12} lg={6} className="pb-5">
    {formState.image.length > 0 && <p>Selected Files</p>}
    <Row className={s.fileUpload} style={{ paddingLeft: 0, paddingTop: 0 }}>
      {formState.fileInfo.map((file, index) => (
        <FilePreview
          key={index}
          file={file}
          index={index}
          formState={formState}
          handleDelete={handleDelete}
          updateFormState={updateFormState}
        />
      ))}
    </Row>
    {formState.uploadComplete && formState.selectedFile !== null && formState.image.length > 0 && (
      <div className={s.cropBtn} onClick={goToCropPage}>
        <button className={s.cropImageBtn}>
          <i className={`bi bi-crop ${s.bi}`}></i>
          Crop Image
        </button>
      </div>
    )}
  </Col>
);