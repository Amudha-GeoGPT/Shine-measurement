import axios from 'axios';
import config from '../../config';

const { apiBaseUrl } = config || {};

export async function client(url, {
  body,
  method,
  contentType = 'application/json',
  accessToken = localStorage.getItem('token'),
  includeAuthorization = false,
  ...customConfig
} = {}) {
  const headers = {...(includeAuthorization && { Authorization : accessToken })};
  if (contentType !== 'multipart/form-data') {
    headers['Content-Type'] = contentType;
  }
  const axiosConfig = {
    url,
    method,
    baseURL: apiBaseUrl,
    headers: {
      'Content-Type': contentType,
      ...(includeAuthorization && { Authorization: accessToken }),
    },
    data: method === 'GET' ? null : body,
    ...customConfig,
  };

  try {
    const response = await axios(axiosConfig);
    console.log('response from client-->'+axiosConfig);
    console.log('response from client-->'+response);
    const data = response.data;
    const { status, ...restData } = data || {};
    if (response.status === 200 && data?.message === 'success') {
      return {
        status: true,
        data: restData,
      };
    }
    return {
      status: false,
      data: restData,
    };
  } catch (err) {
    return {
      status: false,
      data: err.response?.data || null,
      error: err,
    };
  }
}

client.get = function (url, customConfig = {}) {
  return client(url, { ...customConfig, method: 'GET' });
};

client.post = function (url, body, customConfig = {}) {
  return client(url, { ...customConfig, method: 'POST', body });
};

client.put = function (url, body, customConfig = {}) {
  return client(url, { ...customConfig, method: 'PUT', body });
};

client.delete = function (url, body, customConfig = {}) {
  return client(url, { ...customConfig, method: 'DELETE', body });
};


 


