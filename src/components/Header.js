import React from "react";
import styled from "styled-components";
import Button from './Button';
import Text from './Text';
// 컴포넌트

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";
import { useNavigate } from "react-router-dom";


const HeaderSt = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-bottom: 1px solid black;
  div {
    padding-right: 20px;
    padding-left: 20px;
  }
`

const Header = (props) => {
  const navigate =useNavigate()
  const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();
  if(is_login){
    return(
      <React.Fragment>
      <HeaderSt>
      <div style={{backgroundColor:'red'}} onClick={() => {navigate('/')}} > 
        <Button onClick={() => {navigate('/')}}>home</Button>
          <Text bold size="24px">Magazine</Text>
        </div>
        <div>
          <Button position="myheader" text="🙍‍♀️"/>
          <Button position="header" text="알림"/>
          <Button position="header" text="로그아웃" onClick={() => {dispatch(userAction.logoutAPI())}}/>
        </div>
      </HeaderSt>
    </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <HeaderSt>
        <div style={{backgroundColor:'red'}} onClick={() => {navigate('/')}} > 
          <Text
            bold size="24px"
            >Hello, magazine</Text>
        </div>
        <div>
          <Button
            position="header"
            text="로그인" onClick={() => {
              window.location.replace('/login')
            }}
          />
          <Button
            position="header"
            text="회원가입" onClick={() => {
              window.location.replace('/Signup')
            }}
          />
        </div>
      </HeaderSt>
    </React.Fragment>
  )
}


export default Header;