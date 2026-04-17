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
  FooterLink,
} from "./IdResultCss";

/** API·router state로 넘어온 가입일(ISO 문자열, 타임스탬프, 배열 등)을 화면용 문자열로 */
function formatJoinDateKorean(value) {
  if (value == null || value === "") return "-";

  let date;
  if (value instanceof Date) {
    date = value;
  } else if (Array.isArray(value) && value.length >= 3) {
    const [y, month, day, h = 0, min = 0, sec = 0] = value;
    date = new Date(y, month - 1, day, h, min, sec);
  } else if (typeof value === "object" && typeof value.format === "function") {
    return value.format("YYYY년 MM월 DD일");
  } else {
    date = new Date(value);
  }

  if (Number.isNaN(date.getTime())) return "-";
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

const IdResult = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 성공 여부에 따라 화면 전환 (테스트용 기본값 false)
  // isSuccess는 location.state에서 가져오며, 없을 경우 undefined (false로 간주)
  const isSuccess = location.state?.isSuccess;
  const email = location.state?.email;
  const createdAt = location.state?.createdAt;

  // 이메일 마스킹 처리
  const maskedEmail =
    typeof email === "string" ? email.replace(/@.*$/, "***") : "";

  const formattedCreatedAt = formatJoinDateKorean(createdAt);

  return (
    // 전체 페이지를 중앙에 정렬하기 위한 컨테이너
    <Container>
      {/* 결과 정보를 표시하는 카드 형태의 박스 */}
      <ResultCard>
        {/* 닫기 버튼: 클릭 시 계정 복구 페이지로 이동 */}
        <CloseButton onClick={() => navigate("/account-recovery")}>
          &times;
        </CloseButton>

        {/* 성공 여부에 따라 아이콘(체크/엑스) 및 색상이 자동으로 변경되는 Wrapper */}
        <IconWrapper success={isSuccess} />

        {/* 제목: 성공 여부에 따라 "아이디를 찾았습니다" 또는 "일치하는 계정이 없습니다" 표시 */}
        <Title>
          {isSuccess ? "아이디를 찾았습니다" : "일치하는 계정이 없습니다"}
        </Title>

        {/* 서브 텍스트: 성공 여부에 따라 다른 안내 메시지 표시 */}
        <SubText>
          {isSuccess
            ? "가입된 계정 정보를 확인해주세요"
            : "입력하신 정보와 일치하는 계정을 찾을 수 없어요.\n이름과 생년월일을 다시 확인해주세요."}
        </SubText>

        {/* isSuccess 값에 따라 다른 UI 렌더링 */}
        {isSuccess ? (
          <>
            {/* 이메일(아이디) 정보 박스 */}
            <InfoBox>
              <InfoRow>
                <div>
                  {/* 이메일(아이디) 라벨 */}
                  <Label>이메일 (아이디)</Label>
                  {/* 이메일 값: 강조 스타일 적용 */}
                  <Value highlight>{maskedEmail}</Value>
                </div>
                {/* 소셜 가입 제외 태그 */}
                <Tag>소셜 가입 제외</Tag>
              </InfoRow>
            </InfoBox>

            {/* 가입일 정보 박스 */}
            <InfoBox>
              <InfoRow>
                <div>
                  {/* 가입일 라벨 */}
                  <Label>가입일</Label>
                  {/* 가입일 값 */}
                  <Value>{formattedCreatedAt}</Value>
                </div>
              </InfoRow>
            </InfoBox>

            {/* 로그인하기 버튼: 클릭 시 로그인 페이지로 이동 */}
            <Button onClick={() => navigate("/login")}>
              <span>➔</span> 로그인하기
            </Button>
            {/* 비밀번호 찾기 버튼: 클릭 시 계정 복구 페이지의 비밀번호 탭으로 이동 */}
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
            {/* 에러 정보 박스: 계정 불일치 시 안내사항 표시 */}
            <ErrorBox>
              <ul>
                <li>이름은 가입 시 입력한 실명이어야 합니다</li>
                <li>소셜(Google·GitHub) 계정은 해당 서비스로 로그인해주세요</li>
                <li>탈퇴한 계정은 조회되지 않습니다</li>
              </ul>
            </ErrorBox>

            {/* 다시 시도하기 버튼: 클릭 시 계정 복구 페이지로 이동 */}
            <Button onClick={() => navigate("/account-recovery")}>
              <span>↻</span> 다시 시도하기
            </Button>
            {/* 로그인으로 돌아가기 버튼: 클릭 시 로그인 페이지로 이동 */}
            <SubButton onClick={() => navigate("/login")}>
              로그인으로 돌아가기
            </SubButton>
          </>
        )}

        {/* 하단 링크: 계정 찾기 페이지로 돌아가기 */}
        <FooterLink onClick={() => navigate("/account-recovery")}>
          ‹ 계정 찾기로 돌아가기
        </FooterLink>
      </ResultCard>
    </Container>
  );
};

export default IdResult;
