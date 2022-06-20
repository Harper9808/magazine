// 리덕스
import { createAction, handleActions } from "redux-actions";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as imageActions } from "./image";
import { produce } from "immer";
// API연결
import { API } from "../../API/API";

// 액션 정의
const GET_POST = "GET_POST";
const GET_ONE_POST = "GET_ONE_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

// action creators
const getPost = createAction(GET_POST, (post_list) => ({
  post_list,
}));
const getOnePost = createAction(GET_ONE_POST, (post) => ({ post }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const addPost = createAction(ADD_POST, (post) => ({ post }));
const updatePost = createAction(UPDATE_POST, (postId, post) => ({
  postId,
  post,
}));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));

// 초기화 정보
const initialState = {
  list: [],
};

const initialPost = {
  postId:"",
  title:"",
  content:"",
  userId:"",
  image :"",
  likeByMe: "",
  likeCount: 0,
  createdAt: "",
  layout: "",
};

// 미들웨어
export const getPostAxios = () => {
  return function (dispatch) {
    API.get('api/post')
      .then((res) => {
        console.log("getPostAxios res",res)
        //서버  dispatch(getPost(res.data.result.post_list));
        dispatch(getPost(res.data));
      })
      .catch((err) => console.log("getPostAxiosERR?::: ", err.response));
  };
};


const getOnePostAxios = (postId) => {
  const token=localStorage.getItem('is_login')
  return function (dispatch) {
    API.get(`api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        dispatch(getOnePost(res.data));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
const getOnePostAxios2 = (postId) => {
  const token=localStorage.getItem('is_login')
  return function (dispatch) {
    API.get(`api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        dispatch(getOnePost(res.data));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
const addPostAxios = (contents = "", layout = "") => {
  const token=localStorage.getItem('token')
  return function (dispatch, getState) {
    const _user = getState().user.user;
    const user_info = {
      nickname: _user.nickname,
    };
    const _post = {
      ...initialPost,
      contents: contents,
      layoutType: layout,
    };
    const _image = getState().image.preview;
    const postData = { ..._post, imageUrl: "" };
    API.post("api/post", postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((doc) => {
      dispatch(addPost(doc.data));
      dispatch(imageActions.setPreview(null));
    })
    .catch((err) => {
      window.alert("앗! 글쓰기에 문제가 있어요!");
      console.log("글작성API::::: ", err.response);
    });

}
}

const addPostAxiosAPI = (content,path) => {
  const token=localStorage.getItem('token')
  return function (dispatch, getState) {
    API.post(path, content, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {

    })
    .catch((err) => {
      window.alert("앗! 글쓰기에 문제가 있어요!");
      console.log("글작성API::::: ", err.response);
    });

}
}
 
const updatePostAxios2=(data,id)=>{
  return function(dispatch){
    API.patch(`/api/post/${id}`,data,{
      headers: {
        'Content-Type': 'application/json'},
  })
    .then((res)=>{
      console.log(res)
    })
  }

}
const updatePostAxios = (formdata,postId,path) => {
  const token=localStorage.getItem('token')
  return function (dispatch, getState) {
    API.post(path, formdata, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("수정하기")
      const data = {
        content : formdata.content,
        layout:formdata.laout,
        image: formdata.image
      }
      dispatch(updatePost(postId, data));
    })
    .catch((err) => console.log("업데이트 게시글::::: ", err.response));
    };
}
    // else {} : 이미지 주소 갱신하고 업데이트 
      // const _upload = storage
      //   .ref(`images/${postId}_${new Date().getTime()}`)
      //   .putString(_image, "data_url");
      // _upload.then((snapshot) => {
      //   snapshot.ref
      //     .getDownloadURL()
      //     .then((url) => {
      //       return url;
      //     })
      //     .then((url) => {
      //       API
      //         .put(
      //           `api/post/${postId}`,
      //           { ...post, imageUrl: url },
      //           {
      //             headers: {
      //               Authorization: `Bearer ${token}`,
      //             },
      //             withCredentials: true,
      //           }
      //         )
      //         .then((res) => {
      //           console.log(res)
      //           history.replace("/");
      //           dispatch(updatePost(postId, { ...post, imageUrl: url }));
      //         })
      //         .catch((err) => console.log(" ", err.response));
      //     })
      //     .catch((err) => {
      //       console.log("업데이트 게시글::::: ", err.response);
      //     });
      // });
//     }
//   };
// };

const deletePostAxios = (postId) => {
  const token=localStorage.getItem('token')
  return function (dispatch) {
    if (!postId) {
      console.log("게시물 정보가 없어요!");
      return;
    }
    API
      .delete(`api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        dispatch(deletePost(postId));
      })
      .catch((err) => console.log("게시글삭제::::: ", err.response));
  };
};
const deletePostAxios2 = (postId) => {
  return function (dispatch) {
    API.delete(`/api/post/${postId}`).then((res) =>  {
        console.log("삭제",res)
        dispatch(deletePost(postId));
      })
      .catch((err) => console.log("게시글삭제::::: ", err.response));
  };
};
export default handleActions(
    {
      [GET_POST]: (state, action) =>
        produce(state, (draft) => {
          draft.list=action.payload.post_list
        }), 
      [GET_ONE_POST]: (state, action) =>
        produce(state, (draft) => {
          draft.list.push(action.payload.post);
        }),
  
      [ADD_POST]: (state, action) =>
        produce(state, (draft) => {
          draft.list.unshift(action.payload.post);
        }),
  
      [UPDATE_POST]: (state, action) =>
        produce(state, (draft) => {
          draft.list[0] = { ...action.payload.post };
        }),
  
      [LOADING]: (state, action) =>
        produce(state, (draft) => {
          draft.is_loading = action.payload.is_loading;
        }),
    },
    initialState
  );
  
  const actionCreators = {
    getPost,
    getOnePost,
    getOnePostAxios2,
    addPost,
    addPostAxiosAPI,
    updatePost,
    deletePost,
    getPostAxios,
    getOnePostAxios,
    addPostAxios,
    updatePostAxios,
    updatePostAxios2,
    deletePostAxios,
    deletePostAxios2
  };
  export { actionCreators };