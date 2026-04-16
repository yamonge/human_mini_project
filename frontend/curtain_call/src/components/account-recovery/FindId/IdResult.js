import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  ResultCard,
  CloseButton,
  IconWrapper,
  Title,
  SubText,
  InfoBox,
  InfoRow,
  Label,
  Value,
  Tag,
  ErrorBox,
  Button,
  SubButton,
  FooterLink
} from "./IdResultCss";

const IdResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 성공 여부에 따라 화면 전환 (테스트용 기본값 false)
const isSuccess = location.state?.isSuccess;
  return (
    <Container>
      <ResultCard>
        <CloseButton onClick={() => navigate("/account-recovery")}>&times;</CloseButton>

        {/* success={isSuccess} 값에 따라 색상 자동 변경 */}
        <IconWrapper success={isSuccess} />

        <Title>
          {isSuccess ? "아이디를 찾았습니다" : "일치하는 계정이 없습니다"}
        </Title>
        
        <SubText>
          {isSuccess
            ? "가입된 계정 정보를 확인해주세요"
            : "입력하신 정보와 일치하는 계정을 찾을 수 없어요.\n이름과 생년월일을 다시 확인해주세요."}
        </SubText>

        {isSuccess ? (
          <>
            <InfoBox>
              <InfoRow>
                <div>
                  <Label>이메일 (아이디)</Label>
                  <Value highlight>mu***al@example.com</Value>
                </div>
                <Tag>소셜 가입 제외</Tag>
              </InfoRow>
            </InfoBox>

            <InfoBox>
              <InfoRow>
                <div>
                  <Label>가입일</Label>
                  <Value>2025년 3월 14일</Value>
                </div>
              </InfoRow>
            </InfoBox>

            <Button onClick={() => navigate("/login")}>
              <span>➔</span> 로그인하기
            </Button>
            <SubButton
              onClick={() =>
                navigate("/account-recovery", {
                  state: { tab: "password" },
                })
              }
            >
              비밀번호 찾기
            </SubButton>
          </>
        ) : (
          <>
            <ErrorBox>
              <ul>
                <li>이름은 가입 시 입력한 실명이어야 합니다</li>
                <li>소셜(Google·GitHub) 계정은 해당 서비스로 로그인해주세요</li>
                <li>탈퇴한 계정은 조회되지 않습니다</li>
              </ul>
            </ErrorBox>

            <Button onClick={() => navigate("/account-recovery")}>
              <span>↻</span> 다시 시도하기
            </Button>
            <SubButton onClick={() => navigate("/login")}>
              로그인으로 돌아가기
            </SubButton>
          </>
        )}

        <FooterLink onClick={() => navigate("/account-recovery")}>
          ‹ 계정 찾기로 돌아가기
        </FooterLink>
      </ResultCard>
    </Container>
  );
};

export default IdResult;  