import axios from "axios";
import { checkToken } from './checkToken';



export const API = axios.create({
    baseURL: 'http://localhost:5001',
    
  });

// export const API_token = axios.create({
//     baseURL: `${SERVER}`,
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem('is_login')}`,
//       },
//       withCredentials: true,
//   });
//   API_token.interceptors.request.use(checkToken)