// IdResultCss.js
import styled from "styled-components";

// 배경 (모달이 아닌 전체 페이지 중앙 정렬용)
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #000; /* 전체 배경색 */
`;

// 이미지의 모달처럼 생긴 카드 박스
export const ResultCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: #111319;
  border-radius: 24px;
  padding: 20px 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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

// 아이콘(체크/엑스) Wrapper 스타일
export const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${(props) =>
    props.success ? "rgba(201, 168, 76, 0.1)" : "rgba(255, 77, 79, 0.1)"};
  border: 1px solid ${(props) => (props.success ? "#c9a84c" : "#ff4d4f")};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;

  /* 내부 아이콘 (체크/엑스) */
  &::after {
    content: "${(props) => (props.success ? "✓" : "✕")}";
    color: ${(props) => (props.success ? "#c9a84c" : "#ff4d4f")};
    font-size: 32px;
    font-weight: bold;
  }
`;

// 제목 스타일
export const Title = styled.h2`
  color: white;
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
`;

// 정보 박스 스타일 (이메일, 가입일 등)
export const InfoBox = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 18px 24px;
  margin-bottom: 12px;
  box-sizing: border-box;
`;

// 정보 행 스타일 (라벨과 값, 태그를 포함)
export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

// 라벨 스타일 (예: 이메일 (아이디), 가입일)
export const Label = styled.div`
  color: #5a5d63;
  font-size: 13px;
  margin-bottom: 6px;
`;

// 값 스타일 (예: mu***al@example.com, 2025년 3월 14일)
export const Value = styled.div`
  color: ${(props) => (props.highlight ? "#c9a84c" : "#ffffff")};
  font-size: 16px;
  font-weight: 500;
`;

// 태그 스타일 (예: 소셜 가입 제외)
export const Tag = styled.span`
  color: #4a4d53;
  font-size: 12px;
`;

// 에러 메시지 박스 스타일
export const ErrorBox = styled.div`
  width: 100%;
  background: rgba(255, 77, 79, 0.03);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  box-sizing: border-box;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    color: #8a8d94;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
    padding-left: 18px;
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }

    &::before {
      content: "•";
      color: #ff4d4f;
      position: absolute;
      left: 0;
    }
  }
`;

// 메인 버튼 스타일 (예: 로그인하기, 다시 시도하기)
export const Button = styled.button`
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
  gap: 8px;
  margin-bottom: 12px;

  &:hover {
    opacity: 0.9;
  }
`;

// 서브 버튼 스타일 (예: 비밀번호 찾기, 로그인으로 돌아가기)
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
  color: #6a6d73;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover {
    color: #999;
  }
`;
