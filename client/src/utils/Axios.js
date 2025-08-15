// src/utils/Axios.js
import axios from 'axios';
import { baseURL } from '../common/SummaryApi';

const AxiosInstance = axios.create({
  baseURL: baseURL, 
  withCredentials: true 
});

export default AxiosInstance;