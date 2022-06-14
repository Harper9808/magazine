import React, { useState } from "react";
import styled from "styled-components";
import Grid from "../components/Grid"
import Text from '../components/Text';
import Button from '../components/Button';
import Input from '../components/Input';
import { emailCheck } from "../shared/CheckData";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [pwd, setPwd] = useState();
  const dispatch = useDispatch();

  const login = () => {
    if( id === "" || pwd === "" ) {
      window.alert('아이디와 비밀번호를 모두 입력하세요.')
      return;
    }
    if(!emailCheck(id)) {
      alert("올바른 이메일 형식을 입력하세요.")
      return;
    }
    dispatch(userActions.loginAPI(id, pwd))
    navigate("/")
  }

  return(
    <React.Fragment>
      <Grid margin="60px"/>
      <Grid padding="16px">
        <LoginSt>
          <Text size="32px" bold>로그인</Text>
          <Input label="아이디" type="text" placeholder="아이디를 입력하세요."
            onChange={(e) => {
              setId(e.target.value)
            }}
          />

          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={(e) => {
              setPwd(e.target.value)
            }}
          />

          <Button position="bottom" text="로그인하기" onClick={login}></Button>
        </LoginSt>
      </Grid>
    </React.Fragment>
  )

}

const LoginSt = styled.div`
  display: flex;
  flex-direction: column;
`

export default Login;