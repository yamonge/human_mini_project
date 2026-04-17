import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

/* ================== 전체 컨테이너 ================== */
const Container = styled.div`
  background-color: #0b0b0f;
  min-height: 100vh;
  color: #fff;
  padding: 40px 80px;
  font-family: "Pretendard", sans-serif;
`;

/* ================== 타이틀 ================== */
const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 8px;
`;

const SubTitle = styled.p`
  color: #aaa;
  margin-bottom: 30px;
`;

/* ================== 프로필 카드 ================== */
const ProfileCard = styled.div`
  background-color: #12121a;
  border-radius: 16px;
  padding: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #c9a84c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #000;
  margin-right: 20px;
`;

const ProfileInfo = styled.div``;

const Name = styled.h2`
  font-size: 20px;
  margin-bottom: 6px;
`;

const Description = styled.p`
  color: #aaa;
`;

/* ================== 섹션 ================== */
const SectionTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 18px;
`;

const CardBox = styled.div`
  background-color: #12121a;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 30px;
`;

/* ================== 리스트 아이템 ================== */
const ListItem = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid #1f1f2a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #1a1a24;
  }
`;

const ListText = styled.span`
  color: #ddd;
`;

/* ================== 활동 카드 ================== */
const ActivityWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const ActivityCard = styled.div`
  flex: 1;
  background-color: #12121a;
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;

  &:hover {
    background-color: #1a1a24;
  }
`;

const ActivityTitle = styled.p`
  color: #aaa;
  margin-bottom: 10px;
`;

const ActivityCount = styled.h2`
  color: #c9a84c;
`;

/* ================== 컴포넌트 ================== */
const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Container>
      <Title>마이페이지</Title>
      <SubTitle>내 활동과 정보를 관리할 수 있습니다</SubTitle>

      {/* 프로필 */}
      <ProfileCard>
        <ProfileImage></ProfileImage>
        <ProfileInfo>
          <Name>{user.name || "김민지"}</Name>
          <Description>{user.bio || "소개를 입력해주세요"}</Description>
        </ProfileInfo>
      </ProfileCard>

      {/* 내 정보 수정 */}
      <SectionTitle>내 정보 수정</SectionTitle>
      <CardBox>
        <ListItem onClick={() => navigate("/mypage/edit-introduce")}>
          <ListText>한 줄 소개 변경</ListText>
          <span>{">"}</span>
        </ListItem>
        <ListItem onClick={() => navigate("/change-password")}>
          <ListText>비밀번호 변경</ListText>
          <span>{">"}</span>
        </ListItem>
      </CardBox>

      {/* 내 활동 */}
      <SectionTitle>내 활동</SectionTitle>
      <ActivityWrapper>
        <ActivityCard>
          <ActivityTitle>내가 작성한 게시글</ActivityTitle>
          <ActivityCount>12개</ActivityCount>
        </ActivityCard>

        <ActivityCard>
          <ActivityTitle>내가 작성한 댓글</ActivityTitle>
          <ActivityCount>47개</ActivityCount>
        </ActivityCard>
      </ActivityWrapper>
    </Container>
  );
};

export default MyPage;
