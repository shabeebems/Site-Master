import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    console.log('sss',response);
    return response;
  },
  (error) => {
    console.log('Error', error.response.status);
    return Promise.reject(error);
  }
);

export default apiClient;
