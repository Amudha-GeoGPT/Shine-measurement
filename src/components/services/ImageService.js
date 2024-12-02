import { client } from "../../utils/client";

export const uploadImage = async (fileName, fileData, swatchName) => {
  const payload = {
    file: fileData,
    swatch_name: swatchName,
  };

  const response = await client.post('/uploadImage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return response.json();
};

export const processImage = async (swatchName, inputImageName, outputImageName) => {
  return client.post('/uploadImage', null, {
    params: { swatch_name: swatchName, inputImage_name: inputImageName, outputImage_name: outputImageName },
  });
};

