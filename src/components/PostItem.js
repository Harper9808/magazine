import React from "react";

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
        </Grid>
        <Grid  width="100%" maring="2%" is_flex direction={`${(props.layout==='right'?'row-reverse':props.layout==='default'?'column':'row')}`} >
          <Grid is_flex>
            <Text align="center" bold>{props.content}</Text>
          </Grid>
          <Grid is_flex bg="#a8a8a8" width="50%" padding="16px">
            <Image shape="rectangle" src={props.image}/>
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



export default PostItem;