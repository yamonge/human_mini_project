import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import {
  LoginContainer,
  Header,
  Title,
  Subtitle,
  CloseButton,
  LoginForm,
  InputGroup,
  Label,
  LoginInput,
  Button,
  SocialLoginGroup,
  SocialButton,
  AccountRecovery,
  OrDivider,
} from "../Login/LoginCss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AxiosApi from "../../api/AxiosApi";

const Login = () => {
  // 사용자 이메일 상태 변수
  const [email, setEmail] = useState("");
  // 사용자 비밀번호 상태 변수
  const [password, setPassword] = useState("");

  // 이메일 유효성 검사 상태 ('null', 'valid', 'invalid')
  const [isEmailValid, setIsEmailValid] = useState("null");
  // 비밀번호 유효성 검사 상태 ('null', 'valid', 'invalid')
  const [isPasswordValid, setIsPasswordValid] = useState("null");
  // 비밀번호 표시/숨김 상태
  const [showPassword, setShowPassword] = useState(false);

  // 페이지 이동을 위한 useNavigate 훅 사용
  const navigate = useNavigate();

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return ""; // 이메일이 비어있으면 빈 문자열 반환
    }
    return emailRegex.test(email) ? "valid" : "invalid"; // 정규식 테스트 결과에 따라 'valid' 또는 'invalid' 반환
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    // 비밀번호는 최소 8자, 영문, 숫자, 특수문자 포함
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password) {
      return ""; // 비밀번호가 비어있으면 빈 문자열 반환
    }
    return passwordRegex.test(password) ? "valid" : "invalid"; // 정규식 테스트 결과에 따라 'valid' 또는 'invalid' 반환
  };

  // 이메일 입력 필드 변경 핸들러
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value); // 이메일 상태 업데이트
    setIsEmailValid(validateEmail(value)); // 이메일 유효성 검사 및 상태 업데이트
  };

  // 비밀번호 입력 필드 변경 핸들러
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value); // 비밀번호 상태 업데이트
    setIsPasswordValid(validatePassword(value)); // 비밀번호 유효성 검사 및 상태 업데이트
  };

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    // 1. 빈값 체크 및 형식 체크
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }

    const response = await AxiosApi.login({ email, password });
    // 최종적으로 Header.js가 읽어갈 'user' 정보 생성
    if (response.success) {
      const userData = {
        name: response.data.name,
        email: response.data.email,
        userId: response.data.userId, // 임시 userId
        isAdmin: response.data.admin, // 임시 isAdmin
      };

      // localStorage에 사용자 정보 저장
      localStorage.setItem("user", JSON.stringify(userData));

      alert(`${userData.name}님 환영합니다!`);
      window.location.href = "/"; // 메인으로 이동하면서 헤더 갱신
    } else {
      alert(response);
      return;
    }
  };

  // 회원가입 버튼 클릭 핸들러
  const handleRegisterClick = () => {
    navigate("/signup"); // 회원가입 페이지로 이동
  };

  // 닫기 버튼 클릭 핸들러
  const handleClose = () => {
    navigate("/"); // 메인으로 이동
  };

  // 아이디/비밀번호 찾기 버튼 클릭 핸들러
  const handleAccountRecovery = () => {
    navigate("/account-recovery"); // 계정 복구 페이지로 이동
  };

  return (
    <LoginContainer>
      <Header>
        <Title>로그인</Title>
        <Subtitle>뮤지컬 커뮤니티에 오신 것을 환영합니다</Subtitle>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
      </Header>
      <LoginForm onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <LoginInput
            type="email"
            id="email"
            placeholder="example@email.com"
            value={email} // email 상태와 바인딩
            onChange={handleEmailChange} // 변경 핸들러 연결
            validationStatus={isEmailValid}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">비밀번호</Label>
          <div style={{ position: "relative", width: "100%" }}>
            <LoginInput
              type={showPassword ? "text" : "password"} // showPassword 상태에 따라 타입 변경
              id="password"
              placeholder="••••••••"
              value={password} // password 상태와 바인딩
              onChange={handlePasswordChange} // 변경 핸들러 연결
              validationStatus={isPasswordValid}
              style={{ paddingRight: "40px" }}
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#888",
              }}
              onClick={() => setShowPassword(!showPassword)} // 클릭 시 showPassword 상태 토글
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* 아이콘 변경 */}
            </span>
            <AccountRecovery onClick={handleAccountRecovery}>
              아이디 · 비밀번호 찾기
            </AccountRecovery>
          </div>
        </InputGroup>
        <Button type="submit">로그인</Button>
        <Button type="button" outline onClick={handleRegisterClick}>
          회원가입
        </Button>{" "}
        {/* onClick 이벤트 추가 */}
      </LoginForm>
      <OrDivider>또는</OrDivider>
      <SocialLoginGroup>
        <SocialButton social="google">
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google"
            style={{ width: "20px", marginRight: "8px" }}
          />
          Google
        </SocialButton>
        <SocialButton social="github">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/github.png"
            alt="GitHub"
            style={{ width: "20px", marginRight: "8px" }}
          />
          GitHub
        </SocialButton>
      </SocialLoginGroup>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "12px",
          color: "#666",
        }}
      >
        MUSICAL COMMUNITY
      </div>
    </LoginContainer>
  );
};

export default Login;
