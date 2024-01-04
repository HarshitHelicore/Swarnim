import axios from 'axios';
import { APP_BASE_URL } from '../setting/setting';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: `${APP_BASE_URL}`,
  headers: {
    'Accept': "application/json",
    'Content-Type': "multipart/form-data", 
  },
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    const auth_token = "Bearer " + token;
    if (token) {
      config.headers.Authorization = auth_token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status == 401) {
//       const data = {
//         isExpired: true,
//       };
//       store.dispatch(setTokenExpired(data));
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
