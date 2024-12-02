import { client } from "../../utils/client";

export const getBySwatchName = async (swatchName) => {
  return client.get('/getbyswatchname', {
    params: { swatch_name: swatchName },
  });
};

export const newSwatchName = async () => {
  try {
    const response = await client.post('/swatchname');
    console.log('newSwatchName-->'+JSON.stringify(response));
    return response;
  } catch (error) {
    console.error("Error fetching swatch name:", error);
    throw error;
  }
};
