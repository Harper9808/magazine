import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// actions
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image) => ({ image }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));


// initial state
const initialState = {
    image: "",
    uploading: false,
    preview: "",
  };
export function uploadImageAPI(image) {
    return function (dispatch) {
      dispatch(setPreview(image.preview));
      // const _upload = storage.ref(`images/${image.name}`).put(image);
  
      // //   업로드!
      // _upload.then((snapshot) => {
      //   console.log(snapshot);
  
      //   // 업로드한 파일의 다운로드 경로를 가져오자!
      //   snapshot.ref.getDownloadURL().then((url) => {
      //     console.log(url);
      //     dispatch(uploadImage(url));
      //   });
      // }).catch(err => {
      //     dispatch(uploading(false));
      // });
    };
  }
  
  
  // reducer
  export default handleActions(
    {
      [UPLOAD_IMAGE]: (state, action) =>
        produce(state, (draft) => {
          draft.image = action.payload.image;
        }),
  
      [UPLOADING]: (state, action) =>
        produce(state, (draft) => {
          draft.uploading = action.payload.uploading;
        }),
  
      [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        console.log("priview",action.payload.preview)
        draft.preview = action.payload.preview;
      }),
    },
    initialState
  );
  const actionCreators = {
    uploadImage,
    setPreview,
    uploadImageAPI
  };
  
  export { actionCreators };