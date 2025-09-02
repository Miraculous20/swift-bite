
import axios from 'axios';


const AxiosInstance = axios.create({
  withCredentials: true
});

AxiosInstance.interceptors.request.use(
  (config) => {
    // Get user object from localStorage
    const userString = localStorage.getItem('user');
    let token = null;
    if (userString) {
      try {
        const user = JSON.parse(userString);
        token = user?.accessToken;
      } catch (e) {
        // ignore JSON parse error
      }
    }
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosInstance;