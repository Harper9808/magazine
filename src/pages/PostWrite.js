import React, {useState,useRef } from "react";
import { useSelector,useDispatch  } from 'react-redux';
import styled from "styled-components";
import Grid from "../components/Grid"
import Text from '../components/Text';
import Image from '../components/Image';
import Button from '../components/Button';
import Input from '../components/Input';
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import {useNavigate,useParams} from 'react-router-dom'

const PostWrite = (props) => {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    //로그인 상태 관리/게시글 수정인지 확인 
    const {id} = useParams()
    const is_login = useSelector((state) => state.user.is_login);
    const is_edit = id? true : false;

    const postId=id?id:null

    const post_list = useSelector((state) => state.post.list);
    let _post = is_edit ? post_list.find((post) => post.postId === Number(id)): null;
    
    const preview = useSelector((state) => state.image.preview);
    const image_url = useSelector((state) => state.image.image);
    
    //포스팅 상태 관리
    const [content, setContent] = useState(_post? _post.content : "");
    const [layout, setLayout] = useState(_post ? _post.layout : "default");

    //이미지 
    const fileInput = useRef();
    const fileInputClick = () => {
        fileInput.current.click();
      };
    const selectFile = (e) => {
        const reader = new FileReader();
        const file = fileInput.current.files[0];
        reader.readAsDataURL(file);
        reader.onload = function(){
            var dataURL = reader.result;
            dispatch(imageActions.setPreview(dataURL));
            dispatch(imageActions.uploadImage(file));
            console.log("이미지",image_url)
          };
        }
    const addPost = () => {
        if (content === "") {
            window.alert("게시글 내용을 작성해주세요.")
            return;
        }
        // dispatch(postActions.addPostAxios(content, layout));
        //폼데이터로 변경 
        const formData = new FormData()
        formData.append('content', content)
        formData.append('image',image_url)
        formData.append('layout',layout)
        const path = postId?`post/${postId}`:'post'
        
        postActions.addPostAxiosAPI(formData, path)

    
    };
    const editPost = () => {
        const formData = new FormData()
        formData.append('content', content)
        formData.append('image',preview )
        formData.append('layout',layout)
        const path = postId?`post/${postId}`:'post'
        dispatch(
        postActions.updatePostAxios(postId, formData,path)
        );
      };
    const editPost2 = () => {
        const data = {
            content:content,
            layout:layout,
            image:preview
        }
        dispatch(
        postActions.updatePostAxios2(data,_post.id)
        );
      };
  
    const changeContent = (e) => {
        setContent(e.target.value)
    };

    const layoutCheck = (e) => {
        if (e.target.checked) {
            setLayout(e.target.value);
        }
        console.log(e.target.value);
    }

    if (!is_login) {
        return (
            <React.Fragment>
                <Grid margin="70px"/>
                <Grid padding="16px" center="center">
                    <Text color="red" size="32px" bold="bold">로그인 해주세요!</Text>
                    <Text size="16px">로그인 후에만 글을 쓸 수 있어요</Text>
                    <ButtonSt>
                        <Button position="bottom" text="로그인" onClick={()=>{navigate("/login")}}/>
                    </ButtonSt>
                </Grid>
            </React.Fragment>
        )
    };

    return (
        <React.Fragment>
            <Grid margin="60px"/>
            <Grid padding="16px 16px 0px 16px">
                <Text margin="20px 0px" size="26px" bold="bold">
                    {is_edit? "게시글 수정": "게시글 작성"}
                </Text>
            </Grid>
            <Grid padding="0px 16px">
                <Text size="20px" bold="bold">레이아웃 선택</Text>
                <input type="radio" name="layout" value='default'  id="bottom"checked ={layout==='default'}onChange={layoutCheck}/>
                <strong >기본</strong>
                <input type="radio" name="layout" value='right'  id="bottom"checked ={layout==='right'} onChange={layoutCheck}/>
                <strong >Right (사진 오른쪽)</strong>
                <input type="radio" name="layout" value='left' id="bottom" checked ={layout==='left'} onChange={layoutCheck}/>
                <strong >Left (사진 왼쪽)</strong>
            </Grid>
            <Grid>
            <input type="file" style ={{display:"none"}} ref={fileInput}onChange={selectFile}/>
            <ButtonSt>
                <Button text="업로드" onClick={fileInputClick}></Button>
            </ButtonSt>
            </Grid>
            <Grid>
              <Text> 미리보기</Text>
              <Grid is_flex padding="40px" direction={`${(layout==='right'?'row-reverse':layout==='default'?'column':'row')}`} >
                <Grid is_flex padding="0px 0px 10px 0px">
                    <Image half="half" shape="rectangle" src={preview  ? preview : "http://via.placeholder.com/400x300"}/>
                </Grid>
                <Grid padding="0px 0px 10px 30px"> 컨텐츠 </Grid>
              </Grid>
            </Grid>
            <Grid padding="16px 16px">
                <Input
                    value={content}
                    write="write"
                    label="게시글 내용"
                    placeholder="내용을 입력하세요."
                    onChange={changeContent}/>
            </Grid>
            <Grid padding="0px 16px">
                <ButtonSt>
                    {is_edit? 
                    (<Button position="bottom" text="수정" onClick={editPost2}/>)
                    :(<Button position="bottom" text="작성" onClick={addPost}/>)
                    }
                </ButtonSt>
            </Grid>
        </React.Fragment>
    )
}

const ButtonSt = styled.div `
  display: flex;
  flex-direction: column;
`
export default PostWrite;