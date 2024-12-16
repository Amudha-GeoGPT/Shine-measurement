import { client } from '../../utils/client';

export const imageService = {
  getImagesBySwatchName: async (swatchName) => {
    try {
      const response = await client.post('/getbyswatchname', { swatch_name: swatchName });
      return response;
    } catch (error) {
      throw error;
    }
  }
};