import axios from 'axios';
import React, { useRef } from "react";
import styled from "styled-components";
import Button from '../components/Button';
import { actionCreators as imageActions } from "../redux/modules/image";
import { useDispatch } from "react-redux";


const Upload = (props) => {
    const is_uploading = false
    const fileInput = useRef();
    const dispatch= useDispatch()

    const fileInputClick = () => {
        fileInput.current.click();
      };

    const selectFile = (e) => {

        const reader = new FileReader();
        const file = fileInput.current.files[0];
        //api연결 부분 
        // const formdata = new FormData();
        // formdata.append("PostImage",file)
        // const config= {
        //     Headers : {
        //         'content-type':'numltipart/form-data',
        //     },
        // }
        // axios.post('api',formdata,config)
        reader.readAsDataURL(file);
        const img={
            image_url: reader.result,
            uploading: false,
            preview:  reader.result,
        }
        reader.onload=function(){
            dispatch(imageActions.setPreview( reader.result));
        }
    }
    const UploadServer = () => {
        let image = fileInput.current.files[0];
        console.log(image)
    }
    return (
        <React.Fragment>
            <input type="file" style ={{display:"none"}} ref={fileInput }onChange={selectFile}/>
            <ButtonSt>
                <Button text="업로드" onClick={fileInputClick}></Button>
            </ButtonSt>
        </React.Fragment>
    )
}

const ButtonSt = styled.div`
margin: 20px;
  display: flex;
  flex-direction: column;
`

export default Upload;
