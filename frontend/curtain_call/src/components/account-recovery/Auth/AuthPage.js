import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LoginContainer,
  Header,
  Title,
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
} from "./AuthPageCss";

const FindAccount = () => {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.state?.tab || "id");

  // 아이디
  const [idName, setIdName] = useState("");
  const [idBirth, setIdBirth] = useState("");

  // 비밀번호
  const [pwName, setPwName] = useState("");
  const [pwEmail, setPwEmail] = useState("");

  const navigate = useNavigate();

  // validation
  const validateName = (v) => v.length >= 2;
  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validateBirth = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v);

  // ✅ 탭 변경 (초기화 포함)
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // 전부 초기화
    setIdName("");
    setIdBirth("");
    setPwName("");
    setPwEmail("");
  };

  // ✅ 아이디 찾기
  const handleFindId = (e) => {
    e.preventDefault();

    // 1. 빈값 체크
    if (!idName || !idBirth) {
      alert("모든 항목을 입력해주세요");
      return;
    }
    // 2. 형식 체크
    if (!validateName(idName) || !validateBirth(idBirth)) {
      alert("입력 형식을 확인해주세요");
      return;
    }

    // 3. 정상
    const success = Math.random() > 0.5;

    navigate("/id-result", {
      state: { isSuccess: success },
    });
  };

  // ✅ 비밀번호 찾기
  const handleFindPw = (e) => {
    e.preventDefault();

    if (validateName(pwName) && validateEmail(pwEmail)) {
      const success = Math.random() > 0.5; // 50%

      navigate("/password-result", {
        state: { isSuccess: success },
      });
    }
  };

  return (
    <LoginContainer>
      <Header>
        <Title>{activeTab === "id" ? "아이디 찾기" : "비밀번호 찾기"}</Title>
        <CloseButton onClick={() => navigate("/login")}>&times;</CloseButton>
      </Header>

      <TabContainer>
        <TabButton
          active={activeTab === "id"}
          onClick={() => handleTabChange("id")}
        >
          아이디 찾기
        </TabButton>
        <TabButton
          active={activeTab === "password"}
          onClick={() => handleTabChange("password")}
        >
          비밀번호 찾기
        </TabButton>
      </TabContainer>

      {/* 아이디 찾기 */}
      {activeTab === "id" && (
        <FindForm onSubmit={handleFindId}>
          <FormDescription>이름과 생년월일을 입력해주세요</FormDescription>

          <InputGroup>
            <Label>이름</Label>
            <FindInput
              value={idName}
              onChange={(e) => setIdName(e.target.value)}
              validationStatus={
                idName === ""
                  ? null
                  : validateName(idName)
                    ? "valid"
                    : "invalid"
              }
              placeholder="이름을 입력해주세요"
            />
            <ErrorMessage
              color={
                idName === ""
                  ? "transparent"
                  : validateName(idName)
                    ? "green"
                    : "red"
              }
            >
              {idName === ""
                ? ""
                : validateName(idName)
                  ? "올바른 이름입니다"
                  : "이름은 2자 이상 입력해주세요"}
            </ErrorMessage>
          </InputGroup>

          <InputGroup>
            <Label>생년월일</Label>
            <FindInput
              type="date"
              value={idBirth}
              onChange={(e) => setIdBirth(e.target.value)}
              validationStatus={
                idBirth === ""
                  ? null
                  : validateBirth(idBirth)
                    ? "valid"
                    : "invalid"
              }
            />
            <ErrorMessage
              color={
                idBirth === ""
                  ? "transparent"
                  : validateBirth(idBirth)
                    ? "green"
                    : "red"
              }
            >
              {idBirth === ""
                ? ""
                : validateBirth(idBirth)
                  ? "올바른 형식입니다"
                  : "YYYY-MM-DD 형식으로 입력해주세요"}
            </ErrorMessage>
          </InputGroup>

          <Button type="submit">아이디 찾기</Button>
        </FindForm>
      )}

      {/* 비밀번호 찾기 */}
      {activeTab === "password" && (
        <FindForm onSubmit={handleFindPw}>
          <FormDescription>이름과 이메일을 입력해주세요</FormDescription>

          <InputGroup>
            <Label>이름</Label>
            <FindInput
              value={pwName}
              onChange={(e) => setPwName(e.target.value)}
              validationStatus={
                pwName === ""
                  ? null
                  : validateName(pwName)
                    ? "valid"
                    : "invalid"
              }
              placeholder="이름을 입력해주세요"
            />
            <ErrorMessage
              color={
                pwName === ""
                  ? "transparent"
                  : validateName(pwName)
                    ? "green"
                    : "red"
              }
            >
              {pwName === ""
                ? ""
                : validateName(pwName)
                  ? "올바른 이름입니다"
                  : "이름은 2자 이상 입력해주세요"}
            </ErrorMessage>
          </InputGroup>

          <InputGroup>
            <Label>이메일</Label>
            <FindInput
              value={pwEmail}
              onChange={(e) => setPwEmail(e.target.value)}
              validationStatus={
                pwEmail === ""
                  ? null
                  : validateEmail(pwEmail)
                    ? "valid"
                    : "invalid"
              }
              placeholder="이메일을 입력해주세요"
            />
            <ErrorMessage
              color={
                pwEmail === ""
                  ? "transparent"
                  : validateEmail(pwEmail)
                    ? "green"
                    : "red"
              }
            >
              {pwEmail === ""
                ? ""
                : validateEmail(pwEmail)
                  ? "올바른 이메일입니다"
                  : "이메일 형식이 아닙니다"}
            </ErrorMessage>
          </InputGroup>

          <Button type="submit">인증코드 보내기</Button>
        </FindForm>
      )}
    </LoginContainer>
  );
};

export default FindAccount;
