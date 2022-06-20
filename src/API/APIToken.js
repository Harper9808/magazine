// import axios  from 'axios';
// import jwtDecode from 'jwt-decode'

//   export const getItemsFromDateObject = (_date) => {
//     const today = new Date()
//     const _year = _date.getFullYear()
//     const _hours = _date.getHours()
//     const _minutes = _date.getMinutes()
//     const concat0 = (i) => (i < 10 ? `0${i}` : i.toString())
//     const notThisYear = today.getFullYear() !== _year ? _year : ''
//     const notThisYearKor = notThisYear ? `${notThisYear}년` : ''
//     const ampm =
//       _hours > 12
//         ? `PM ${concat0(_hours - 12)}:${concat0(_minutes)}`
//         : `AM ${concat0(_hours)}:${concat0(_minutes)}`
//     const ampmKor =
//       _hours > 12
//         ? `오후 ${concat0(_hours - 12)}:${concat0(_minutes)}`
//         : `오전 ${concat0(_hours)}:${concat0(_minutes)}`
  
//     return {
//       year: _year,
//       month: _date.getMonth() + 1,
//       date: _date.getDate(),
//       hours: _hours,
//       minutes: _minutes,
//       seconds: _date.getSeconds(),
//       ampm,
//       ampmKor,
//       notThisYear,
//       notThisYearKor,
//     }
//   }

// export const APIToken = async (config) => {
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