import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;


const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiGet = async (url) => 
    instance({
      method: 'get',
      url: baseURL + url,
      headers: {
        'Content-Type': 'application/json',
      }
    });
 export const apiGetWithBody = async (url, data) => 
    instance({
      method: 'get',
      url: baseURL + url,
      data,
    });
    export  const apiPost = async (url,data) =>
      instance({
        method: 'post',
        url: baseURL + url,
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
    export const apiPostwithImage = async (url, data, config = {}) => {
      try {
        console.log('Request Details:', {
          url: instance.defaults.baseURL + url,
          data :data,
          config,
        });
    
        const response = await instance.post(url, data, config);
    
        console.log('Response:', response.data);
    
        return response.data; // Return only the data portion of the response
      } catch (error) {
        console.error('Error Details:', {
          message: error.message,
          response: error.response,
        });
    
        throw error.response || error;
      }
    };
    

    
    export const apiPut = async (url, data) => 
    instance({
      method: 'put',
      url: baseURL + url,
      data,
    });

    export const apiDelete = async (url) => 
    instance({
      method: 'delete',
      url: baseURL + url,
    });

