import {API} from '../../API/API'
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {useNavigate} from "react-router-dom";
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
const signInAPI = (email, password,nickname) => {
        return function (dispatch) {
          const data = {
            email: email,
            nickname: nickname,
            password: password,
          }
          API.post('/register',data)
            .then((res) => { console.log(res)
              if(res.success === true){
                if(res.token){
                  localStorage.setItem('is_login',res.token)
                }
                const userInfo = {email: res.data.email,nickname: res.data.nickname}
                window.alert("회원가입이 완료 되었습니다.");
                dispatch(setUser(userInfo))
             
              }
            }).catch((error) => {
              window.alert("회원가입에 실패했습니다..");
              console.log(error);
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
    API.get('/login',data)
    .then((res) => {
      if(res.status === 200){
        if(res.token){
          //토큰저장/ 복호화 
          // localStorage.setItem('is_login',res.token)
        }
        localStorage.setItem('is_login',true)
        const user_info ={...res.data}
        dispatch(setUser(user_info))
      } 
    })
    
  }
}
const loginCheckAPI=(token)=>{
    return function (dispatch) {
        API.get('/user')
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
            localStorage.removeItem("is_login");
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
        draft.user = null;
				draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  getUser,
  logOut,
  signInAPI,
  loginAPI,
  loginCheckAPI,
  logoutAPI,
};

export { actionCreators };