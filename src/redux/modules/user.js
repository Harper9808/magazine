import {API,getUserInfo} from '../../API/API'
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {useNavigate} from "react-router-dom";
import jwtDecode from 'jwt-decode'
// 액션 타입
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER"
// 액션 생성 함수
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));


// 초기값
const initialState = {
  user: null,
    is_login: false,
  };


 //액션
// export const getUserAPI =() => {
//     return function (dispatch) {
//         axios({
//             method: "get",
//             url: "http://localhost:5001/user"
//             },
//           ).then((res) => {
//             let user_data = []
//             res.data.forEach((b) => {
//                 user_data.push({ nickname: b.nickname,email: b.email});
//               });
//             console.log(user_data)
//             localStorage.setItem("is_login", true);
//           }).catch((error) => {
//             console.log(error);
//           });
//     }
// }
//회원 가입 (API post 요청 )     

export const signUpAPI = (email, password,nickname) => {
  return function (dispatch) {
    const data = {
      email: email,
      nickname: nickname,
      password: password,
    }
    // API.post('/api/register',data)
    API.post('/api/register',data)
      .then((res) => { console.log("회원가입API",res)
        if(res.success === true){
        }
      }).catch((error) => {
      });
    }
  };
  export const signUpAPI2 = (email, password,nickname) => {
    return function (dispatch) {
      const data = {
        id:100,
        email: email,
        nickname: nickname,
        password: password,
      }
      // API.post('/api/register',data)
      API.post('/api/register',data)
        .then((res) => { console.log("회원가입API",res)
          if(res.success === true){
          }
        }).catch((error) => {
        });
      }
    };         
        
//로그인 : 이메일/비밀번호 
const loginAPI=(email,password)=>{
  const data = {
    email: email,
    password: password,
  }
  return function (dispatch) {
    API.post('/api/login',data)
    .then((res) => {
      console.log("axios log:",res)

        // 토큰 &디코딩 // user_info = {iat: ,userId: }
        // localStorage.setItem('token',res.data.result.token)
        // const user_info = getUserInfo(res.data.result.token)
        // data.userId=user_info.userId
        // localStorage.setItem('is_login',true)

        data.userId=1
        localStorage.setItem('token',1)
        localStorage.setItem('is_login',true)
        dispatch(setUser(data))
    })
    
  }
}
const loginAPI2=(email,password)=>{
  const data = {
    "id": 101,
    "email": email,
    "password": password,
  }
  return function (dispatch) {
    API.get("/api/login",data)
    .then((res) => {
        // 토큰 &디코딩 // user_info = {iat: ,userId: }
        // localStorage.setItem('token',res.data.result.token)
        // const user_info = getUserInfo(res.data.result.token)
        // data.userId=user_info.userId
        // localStorage.setItem('is_login',true)

        data.userId=1
        localStorage.setItem('token',1)
        localStorage.setItem('is_login',true)
       
        dispatch(setUser(data))
    })
    
  }
}
const loginCheckAPI=(token)=>{
    return function (dispatch) {
        API.get('/api/login')
          .then((res) => {
            const userInfo = {email: res.data.email,
                nickname: res.data.nickname} 
            dispatch(
                setUser(userInfo)
            );
          })
          .catch((error) => {
            console.log(error.code, error.message);
          });
      };
    };

export const logoutAPI = (token) => {
        return function (dispatch) {
            localStorage.removeItem('token');
            dispatch(logOut());
            window.alert("로그 아웃");

        };
      };

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
				draft.is_login = true;
      }),
		[LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user_info = null;
				draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  getUser,
  logOut,
  signUpAPI,
  loginAPI,
  loginAPI2,
  signUpAPI2,
  loginCheckAPI,
  logoutAPI,
};

export { actionCreators };