import axios from 'axios'
import config from '../config'
import {getLocalStorageItem, removeLocalStorageItem} from '../utils/localstorage'


const instance = axios.create({
    baseURL: `${config.apiURL}/${config.apiPrefix}`,
    headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials : false
});

instance.interceptors.request.use( config => {
    const token = getLocalStorageItem('auth')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => error )

instance.interceptors.response.use( (response) => { return response }, (error) => {
    if (error.response.status == '401') {
       removeLocalStorageItem('auth')
       window.location.href = '/'
    }
    return error
})
export default instance;
