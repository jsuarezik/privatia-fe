import axios from 'axios'
import config from '../config'
const instance = axios.create({
    baseURL: `${config.apiURL}/${config.apiPrefix}`,
    headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials : false
});

export default instance;
