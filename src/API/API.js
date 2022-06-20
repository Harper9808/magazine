import axios from "axios";
import jwtDecode from 'jwt-decode'

//API config
const token = localStorage.getItem('token')
const URL= 'http://localhost:5000';
// const URL=""

// const URL='http://3.34.190.151/'

export const API = axios.create({
  baseURL: URL,
  headers:{
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export const getUserInfo = () => {
  const token =localStorage.getItem('token')
  if (token) {
    const user= jwtDecode(token)
    return user
  }
}

//에러 핸들링 
// const errHandler = (e)=>{
//   const errMsg = e.response?.data.errorMessage
//   errMsg ? alert(errMsg) : console.log(e)
// }
//CORS : 쿠키에 한정,프론트/서버 둘다 설정해줘야 함  
// axios.defaults.withCredentials = true; 

// export const API_token = axios.create({
//     baseURL: `${URL}`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       },
// });


// export const API = axios.create({
//     baseURL: 'http://3.34.190.151',
//     headers:{
//       'Content-Type': 'application/json' 
//     }
//   });

// export const API_token = axios.create({
//     baseURL: 'http://3.34.190.151',
//     headers:{
//       'Authorization': `Bearer ${token}`
//     }
//   });
// export const API_token = axios.create({
//     baseURL: `${SERVER}`,
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem('is_login')}`,
//       },
//       withCredentials: true,
//   });
//   API_token.interceptors.request.use(checkToken)