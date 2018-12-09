import axios from 'axios';
import config from './config';

export default axios.create({
  baseURL: config.endpoint,
  timeout: 5000,
  responseType: 'json'
});
