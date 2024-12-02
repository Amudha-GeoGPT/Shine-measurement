import { client } from './client';

export const getByUserId = async (userName) => {
  return client.get('/getbyuserid', {
    params: { user_name: userName },
  });
};
