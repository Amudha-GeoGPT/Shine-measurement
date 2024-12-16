import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [swatchName, setSwatchName] = useState('');
  const [response, setResponse] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // Convert FileList to Array
  };

  // Handle swatch name input change
  const handleSwatchNameChange = (e) => {
    setSwatchName(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file)); // Append files
    formData.append('swatch_name', swatchName); // Append swatch nametgrjukiukchtsju6ky6auhytgfrg5hygrtferg4AHYGS
   
    try {
      const response = await axios.post(
        'https://shinemeasurementdev.ckdigital.in/api/uploadImage',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          maxBodyLength: Infinity, // To allow large file uploads
        }
      );
      setResponse(response.data); // Handle success
      console.log('Upload successful:', response);
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Upload failed:', error); // Handle errors
    }
  };

  return (
    <div>
      <h1>File Uploader</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Swatch Name:
            <input
              type="text"
              value={swatchName}
              onChange={handleSwatchNameChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Select Files:
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              required
            />
          </label>
        </div>
        <button type="submit">Upload</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
