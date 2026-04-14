import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginContainer,
  Header,
  Title,
  Subtitle,
  CloseButton,
  TabContainer,
  TabButton,
  FormDescription,
  FindForm,
  InputGroup,
  Label,
  FindInput,
  Button,
  ErrorMessage,
  ReturnToLoginLink,
} from "./FindAccountCss"; // 경로는 프로젝트 구조에 맞게 조정

const FindAccount = () => {
  const [activeTab, setActiveTab] = useState("id"); // 'id' 또는 'password'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");

  const navigate = useNavigate();

  const validateName = (value) => {
    if (!value) return "";
    return value.length >= 2 ? "valid" : "invalid";
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "";
    return emailRegex.test(value) ? "valid" : "invalid";
  };

  const validateBirthDate = (value) => {
    if (!value) return "";
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    return dateRegex.test(value) ? "valid" : "invalid";
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

  const handleBirthDateChange = (e) => {
    const value = e.target.value;
    setBirthDate(value);
    setBirthDateError(validateBirthDate(value));
  };

  const handleFindIdSubmit = (e) => {
    e.preventDefault();
    const isNameValid = validateName(name) === "valid";
    const isBirthDateValid = validateBirthDate(birthDate) === "valid";

    if (isNameValid && isBirthDateValid) {
      // 실제 아이디 찾기 로직 (API 호출 등)
      console.log("아이디 찾기 시도:", { name, birthDate });
      alert("입력하신 정보로 아이디를 찾고 있습니다.");
      // 성공 시: alert(`찾으시는 아이디는 [user@email.com] 입니다.`);
      // 실패 시: alert("일치하는 정보가 없습니다.");
    } else {
      alert("모든 필드를 올바르게 입력해주세요.");
      setNameError(validateName(name));
      setBirthDateError(validateBirthDate(birthDate));
    }
  };

  const handleFindPasswordSubmit = (e) => {
    e.preventDefault();
    const isNameValid = validateName(name) === "valid";
    const isEmailValid = validateEmail(email) === "valid";
    const isBirthDateValid = validateBirthDate(birthDate) === "valid";

    if (isNameValid && isEmailValid && isBirthDateValid) {
      // 실제 비밀번호 찾기 로직 (API 호출 등)
      console.log("비밀번호 찾기 시도:", { name, email, birthDate });
      alert("입력하신 정보로 비밀번호 재설정 링크를 보내드립니다.");
      // 성공 시: alert("가입된 이메일로 비밀번호 재설정 링크를 발송했습니다.");
      // 실패 시: alert("일치하는 정보가 없거나 이메일 발송에 실패했습니다.");
    } else {
      alert("모든 필드를 올바르게 입력해주세요.");
      setNameError(validateName(name));
      setEmailError(validateEmail(email));
      setBirthDateError(validateBirthDate(birthDate));
    }
  };

  const handleClose = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  const handleReturnToLogin = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <LoginContainer>
      <Header>
        <Title>계정 찾기</Title>
        <Subtitle>가입 시 등록한 정보로 계정을 찾을 수 있어요</Subtitle>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
      </Header>

      <TabContainer>
        <TabButton
          active={activeTab === "id"}
          onClick={() => setActiveTab("id")}
        >
          아이디 찾기
        </TabButton>
        <TabButton
          active={activeTab === "password"}
          onClick={() => setActiveTab("password")}
        >
          비밀번호 찾기
        </TabButton>
      </TabContainer>

      {activeTab === "id" ? (
        <>
          <FormDescription>
            가입 시 등록한 이름과 생년월일을 입력해주세요.
          </FormDescription>
          <FindForm onSubmit={handleFindIdSubmit}>
            <InputGroup>
              <Label htmlFor="findIdName">이름</Label>
              <FindInput
                type="text"
                id="findIdName"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={handleNameChange}
                validationStatus={nameError}
              />
              {nameError === "invalid" && (
                <ErrorMessage color="red">
                  이름은 2자 이상이어야 합니다.
                </ErrorMessage>
              )}
            </InputGroup>
            <InputGroup>
              <Label htmlFor="findIdBirthDate">생년월일</Label>
              <FindInput
                type="date"
                id="findIdBirthDate"
                value={birthDate}
                onChange={handleBirthDateChange}
                validationStatus={birthDateError}
              />
              {birthDateError === "invalid" && (
                <ErrorMessage color="red">
                  올바른 생년월일 형식이 아닙니다. (예: YYYY-MM-DD)
                </ErrorMessage>
              )}
            </InputGroup>
            <Button type="submit">아이디 찾기</Button>
          </FindForm>
        </>
      ) : (
        <>
          <FormDescription>
            가입 시 등록한 이름, 이메일, 생년월일을 입력해주세요.
          </FormDescription>
          <FindForm onSubmit={handleFindPasswordSubmit}>
            <InputGroup>
              <Label htmlFor="findPwName">이름</Label>
              <FindInput
                type="text"
                id="findPwName"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={handleNameChange}
                validationStatus={nameError}
              />
              {nameError === "invalid" && (
                <ErrorMessage color="red">
                  이름은 2자 이상이어야 합니다.
                </ErrorMessage>
              )}
            </InputGroup>
            <InputGroup>
              <Label htmlFor="findPwEmail">이메일</Label>
              <FindInput
                type="email"
                id="findPwEmail"
                placeholder="example@email.com"
                value={email}
                onChange={handleEmailChange}
                validationStatus={emailError}
              />
              {emailError === "invalid" && (
                <ErrorMessage color="red">
                  올바른 이메일 형식이 아닙니다.
                </ErrorMessage>
              )}
            </InputGroup>
            <InputGroup>
              <Label htmlFor="findPwBirthDate">생년월일</Label>
              <FindInput
                type="date"
                id="findPwBirthDate"
                value={birthDate}
                onChange={handleBirthDateChange}
                validationStatus={birthDateError}
              />
              {birthDateError === "invalid" && (
                <ErrorMessage color="red">
                  올바른 생년월일 형식이 아닙니다. (예: YYYY-MM-DD)
                </ErrorMessage>
              )}
            </InputGroup>
            <Button type="submit">비밀번호 찾기</Button>
          </FindForm>
        </>
      )}
      <ReturnToLoginLink onClick={handleReturnToLogin}>
        &#8249; 로그인으로 돌아가기
      </ReturnToLoginLink>
    </LoginContainer>
  );
};

export default FindAccount;
