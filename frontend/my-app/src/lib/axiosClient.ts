import axios from 'axios';

// Google authentication signOut
import { signOut } from 'next-auth/react';

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
        // Google authentication session deleting function
        signOut()
        // Deleting local storage(including redux persist)
        localStorage.clear();
    }
    console.log('Error', error.response.status);
    return Promise.reject(error);
  }
);

export default apiClient;
