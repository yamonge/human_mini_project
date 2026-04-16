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

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState("null");
  const [isPasswordValid, setIsPasswordValid] = useState("null");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // useNavigate 훅 사용

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "";
    }
    return emailRegex.test(email) ? "valid" : "invalid";
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password) {
      return "";
    }
    return passwordRegex.test(password) ? "valid" : "invalid";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setUserEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setUserPassword(value);
    setIsPasswordValid(validatePassword(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. 빈값 체크 및 형식 체크 (기존과 동일)
    if (!userEmail || !userPassword) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }

    // 3. 테스트용 50% 로그인 성공 시뮬레이션
    const success = Math.random() > 0.5;

    if (success) {
      // [수정된 부분] 회원가입 때 저장했던 정보를 가져옴
      const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

      let userName = "";

      // 만약 회원가입했던 이메일과 지금 로그인하려는 이메일이 같다면 가입한 이름을 사용
      if (registeredUser && registeredUser.email === userEmail) {
        userName = registeredUser.name;
      } else {
        // 회원가입 기록이 없거나 다른 이메일이면 이메일 앞자리 사용(예외처리)
        userName = userEmail.split("@")[0];
      }

      // 최종적으로 Header.js가 읽어갈 'user' 정보 생성
      const userData = {
        name: userName,
        email: userEmail,
        userId: 1,
        isAdmin: true,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      alert(`${userData.name}님 환영합니다!`);
      window.location.href = "/"; // 메인으로 이동하면서 헤더 갱신
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  const handleRegisterClick = () => {
    navigate("/signup"); // 회원가입 페이지로 이동
  };

  const handleClose = () => {
    navigate("/"); // 메인으로 이동
  };

  const handleAccountRecovery = () => {
    navigate("/account-recovery");
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
            value={userEmail}
            onChange={handleEmailChange}
            validationStatus={isEmailValid}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">비밀번호</Label>
          <div style={{ position: "relative", width: "100%" }}>
            <LoginInput
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              value={userPassword}
              onChange={handlePasswordChange}
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
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
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
