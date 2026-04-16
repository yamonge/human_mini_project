import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  ResultCard,
  CloseButton,
  IconCircle,
  Title,
  SubText,
  MessageBox,
  MessageList,
  MessageItem,
  InfoIcon,
  MainButton,
  SubButton,
  FooterLink,
} from "./PasswordResultCss";

const IdResult = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSuccess = location.state?.isSuccess;

  return (
    <Container>
      <ResultCard>
        <CloseButton onClick={() => navigate("/account-recovery")}>
          &times;
        </CloseButton>

        {/* 상단 아이콘: 성공시 편지봉투 모양, 실패시 X 모양 */}
        <IconCircle fail={!isSuccess}>{isSuccess ? "✉" : "✕"}</IconCircle>

        <Title>
          {isSuccess ? "이메일을 확인해주세요" : "등록되지 않은 이메일입니다"}
        </Title>

        <SubText>
          {isSuccess ? (
            <>
              이메일로
              <br />
              비밀번호 재설정 링크를 보냈습니다.
            </>
          ) : (
            "입력하신 이메일로 가입된 계정을 찾을 수 없어요.\n이메일 주소를 다시 확인해주세요."
          )}
        </SubText>

        {isSuccess ? (
          <>
            <MessageBox>
              <InfoIcon>!</InfoIcon>
              <MessageList>
                <MessageItem>링크는 30분간 유효합니다</MessageItem>
                <MessageItem>
                  이메일이 도착하지 않았다면 스팸함을 확인하거나 잠시 후 다시
                  시도해주세요.
                </MessageItem>
              </MessageList>
            </MessageBox>

            <MainButton onClick={() => navigate("/login")}>
              <span>➔</span> 로그인 페이지로
            </MainButton>
            <SubButton
              onClick={() =>
                navigate("/account-recovery", {
                  state: { tab: "password" },
                })
              }
            >
              다시 시도하기
            </SubButton>
          </>
        ) : (
          <>
            <MessageBox fail>
              <MessageList>
                <MessageItem fail>
                  이메일 주소에 오타가 없는지 확인해주세요
                </MessageItem>
                <MessageItem fail>
                  Google·GitHub로 가입했다면 소셜 로그인을 이용해주세요
                </MessageItem>
                <MessageItem fail>
                  아직 계정이 없다면 회원가입 후 이용해주세요
                </MessageItem>
              </MessageList>
            </MessageBox>
            <MainButton
              onClick={() =>
                navigate("/account-recovery", {
                  state: { tab: "password" },
                })
              }
            >
              <span>↻</span> 다시 시도하기
            </MainButton>
            <SubButton onClick={() => navigate("/signup")}>
              회원가입하기
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
