import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [activeTab, setActiveTab] = useState("id");

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

  // ✅ 아이디 찾기
  const handleFindId = (e) => {
    e.preventDefault();

    if (validateName(idName) && validateBirth(idBirth)) {
      const success = Math.random() > 0.5;

      navigate("/id-result", {
        state: { isSuccess: success },
      });
    } else {
      alert("정보를 올바르게 입력해주세요.");
    }
  };

  // ✅ 비밀번호 찾기
  const handleFindPw = (e) => {
    e.preventDefault();

    if (validateName(pwName) && validateEmail(pwEmail)) {
      const success = Math.random() > 0.5;

      navigate("/password-result", {
        state: { isSuccess: success },
      });
    } else {
      alert("정보를 올바르게 입력해주세요.");
    }
  };

  return (
    <LoginContainer>
      <Header>
        <Title>{activeTab === "id" ? "아이디 찾기" : "비밀번호 찾기"}</Title>
        <CloseButton onClick={() => navigate("/")}>×</CloseButton>
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

      {/* 아이디 찾기 */}
      {activeTab === "id" && (
        <FindForm onSubmit={handleFindId}>
          <FormDescription>이름 + 생년월일 입력</FormDescription>

          <InputGroup>
            <Label>이름</Label>
            <FindInput
              value={idName}
              onChange={(e) => setIdName(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <Label>생년월일</Label>
            <FindInput
              type="date"
              value={idBirth}
              onChange={(e) => setIdBirth(e.target.value)}
            />
          </InputGroup>

          <Button type="submit">아이디 찾기</Button>
        </FindForm>
      )}

      {/* 비밀번호 찾기 */}
      {activeTab === "password" && (
        <FindForm onSubmit={handleFindPw}>
          <FormDescription>이름 + 이메일 입력</FormDescription>

          <InputGroup>
            <Label>이름</Label>
            <FindInput
              value={pwName}
              onChange={(e) => setPwName(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <Label>이메일</Label>
            <FindInput
              value={pwEmail}
              onChange={(e) => setPwEmail(e.target.value)}
            />
          </InputGroup>

          <Button type="submit">인증코드 보내기</Button>
        </FindForm>
      )}
    </LoginContainer>
  );
};

export default FindAccount;
