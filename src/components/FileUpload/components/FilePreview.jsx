import React from 'react';
import { Col } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import FileIcon from '../../../assets/svg/file-icon.svg';
import filewithclr from '../../../assets/svg/file-icon_withcolor.svg';
import DeleteIcon from '../../../assets/svg/delete.svg';
import deletewithclr from '../../../assets/svg/delete_withcolor.svg';
import s from '../FileUpload.module.scss';

export const FilePreview = ({ file, index, formState, handleDelete, updateFormState }) => (
  <Col
    style={{ backgroundColor: formState.selectedFile === index ? '#344BFD' : '#FFFFFF' }}
    onClick={() => updateFormState({ selectedFile: index })}
    className={s.imageBox}
  >
    <div className={s.progressBarContainer}>
      <ReactSVG 
        src={formState.selectedFile === index ? filewithclr : FileIcon} 
        className={s.fileIcon} 
      />
      <div className={s.fileInfo}>
        <p style={{ color: formState.selectedFile === index ? '#FFFFFF' : 'black' }}>
          {file.name}
        </p>
        <p style={{ color: formState.selectedFile === index ? '#FFFFFF' : 'black' }}>
          {file.size}
        </p>
      </div>
      <ReactSVG
        src={formState.selectedFile === index ? deletewithclr : DeleteIcon}
        className={s.deleteIcon}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(index);
        }}
      />
    </div>
  </Col>
);