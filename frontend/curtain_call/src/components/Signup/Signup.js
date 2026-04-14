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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validateName = (name) => {
    if (!name) return "";
    return name.length >= 2 ? "valid" : "invalid"; // 예시: 2자 이상
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "";
    return emailRegex.test(email) ? "valid" : "invalid";
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password) return "";
    return passwordRegex.test(password) ? "valid" : "invalid";
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return "";
    return password === confirmPassword ? "valid" : "invalid";
  };

  const validateBirthDate = (date) => {
    if (!date) return "";
    // 간단한 날짜 형식 (YYYY-MM-DD) 검증
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date) ? "valid" : "invalid";
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(validateName(value));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
    setConfirmPasswordError(validateConfirmPassword(value, confirmPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(password, value));
  };

  const handleBirthDateChange = (e) => {
    const value = e.target.value;
    setBirthDate(value);
    setBirthDateError(validateBirthDate(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 최종 유효성 검사 (모든 필드가 유효해야 제출)
    const isNameValid = validateName(name) === "valid";
    const isEmailValid = validateEmail(email) === "valid";
    const isPasswordValid = validatePassword(password) === "valid";
    const isConfirmPasswordValid =
      validateConfirmPassword(password, confirmPassword) === "valid";
    const isBirthDateValid = validateBirthDate(birthDate) === "valid";

    if (
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isBirthDateValid
    ) {
      const registerData = {
        name,
        email,
        password,
        birth_date: birthDate,
        is_admin: 0, // 기본값 0
      };
      console.log("회원가입 데이터:", registerData);
      // 여기에 API 호출 로직 추가
      alert("회원가입이 완료되었습니다!");
      navigate("/login"); // 회원가입 성공 후 로그인 페이지로 이동
    } else {
      alert("모든 필드를 올바르게 입력해주세요.");
      // 입력 에러 메시지 강제 표시
      setNameError(validateName(name));
      setEmailError(validateEmail(email));
      setPasswordError(validatePassword(password));
      setConfirmPasswordError(
        validateConfirmPassword(password, confirmPassword),
      );
      setBirthDateError(validateBirthDate(birthDate));
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  const handleClose = () => {
    navigate("/"); // 메인으로 이동
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
            onChange={handleBirthDateChange}
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
