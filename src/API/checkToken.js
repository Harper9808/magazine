// import axios  from 'axios';
// import jwtDecode from 'jwt-decode'


// export const checkToken = async (config) => {
// let accessToken = localStorage.getItem('token')
// var jwt = require('jsonwebtoken');
// const decode = jwt.decode(accessToken);
// const nowDate = new Date().getTime() / 1000;    
// if (decode.exp < nowDate) {   
//     const { data } =  axios.post(`http://localhost:5001/token`, { accessToken }, {
//       });  
      
//       const { refreshToken } = data.data;
//       accessToken = refreshToken;
//     }
//     config.headers['access_token'] = accessToken;
//     return config;
// }