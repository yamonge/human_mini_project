import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/* ================== 컨테이너 ================== */
const Container = styled.div`
  background-color: #0b0b0f;
  min-height: 100vh;
  color: white;
  padding: 40px;
`;

/* ================== 타이틀 ================== */
const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

/* ================== 입력 영역 ================== */
const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  border-radius: 12px;
  border: 1px solid #333;
  background-color: #12121a;
  color: white;
  padding: 15px;
  resize: none;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #c9a84c;
  }
`;

const ErrorText = styled.p`
  color: #ff4d4f;
  margin-top: 8px;
  font-size: 13px;
`;

/* ================== 버튼 ================== */
const ButtonGroup = styled.div`
  margin-top: 20px;
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
const EditIntroduce = () => {
  const navigate = useNavigate();
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  // 기존 데이터 불러오기
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser?.bio) {
      setBio(storedUser.bio);
    }
  }, []);

  // 저장
  const handleSave = () => {
    if (!bio.trim()) {
      setError("한 줄 소개를 입력해주세요.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    const updatedUser = {
      ...storedUser,
      bio,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("수정되었습니다.");
    navigate("/mypage");
  };

  // 취소
  const handleCancel = () => {
    navigate("/mypage");
  };

  return (
    <Container>
      <Title>한 줄 소개 변경</Title>

      <TextArea
        value={bio}
        onChange={(e) => {
          setBio(e.target.value);
          setError("");
        }}
        placeholder="한 줄 소개를 입력하세요"
      />

      {error && <ErrorText>{error}</ErrorText>}

      <ButtonGroup>
        <Button cancel onClick={handleCancel}>
          취소
        </Button>
        <Button onClick={handleSave}>저장</Button>
      </ButtonGroup>
    </Container>
  );
};

export default EditIntroduce;
