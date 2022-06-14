// 리덕스
import { createAction, handleActions } from "redux-actions";
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
  contents: "testContents_admin",
  imageUrl: "testUrl_admin",
  layoutType: "RIGHT",
};

// 미들웨어
export const getPostAxios = () => {

  return function (dispatch) {
    API.get('/posts')
      .then((res) => {
        dispatch(getPost(res.data));
      })
      .catch((err) => console.log("getPostAxios::: ", err.response));
  };
};


const getOnePostAxios = (postId) => {
  const token=localStorage.getItem('is_login')
  return function (dispatch) {
    API.get(`api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
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
  const token=localStorage.getItem('is_login')
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
    // const _upload = storage
    //   .ref(`images/${user_info.nickname}_${new Date().getTime()}`)
    //   .putString(_image, "data_url");

    // _upload.then((snapshot) => {
    //   snapshot.ref
    //     .getDownloadURL()
    //     .then((url) => {
    //       dispatch(imageActions.uploadImage(url));
    //       return url;
    //     })
    //     .then((url) => {
    //       const postData = { ..._post, imageUrl: url };
    //       API
    //         .post("api/post", postData, {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //           withCredentials: true,
    //         })
    //         .then((doc) => {
    //           dispatch(addPost(doc.data));
    //           dispatch(imageActions.setPreview(null));
    //         })
    //         .catch((err) => {
    //           window.alert("앗! 글쓰기에 문제가 있어요!");
    //           console.log("글작성API::::: ", err.response);
    //         });
    //     })
    //     .catch((err) => {
    //       window.alert("앗! 이미지 업로드에 문제가 있어요!");
    //       console.log("글작성API::::: ", err.response);
    //     });
    // });
  // };
// };

const updatePostAxios = (postId = null, post = {}) => {
  const token=localStorage.getItem('is_login')
  return function (dispatch, getState, { history }) {
    if (!postId) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    const _image = getState().image.preview;
    // const _postIdx = getState().post.list.find((p) => p.postId === postId);
    const _post = getState().post.list[0];
    console.log(_post)
    const updatePostData = {
      ...post,
      imageUrl: _post.imageUrl,
    };

    if (_image === _post.imageUrl) {
      API
        .put(`api/post/${postId}`, updatePostData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log(updatePost(postId, updatePostData))
          dispatch(updatePost(postId, updatePostData));
        })
        .catch((err) => console.log("업데이트 게시글::::: ", err.response));
      return;
    }
  }
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

const deletePostAxios = (postId = null) => {
  const token=localStorage.getItem('is_login')
  return function (dispatch, getState, { history }) {
    if (!postId) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    API
      .delete(`api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(() => {
        dispatch(deletePost(postId));
      })
      .catch((err) => console.log("게시글삭제::::: ", err.response));
  };
};

export default handleActions(
    {
      [GET_POST]: (state, action) =>
        produce(state, (draft) => {
          draft.list.push(...action.payload.post_list);
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
    addPost,
    updatePost,
    deletePost,
    getPostAxios,
    getOnePostAxios,
    addPostAxios,
    updatePostAxios,
    deletePostAxios,
  };
  export { actionCreators };