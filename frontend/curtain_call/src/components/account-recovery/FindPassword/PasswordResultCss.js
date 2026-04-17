// PasswordResultCss.js
import styled from "styled-components";

// 전체 페이지 배경
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #000; /* 전체 배경색 */
`;

// 중앙 카드 박스
export const ResultCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: #111319;
  border-radius: 24px;
  padding: 48px 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
`;

// 닫기 버튼 스타일
export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #f0f0f0;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

// 상단 원형 아이콘 영역
export const IconCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.fail ? "rgba(255, 77, 79, 0.1)" : "rgba(201, 168, 76, 0.1)"};
  border: 1px solid
    ${(props) => (props.fail ? "rgba(255, 77, 79, 0.2)" : "transparent")};
  color: ${(props) => (props.fail ? "#ff4d4f" : "#c9a84c")};
  font-size: 30px;
`;

// 제목 스타일
export const Title = styled.h2`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  text-align: center;
`;

// 서브 텍스트 스타일
export const SubText = styled.p`
  color: #8a8d94;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 32px;
  white-space: pre-line;

  strong {
    color: #ffffff;
    border-bottom: 1px solid #ffffff;
    font-weight: normal;
  }
`;

// 안내 메시지 박스 (중앙 회색/붉은색 박스)
export const MessageBox = styled.div`
  width: 100%;
  background: ${(props) =>
    props.fail ? "rgba(255, 77, 79, 0.03)" : "rgba(255, 255, 255, 0.03)"};
  border: 1px solid
    ${(props) =>
      props.fail ? "rgba(255, 77, 79, 0.1)" : "rgba(255, 255, 255, 0.05)"};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 32px;
  box-sizing: border-box;
  display: flex;
  gap: 12px;
`;

// 메시지 목록 스타일
export const MessageList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
`;

// 메시지 항목 스타일
export const MessageItem = styled.li`
  color: #8a8d94;
  font-size: 13.5px;
  line-height: 1.6;
  margin-bottom: 8px;
  padding-left: 16px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: "•";
    color: ${(props) => (props.fail ? "#ff4d4f" : "#555")};
    position: absolute;
    left: 0;
  }
`;

// 성공 시 나타나는 느낌표 아이콘
export const InfoIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #333;
  color: #111;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-top: 2px;
`;

// 메인 버튼 스타일 (예: 로그인 페이지로, 다시 시도하기)
export const MainButton = styled.button`
  // MainButton으로 컬럼명 수정
  width: 100%;
  height: 56px;
  background: #c9a84c;
  color: #000;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;

  &:hover {
    opacity: 0.9;
  }
`;

// 서브 버튼 스타일 (예: 다시 시도하기, 회원가입하기)
export const SubButton = styled.button`
  width: 100%;
  height: 56px;
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 32px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

// 푸터 링크 스타일 (예: 계정 찾기로 돌아가기)
export const FooterLink = styled.div`
  color: #5a5d63;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    color: #888;
  }
`;
