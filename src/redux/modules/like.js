import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { API } from "../../API/API";
// const SET_LIKE = 'SET_LIKE';
const ADD_LIKE = "ADD_LIKE";
const CANCEL_LIKE = "CANCEL_LIKE";

// const setLike = createAction(SET_LIKE, (postId) => ({ postId }));

const addLike = createAction(ADD_LIKE, (postId) => ({ postId }));

const cancelLike = createAction(CANCEL_LIKE, (postId) => ({ postId }));

const initialState = {
  newLikeCnt: 0,
  message: "",
};

const addLikeAxios = (postId) => {
  const token =localStorage.getItem('token')
  return function (dispatch) {
    API
      .post(
        `api/post/${postId}/like`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(addLike(postId));
      })
      .catch((err) => {
        console.log("like::: ", err.response);
      });
  };
};
const cancelLikeAxios = (postId) => {
    const token =localStorage.getItem('token')
    return function (dispatch) {
      API
        .get(
          `api/post/${postId}/like`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          { withCredentials: true }
        )
        .then((res) => {
          // console.log(res);
          dispatch(cancelLike(postId));
        })
        .catch((err) => {
          console.log("like::: ", err.response);
        });
    };
  };


const addLikeAxios2 = (id,postId,likeCount) => {
    return function (dispatch) {
      API
        .patch(`/api/post/${id}`,likeCount,
          { headers: {
            'Content-Type': 'application/json'},
          },
        )
        .then((res) => {
          console.log(res);
          dispatch(addLike(postId));
        })
        .catch((err) => {
          console.log("like::: ", err.response);
        });
    };
  };


const cancelLikeAxios2 = (id,postId,likeCount) => {
    return function (dispatch) {
      API
      .patch(`/api/post/${id}`,likeCount,
          { headers: {
            'Content-Type': 'application/json'},
          },
        )
        .then((res) => {
          // console.log(res);
          dispatch(cancelLike(postId));
        })
        .catch((err) => {
          console.log("like::: ", err.response);
        });
    };
  };

export default handleActions(
  {
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId].push(action.payload.newLikeCnt);
      }),
    [CANCEL_LIKE]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {

  addLikeAxios,
  addLikeAxios2,
  cancelLikeAxios,
  cancelLikeAxios2,

};

export { actionCreators };