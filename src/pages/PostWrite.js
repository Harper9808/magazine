import React, {useState} from "react";
import { useSelector,useDispatch  } from 'react-redux';
import styled from "styled-components";
import Upload from '../shared/Upload';
import Grid from "../components/Grid"
import Text from '../components/Text';
import Image from '../components/Image';
import Button from '../components/Button';
import Input from '../components/Input';
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import {useNavigate} from 'react-router-dom'

const PostWrite = (props) => {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const id = null
    const is_edit = id? true : false;
    const preview = useSelector((state) => state.image.preview);
    //포스팅 상태 관리
    const [content, setContent] = useState("");
    const [layout, setLayout] = useState("DEFAULT");
    const layout_list = ["DEFAULT", "RIGHT", "LEFT"];


    const addPost = () => {
        if (content === "") {
            window.alert("게시글 내용을 작성해주세요.")
            return;
        }
        dispatch(postActions.addPostAxios(content, layout));

    };
    const editPost = () => {
        dispatch(
          postActions.updatePostAxios(id, { content: content, layoutType: layout })
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
                <input type="radio" name="layout" value="default" id="bottom" onChange={layoutCheck}/>
                <strong >기본</strong>
                <input type="radio" name="layout" value="Right" id="bottom" onChange={layoutCheck}/>
                <strong >Right (사진 오른쪽)</strong>
                <input type="radio" name="layout" value="left" id="bottom" onChange={layoutCheck}/>
                <strong >Left (사진 왼쪽)</strong>
            </Grid>
            <Grid>
              <Upload></Upload>
              <Grid>
              <Text> 미리보기</Text>
              <Grid is_flex padding="40px">
                  <Grid padding="0px 0px 10px 0px">
                      <Image half="half" shape="rectangle" src={preview  ? preview : "http://via.placeholder.com/400x300"}/>
                  </Grid>
                  <Grid padding="0px 0px 10px 30px"> 컨텐츠 </Grid>
                </Grid>
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
                    {
                        is_edit
                            ? (<Button position="bottom" text="수정" onClick={editPost}/>)
                            : (<Button position="bottom" text="작성" onClick={addPost}/>)
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