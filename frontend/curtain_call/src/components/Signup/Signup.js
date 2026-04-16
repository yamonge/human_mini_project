import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginContainer, // Reusing LoginContainer for consistent styling
  Header,
  Title,
  Subtitle,
  CloseButton,
  LoginForm,
  InputGroup,
  Label,
  LoginInput, // Reusing LoginInput
  Button,
  ErrorMessage,
  OrDivider,
  SocialLoginGroup,
  SocialButton,
} from "../Signup/SignupCss"; // Adjust path as needed
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  // 사용자 이름(닉네임) 상태 변수
  const [name, setName] = useState("");
  // 로그인용 이메일 주소 상태 변수
  const [email, setEmail] = useState("");
  // 암호화된 비밀번호 상태 변수
  const [password, setPassword] = useState("");
  // 비밀번호 확인을 위한 상태 변수
  const [confirmPassword, setConfirmPassword] = useState("");
  // 사용자 생년월일 상태 변수
  const [birthDate, setBirthDate] = useState("");

  // 이름 유효성 검사 에러 메시지 상태
  const [nameError, setNameError] = useState("");
  // 이메일 유효성 검사 에러 메시지 상태
  const [emailError, setEmailError] = useState("");
  // 비밀번호 유효성 검사 에러 메시지 상태
  const [passwordError, setPasswordError] = useState("");
  // 비밀번호 확인 유효성 검사 에러 메시지 상태
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // 생년월일 유효성 검사 에러 메시지 상태
  const [birthDateError, setBirthDateError] = useState("");

  // 비밀번호 표시/숨김 상태
  const [showPassword, setShowPassword] = useState(false);
  // 확인 비밀번호 표시/숨김 상태
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 페이지 이동을 위한 useNavigate 훅 사용
  const navigate = useNavigate();

  // 이름 유효성 검사 함수
  const validateName = (name) => {
    if (!name) return "";
    return name.length >= 2 ? "valid" : "invalid"; // 예시: 2자 이상
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "";
    return emailRegex.test(email) ? "valid" : "invalid";
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    // 비밀번호는 최소 8자, 영문, 숫자, 특수문자 포함
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password) return "";
    return passwordRegex.test(password) ? "valid" : "invalid";
  };

  // 비밀번호 확인 유효성 검사 함수
  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return "";
    return password === confirmPassword ? "valid" : "invalid";
  };

  // 생년월일 유효성 검사 함수
  const validateBirth_date = (date) => {
    if (!date) return "";
    // 간단한 날짜 형식 (YYYY-MM-DD) 검증
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date) ? "valid" : "invalid";
  };

  // 이름 입력 필드 변경 핸들러
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value); // 이름 상태 업데이트
    setNameError(validateName(value)); // 이름 유효성 검사 및 에러 상태 업데이트
  };

  // 이메일 입력 필드 변경 핸들러
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value); // 이메일 상태 업데이트
    setEmailError(validateEmail(value)); // 이메일 유효성 검사 및 에러 상태 업데이트
  };

  // 비밀번호 입력 필드 변경 핸들러
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value); // 비밀번호 상태 업데이트
    setPasswordError(validatePassword(value)); // 비밀번호 유효성 검사 및 에러 상태 업데이트
    // 비밀번호 변경 시 확인 비밀번호 유효성도 다시 검사
    setConfirmPasswordError(validateConfirmPassword(value, confirmPassword));
  };

  // 확인 비밀번호 입력 필드 변경 핸들러
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value); // 확인 비밀번호 상태 업데이트
    // 확인 비밀번호 유효성 검사 및 에러 상태 업데이트
    setConfirmPasswordError(validateConfirmPassword(password, value));
  };

  // 생년월일 입력 필드 변경 핸들러
  const handleBirth_dateChange = (e) => {
    const value = e.target.value;
    setBirthDate(value); // 생년월일 상태 업데이트
    setBirthDateError(validateBirth_date(value)); // 생년월일 유효성 검사 및 에러 상태 업데이트
  };

  // 회원가입 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    // 🔥 1. 이메일 중복 체크 (맨 위에 넣는게 핵심)
    const existingUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (existingUser && existingUser.email === email) {
      alert("사용할 수 없는 이메일입니다. 다른 이메일을 입력해 주세요.");
      return; // 🔥 여기서 바로 종료
    }

    // 최종 유효성 검사 (모든 필드가 유효해야 제출)
    const isNameValid = validateName(name) === "valid";
    const isEmailValid = validateEmail(email) === "valid";
    const isPasswordValid = validatePassword(password) === "valid";
    const isConfirmPasswordValid =
      validateConfirmPassword(password, confirmPassword) === "valid";
    const isBirth_dateValid = validateBirth_date(birthDate) === "valid";

    if (
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isBirth_dateValid
    ) {
      // 가입할 사용자 데이터 객체 생성
      const registerData = {
        name,
        email,
        password,
        birthDate: birthDate,
        is_admin: 0, // 기본값 0 (일반 사용자)
      };
      // [추가된 부분] 가입한 유저 정보를 'registeredUser'라는 키로 임시 저장
      localStorage.setItem("registeredUser", JSON.stringify(registerData));

      alert("회원가입이 완료되었습니다!");
      navigate("/login"); // 로그인 페이지로 이동
      // 여기에 API 호출 로직 추가 (실제 서버에 사용자 정보를 전송)
    } else {
      alert("모든 필드를 올바르게 입력해주세요.");
      // 입력 에러 메시지 강제 표시
      setNameError(validateName(name));
      setEmailError(validateEmail(email));
      setPasswordError(validatePassword(password));
      setConfirmPasswordError(
        validateConfirmPassword(password, confirmPassword),
      );
      setBirthDateError(validateBirth_date(birthDate));
    }
  };

  // 로그인 버튼 클릭 핸들러
  const handleLoginClick = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  // 닫기 버튼 클릭 핸들러
  const handleClose = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <LoginContainer>
      <Header>
        <Title>회원가입</Title>
        <Subtitle>새로운 계정을 만들어보세요</Subtitle>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
      </Header>
      <LoginForm onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="name">이름</Label>
          <LoginInput
            type="text"
            id="name"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={handleNameChange}
            validationStatus={nameError}
          />
          {nameError === "valid" && (
            <ErrorMessage color="green">올바른 이름 형식입니다.</ErrorMessage>
          )}
          {nameError === "invalid" && (
            <ErrorMessage color="red">
              이름은 2자 이상이어야 합니다.
            </ErrorMessage>
          )}
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <LoginInput
            type="email"
            id="email"
            placeholder="example@email.com"
            value={email}
            onChange={handleEmailChange}
            validationStatus={emailError}
          />
          {emailError === "valid" && (
            <ErrorMessage color="green">올바른 이메일 형식입니다.</ErrorMessage>
          )}
          {emailError === "invalid" && (
            <ErrorMessage color="red">
              올바른 이메일 형식이 아닙니다.
            </ErrorMessage>
          )}
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">비밀번호</Label>
          <div style={{ position: "relative", width: "100%" }}>
            <LoginInput
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              validationStatus={passwordError}
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
          </div>
          {passwordError === "valid" && (
            <ErrorMessage color="green">
              올바른 비밀번호 형식입니다.
            </ErrorMessage>
          )}
          {passwordError === "invalid" && (
            <ErrorMessage color="red">
              비밀번호는 최소 8자이며, 문자, 숫자, 특수문자를 포함해야 합니다.
            </ErrorMessage>
          )}
        </InputGroup>
        <InputGroup>
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <div style={{ position: "relative", width: "100%" }}>
            <LoginInput
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              validationStatus={confirmPasswordError}
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
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {confirmPasswordError === "valid" && (
            <ErrorMessage color="green">비밀번호가 일치합니다.</ErrorMessage>
          )}
          {confirmPasswordError === "invalid" && (
            <ErrorMessage color="red">
              비밀번호가 일치하지 않습니다.
            </ErrorMessage>
          )}
        </InputGroup>
        <InputGroup>
          <Label htmlFor="birthDate">생년월일</Label>
          <LoginInput
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={handleBirth_dateChange}
            validationStatus={birthDateError}
            // placeholder는 type="date"일 때 브라우저 기본 UI에 따라 다르게 보일 수 있음
          />
          {birthDateError === "valid" && (
            <ErrorMessage color="green">올바른 날짜 형식입니다.</ErrorMessage>
          )}
          {birthDateError === "invalid" && (
            <ErrorMessage color="red">
              올바른 생년월일 형식이 아닙니다. (예: YYYY-MM-DD)
            </ErrorMessage>
          )}
        </InputGroup>
        <Button type="submit">회원가입</Button>
        <Button type="button" outline onClick={handleLoginClick}>
          로그인으로 돌아가기
        </Button>
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

export default Signup;
