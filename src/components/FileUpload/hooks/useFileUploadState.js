import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useFileUploadState = () => {
  const [formState, setFormState] = useState({
    input: '',
    swatchTitle: '',
    image: [],
    showWebcam: false,
    capturedImage: null,
    showPopup: false,
    modalTitle: '',
    modalBody: '',
    uploadProgress: 0,
    fileInfo: [],
    uploadComplete: false,
    selectedFile: null,
    showCropPage: false,
    showAlert: false, 
  });

  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const swatchId = location.state?.swatchName;
    if (swatchId) {
      setFormState(prev => ({ ...prev, input: swatchId }));
    }
  }, [location.state]);

  const updateFormState = (updates) => {
    setFormState(prev => ({ ...prev, ...updates }));
  };

  const handleAlert = () => {
    updateFormState({
      showPopup: true,
      modalTitle: 'Error',
      modalBody: 'Please enter an experiment name before uploading files.'
    });
  };

  const handleFileUpload = async (files) => {
    if (!formState.swatchTitle) {
      handleAlert();
      return;
    }

    const newFiles = Array.from(files);
    const formData = new FormData();
    
    newFiles.forEach(file => {
      formData.append('files', file);
      formData.append('swatch_name', formState.input);
    });

    const newFileInfo = newFiles.map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + 'kb',
    }));

    updateFormState({
      fileInfo: [...formState.fileInfo, ...newFileInfo]
    });

    try {
      const imageUrls = newFiles.map(file => URL.createObjectURL(file));
      updateFormState({
        image: [...formState.image, ...imageUrls],
        uploadComplete: true
      });
    } catch (error) {
      updateFormState({
        showPopup: true,
        modalTitle: 'Error',
        modalBody: 'An error occurred while uploading the image.'
      });
    }
  };

  const handleFileSelect = (e) => {
    e.preventDefault();
    if (!formState.swatchTitle) {
      handleAlert();
      return;
    }
    const files = e.target?.files || e.dataTransfer?.files;
    if (files) handleFileUpload(files);
  };

  const handleDelete = (index) => {
    const updatedImages = [...formState.image];
    const updatedFileInfo = [...formState.fileInfo];
    updatedImages.splice(index, 1);
    updatedFileInfo.splice(index, 1);

    updateFormState({
      image: updatedImages,
      fileInfo: updatedFileInfo,
      selectedFile: updatedImages.length === 0 || formState.selectedFile === index ? null : formState.selectedFile
    });
  };

  const goToCropPage = () => {
    if (formState.selectedFile !== null && formState.image[formState.selectedFile]) {
      navigate('/CropImage', { 
        state: { image: formState.image[formState.selectedFile] } 
      });
    }
  };

  return {
    formState,
    updateFormState,
    handleFileSelect,
    handleDelete,
    goToCropPage,
    handleAlert,
    webcamRef
  };
};