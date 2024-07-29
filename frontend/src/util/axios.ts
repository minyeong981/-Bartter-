import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  responseType: 'json',
  timeout: 4000,
});

export default instance;