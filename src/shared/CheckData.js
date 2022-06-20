// 이메일 형식 체크
export const emailCheck = (email) => {
  let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

  return _reg.test(email);
}

  // 비밀번호 형식 체크 : 영문, 숫자 조합으로 8자리 이상, 20자리 이하 입력
export const passwordCheck = (pwd) => {
    let regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  
    return regPass.test(pwd);
  }