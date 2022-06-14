import React from "react";
import styled from "styled-components";
import Grid from "./Grid"
import Text from './Text';
import Image from './Image';


const PostItem = (props) => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Grid is_flex padding="10px 20px" bg="#F5F5F5">
          <Grid is_flex width="auto" >
            {/* <Image shape="circle" src={props.user_info.user_profile}/> */}
            <Text margin="13px" bold>{props.title}</Text>
          </Grid>

          <Grid is_flex width="auto">
            <Text>{props.createdAt}</Text>
            <ButtonSt>수정</ButtonSt>
            <ButtonSt>삭제</ButtonSt>
          </Grid>
        </Grid>
        <Grid  width="100%" maring="2%">
        {(props.layout === "right") ?
                  <Grid bg="#fafaf2" is_flex justify-content ="space-between">
                  <Grid width="50%" padding="16px" >
                    <Text align="center" bold>{props.content}</Text>
                  </Grid>
                  <Grid bg="#a8a8a8" width="50%" padding="16px">
                    <Image shape="rectangle" src={props.image}/>
                  </Grid>
                </Grid>
        :((props.layout === "left") ?
           <Grid bg="#fafaf2" is_flex justify-content ="space-between">
           <Grid width="50%" padding="16px" >
           <Image shape="rectangle" src={props.image}/>
           </Grid>
           <Grid bg="#a8a8a8" width="50%" padding="16px">
           <Text align="center" bold>{props.content}</Text>
           </Grid>
         </Grid>
         :
           <Grid bg="#fafaf2" is_flex justify-content ="space-between">
           <Grid width="100%" padding="16px" >
             <Text align="center" bold>{props.content}</Text>
           </Grid>
           <Grid bg="#a8a8a8"  width="100%"  padding="16px">
             <Image shape="rectangle" src={props.image}/>
           </Grid>
         </Grid>)}
          <Grid padding="16px" bg="#F5F5F5">
            <Text blod>❤️ 좋아요 </Text>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

PostItem.defaultProps = {
  user_info: {
    user_name: "유저1",
    user_profile: "http://via.placeholder.com/100x100",
  },
  image: "http://via.placeholder.com/400x300",
  content: "글 내용",
  comment_cnt: 10,
  createdAt: "",
  is_me: null,
};

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



export default PostItem;