import React, { useState } from "react";
import styled from "styled-components";
import Grid from "../components/Grid"
import Text from '../components/Text';
import Button from '../components/Button';
import Input from '../components/Input';
import { emailCheck,passwordCheck } from "../shared/CheckData";
// 리덕스 관련
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setID] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd_check, setPwdCheck] = useState("");
  const [user_name, setUserName] = useState("");
  

  const signup = () => {
    if ( id === "" || pwd === "" || user_name === "" ) {
      alert('아이디, 비밀번호, 닉네임을 모두 입력해주세요.')
      return;
    }

    if(!emailCheck(id)) {
      alert("올바른 이메일 형식을 입력하세요.")
      return;
    }

    if(!passwordCheck(pwd)) {
      alert("영문, 숫자 조합 8자리 이상 20자리 이하로 입력해주세요.")
      return;
    }

    if ( pwd !== pwd_check ) {
      alert('비밀번호가 일치하지 않습니다.')
      return;
    }

    if ( pwd.length < 8 ) {
      alert('비밀번호가 너무 짧습니다.')
      return;
    }

    dispatch(userActions.signInAPI(id, pwd, user_name))
    navigate("/login")
    
  }
  return(
    <React.Fragment>
      <Grid margin="60px"/>
       <Grid padding="16px">
        <SignupSt>
          <Text size="32px" bold>회원가입</Text>
          
          <Input
            label="아이디"
            type="email"
            placeholder="이메일을 입력하세요."
            onChange={(e) => {
              setID(e.target.value);
            }}
          />
          
          <Input
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력하세요."
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          <Input
            label="비밀번호"
            type="password"
            placeholder="영문, 숫자 조합 8자리 이상 20자리 이하"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          />

          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력하세요."
            onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
                      
          <Button position="bottom" text="회원가입" onClick={signup}></Button>
        </SignupSt>
      </Grid>
    </React.Fragment>
  )
}

const SignupSt = styled.div`
  display: flex;
  flex-direction: column;
`
const P = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 12px;
  color: red;
  display: none;
`

export default Signup;