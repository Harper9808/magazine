import React from "react";
import { useSelector,useDispatch } from "react-redux";
import {useParams,useNavigate} from 'react-router-dom'
import styled from "styled-components";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Grid from "../components/Grid";
import Text from '../components/Text';

import {API} from '../API/API';
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as likeActions } from "../redux/modules/like";
import PostItem from "../components/PostItem";

const PostDetail = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()

  const post_list = useSelector((state) => state.post.list);
  const post_idx = post_list.findIndex(post => post.postId === Number(id));
  const post_data = post_list[post_idx];
  const [post, setPost] = React.useState(post_data ? post_data : null);
  const user_info = useSelector((state) => state.user.user);

  const [likeCount, setlikeCount] = React.useState(post.likeCount);
  const [likeByMe, setLikeByMe] = React.useState(post.likeByMe);

  React.useEffect(() => {
    // const token = localStorage.getItem('token')
    // API.get(`api/post/${post.postId}`,{
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // }).then((res) => {
    //   setPost({
    //         ...post,
    //         likeByMe: res.likeByMe,
    //         likeCount: res.likeCount,
    //         userId: res.userId,
    //     })
    // })
    API.get(`api/post/postId=${post.postId}`, {
      headers:{
        'Content-Type': 'application/json; charset=utf-8'
      }
        
      })
      .then((res) => {
        setPost({
            ...post,
            likeByMe: res.data[0].likeByMe,
            likeCount: res.data[0].likeCount,
            userId: res.data[0].userId,
        })
        console.log(res)
        console.log(post)
      })

      .catch((err) => {
        console.log(err.response);
        
      });
      
},[])

  const deletePost2 = (e) => {
    console.log("props",props)
    dispatch(postActions.deletePostAxios2(post.id));
    navigate('/',{replace:true})
  };
  const deletePost1 = (e) => {
    dispatch(postActions.deletePostAxios(post.postId));
  };

  const addLike2 =(e)=>{
    setLikeByMe(true);
    setlikeCount(likeCount+1);
    const data={likeCount:likeCount}
    dispatch(likeActions.addLikeAxios2(post.id,post.postId,data))

  }
  const cancelLike2=(e)=>{
    setLikeByMe(false);
    setlikeCount(likeCount-1);
    const data={likeCount:likeCount}
    dispatch(likeActions.cancelLikeAxios2(post.id,post.postId,data))
  }
  return (
    <React.Fragment>
      {console.log("디테일 마지막",user_info,post)}
      <PostItem {...post} is_me = {post.userId === user_info?.userId}/>
      <Grid is_flex width="auto">
          {
            post.userId === user_info?.userId
                ? (
                  <Grid>
                    <ButtonSt onClick={()=>{navigate(`/postModify/${post.postId}`)}}>수정</ButtonSt>
                    <ButtonSt onClick={deletePost2}>삭제</ButtonSt>
                  </Grid>
                )
                : (<Grid></Grid>)
        }
        
        
        </Grid>
      <Grid padding="16px" bg="#F5F5F5">
        {likeByMe===true?(
          <FavoriteIcon style={{ color: "red" }} onClick={cancelLike2} />
        )
        :(<FavoriteBorderIcon onClick={addLike2} />)
        }
        <Text blod>좋아요 {post.likeCount} 개</Text>
      </Grid>
    </React.Fragment>
  );
}
const ButtonSt = styled.button`
font-size: 10px;
height: 20px;
margin-top: 14px;
margin-left: 5px;
border: none;
border-radius: 3px;
background-color: black;
color: white;
`


export default PostDetail;