import axios from 'axios'
import { TOKEN_API } from '@env';

const token = TOKEN_API

const instanceAxios = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 1000,
    headers: {
        'Authorization' : `Bearer ${token}`
    }
  });

  export default instanceAxios;