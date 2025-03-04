import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    console.log('response',response);
    return response;
  },
  (error) => {
    
    if(error.response.status == 406) {
        console.log('ert')
        localStorage.clear();
    }
    console.log('Error', error.response.status);
    return Promise.reject(error);
  }
);

export default apiClient;
