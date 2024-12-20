import { apiPost } from '../../utils/axios';
// import { client } from './client';

export const postIndex = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiPost('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
