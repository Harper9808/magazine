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

const PostList = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, is_loading, paging } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(postActions.getPostAxios());
  }, []);

  return (
    <React.Fragment>
      <Grid padding="12px 0px">
        {list.map((p) => {
            return (
              <Grid bg="#ffffff" margin="8px 0px" key={p.postId}>
                <PostItem {...p} />
              </Grid>
            );
          })}
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