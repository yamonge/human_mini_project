import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/* ================== 스타일 ================== */
const Container = styled.div`
  background-color: #0b0b0f;
  min-height: 100vh;
  color: white;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  margin-bottom: 25px;
  position: relative;
`;

const Label = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
  color: #aaa;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  padding-right: 40px;
  border-radius: 10px;
  border: 1px solid #333;
  background-color: #12121a;
  color: white;
  outline: none;

  &:focus {
    border-color: #c9a84c;
  }
`;

const ErrorText = styled.p`
  position: absolute;
  right: 5px;
  bottom: -32px;
  font-size: 12px;
  color: #ff4d4f;
`;

const SuccessText = styled.p`
  position: absolute;
  right: 5px;
  bottom: -32px;
  font-size: 12px;
  color: #4caf50;
`;

const EyeIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 48px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
`;

const ButtonGroup = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: bold;

  background-color: ${(props) => (props.cancel ? "#333" : "#c9a84c")};
  color: ${(props) => (props.cancel ? "#aaa" : "#000")};
`;

/* ================== 컴포넌트 ================== */
const ChangePassword = () => {
  const navigate = useNavigate();

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [currentError, setCurrentError] = useState("");
  const [newError, setNewError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* ================== 정규식 ================== */
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  /* ================== 검증 함수 ================== */
  const validatePassword = (pw) => {
    if (!pw) return "";
    return passwordRegex.test(pw) ? "valid" : "invalid";
  };

  const validateConfirmPassword = (pw, confirmPw) => {
    if (!confirmPw) return "";
    return pw === confirmPw ? "valid" : "invalid";
  };

  /* ================== 핸들러 ================== */
  const handleNewPwChange = (e) => {
    const value = e.target.value;
    setNewPw(value);
    setNewError(validatePassword(value));
    setConfirmError(validateConfirmPassword(value, confirmPw));
  };

  const handleConfirmPwChange = (e) => {
    const value = e.target.value;
    setConfirmPw(value);
    setConfirmError(validateConfirmPassword(newPw, value));
  };

  const handleSave = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    // 1. 입력 체크
    if (!currentPw || !newPw || !confirmPw) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    // 2. 현재 비밀번호 확인
    if (user.password !== currentPw) {
      setCurrentError("invalid");
      return;
    }

    // 3. 새 비밀번호 유효성
    if (validatePassword(newPw) !== "valid") {
      setNewError("invalid");
      return;
    }

    // 4. 비밀번호 일치 확인
    if (newPw !== confirmPw) {
      setConfirmError("invalid");
      return;
    }

    // ✅ 여기까지 통과하면 성공

    const updatedUser = {
      ...user,
      password: newPw,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    // 🔥 핵심: alert → 이동 순서
    alert("비밀번호가 변경되었습니다.");

    navigate("/mypage");
  };

  console.log(JSON.parse(localStorage.getItem("user")));

  /* ================== UI ================== */
  return (
    <Container>
      <Title>비밀번호 변경</Title>

      {/* 현재 비밀번호 */}
      <InputGroup>
        <Label>현재 비밀번호</Label>
        <Input
          type={showCurrent ? "text" : "password"}
          value={currentPw}
          onChange={(e) => {
            setCurrentPw(e.target.value);
            setCurrentError("");
          }}
        />
        <EyeIcon onClick={() => setShowCurrent(!showCurrent)}>
          {showCurrent ? <FaEyeSlash /> : <FaEye />}
        </EyeIcon>

        {currentError === "invalid" && (
          <ErrorText>현재 비밀번호가 틀렸습니다</ErrorText>
        )}
      </InputGroup>

      {/* 새 비밀번호 */}
      <InputGroup>
        <Label>새 비밀번호</Label>
        <Input
          type={showNew ? "text" : "password"}
          value={newPw}
          onChange={handleNewPwChange}
        />
        <EyeIcon onClick={() => setShowNew(!showNew)}>
          {showNew ? <FaEyeSlash /> : <FaEye />}
        </EyeIcon>

        {newError === "valid" && (
          <SuccessText>사용 가능한 비밀번호입니다</SuccessText>
        )}
        {newError === "invalid" && (
          <ErrorText>8자 이상, 문자/숫자/특수문자 포함</ErrorText>
        )}
      </InputGroup>

      {/* 새 비밀번호 확인 */}
      <InputGroup>
        <Label>새 비밀번호 확인</Label>
        <Input
          type={showConfirm ? "text" : "password"}
          value={confirmPw}
          onChange={handleConfirmPwChange}
        />
        <EyeIcon onClick={() => setShowConfirm(!showConfirm)}>
          {showConfirm ? <FaEyeSlash /> : <FaEye />}
        </EyeIcon>

        {confirmError === "valid" && (
          <SuccessText>비밀번호가 일치합니다</SuccessText>
        )}
        {confirmError === "invalid" && (
          <ErrorText>비밀번호가 일치하지 않습니다</ErrorText>
        )}
      </InputGroup>

      {/* 버튼 */}
      <ButtonGroup>
        <Button cancel onClick={() => navigate("/mypage")}>
          취소
        </Button>
        <Button onClick={handleSave}>저장</Button>
      </ButtonGroup>
    </Container>
  );
};

export default ChangePassword;
