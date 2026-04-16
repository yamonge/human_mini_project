// PasswordResult.js
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
  MainButton, // MainButton으로 컬럼명 수정
  SubButton,
  FooterLink,
} from "./PasswordResultCss";

const PasswordResult = () => {
  // IdResult 대신 PasswordResult로 컴포넌트명 수정
  const navigate = useNavigate();
  const location = useLocation();

  // 성공 여부에 따라 화면 전환 (테스트용 기본값 false)
  const isSuccess = location.state?.isSuccess;

  return (
    // 전체 페이지를 중앙에 정렬하기 위한 컨테이너
    <Container>
      {/* 결과 정보를 표시하는 카드 형태의 박스 */}
      <ResultCard>
        {/* 닫기 버튼: 클릭 시 계정 복구 페이지로 이동 */}
        <CloseButton onClick={() => navigate("/account-recovery")}>
          &times;
        </CloseButton>

        {/* 상단 아이콘: 성공시 편지봉투 모양, 실패시 X 모양 */}
        <IconCircle fail={!isSuccess}>{isSuccess ? "✉" : "✕"}</IconCircle>

        {/* 제목: 성공 여부에 따라 "이메일을 확인해주세요" 또는 "등록되지 않은 이메일입니다" 표시 */}
        <Title>
          {isSuccess ? "이메일을 확인해주세요" : "등록되지 않은 이메일입니다"}
        </Title>

        {/* 서브 텍스트: 성공 여부에 따라 다른 안내 메시지 표시 */}
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

        {/* isSuccess 값에 따라 다른 UI 렌더링 */}
        {isSuccess ? (
          <>
            {/* 성공 시 안내 메시지 박스 */}
            <MessageBox>
              {/* 정보 아이콘 */}
              <InfoIcon>!</InfoIcon>
              {/* 메시지 목록 */}
              <MessageList>
                {/* 메시지 항목: 링크 유효 시간 안내 */}
                <MessageItem>링크는 30분간 유효합니다</MessageItem>
                {/* 메시지 항목: 이메일 도착 지연 시 안내 */}
                <MessageItem>
                  이메일이 도착하지 않았다면 스팸함을 확인하거나 잠시 후 다시
                  시도해주세요.
                </MessageItem>
              </MessageList>
            </MessageBox>

            {/* 메인 버튼: 클릭 시 로그인 페이지로 이동 */}
            <MainButton onClick={() => navigate("/login")}>
              <span>➔</span> 로그인 페이지로
            </MainButton>
            {/* 서브 버튼: 클릭 시 계정 복구 페이지의 비밀번호 탭으로 이동 (다시 시도) */}
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
            {/* 실패 시 안내 메시지 박스 */}
            <MessageBox fail>
              {/* 메시지 목록 */}
              <MessageList>
                {/* 메시지 항목: 이메일 오타 확인 안내 */}
                <MessageItem fail>
                  이메일 주소에 오타가 없는지 확인해주세요
                </MessageItem>
                {/* 메시지 항목: 소셜 로그인 안내 */}
                <MessageItem fail>
                  Google·GitHub로 가입했다면 소셜 로그인을 이용해주세요
                </MessageItem>
                {/* 메시지 항목: 회원가입 안내 */}
                <MessageItem fail>
                  아직 계정이 없다면 회원가입 후 이용해주세요
                </MessageItem>
              </MessageList>
            </MessageBox>
            {/* 메인 버튼: 클릭 시 계정 복구 페이지의 비밀번호 탭으로 이동 (다시 시도) */}
            <MainButton
              onClick={() =>
                navigate("/account-recovery", {
                  state: { tab: "password" },
                })
              }
            >
              <span>↻</span> 다시 시도하기
            </MainButton>
            {/* 서브 버튼: 클릭 시 회원가입 페이지로 이동 */}
            <SubButton onClick={() => navigate("/signup")}>
              회원가입하기
            </SubButton>
          </>
        )}

        {/* 푸터 링크: 계정 찾기 페이지로 돌아가기 */}
        <FooterLink onClick={() => navigate("/account-recovery")}>
          ‹ 계정 찾기로 돌아가기
        </FooterLink>
      </ResultCard>
    </Container>
  );
};

export default PasswordResult; // IdResult 대신 PasswordResult로 컴포넌트명 수정
