// PostList.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Grid from '../components/Grid';
import Button from '../components/Button';
import PostItem from "../components/PostItem";
import {useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { replace } from 'connected-react-router';


const PostList = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list } = useSelector((state) => state.post);
  const user_info = useSelector((state) => state.user.user);
  
  useEffect(() => {
    console.log("test2")
    dispatch(postActions.getPostAxios());
  }, []);

  return (
    <React.Fragment>
      <Grid padding="12px 0px">
        {list.map((p) => {
          
          if (p.userId === user_info?.userId) {
            return (
              <Grid bg="#ffffff" margin="8px 0px" key={p.postId}   
              onClick={()=>{navigate(`/post/${p.postId}`,{replace:true})}}>
                <PostItem {...p} is_me={p.userId === user_info?.userId} />
              </Grid>
            );
          }
          else {
            return(
              <Grid bg="#ffffff" margin="8px 0px" key={p.postId}   
              onClick={()=>{navigate(`/post/${p.postId}`,{replace:true})}}>
            
                <PostItem {...p} />
              </Grid>
            )
          }
          })
        }
          <ButtonF onClick={() => {  navigate("/PostWrite")}}>추가</ButtonF>
      </Grid>
    </React.Fragment>
  );
};


const ButtonF=  styled.button`
  display: flex;
  position: fixed;
  width: 20%;
  height:10%;
  right: 10%;
  bottom: 10%;
  z-index: 999;
`
export default PostList;