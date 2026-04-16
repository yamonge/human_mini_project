import styled, { css } from "styled-components";

// 로그인 컨테이너 스타일 정의
export const LoginContainer = styled.div`
  width: 420px;
  background-color: #111118;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  padding: 30px;
  color: #f0f0f0;
  font-family: "Arial", sans-serif;
  position: relative;
  margin: auto;
`;

// 헤더 스타일 정의
export const Header = styled.div`
  margin-bottom: 30px;
`;

// 제목 스타일 정의
export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

// 부제목 스타일 정의
export const Subtitle = styled.p`
  font-size: 14px;
  color: #c9a84c;
`;

// 닫기 버튼 스타일 정의
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

// 로그인 폼 스타일 정의
export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

// 입력 그룹 스타일 정의 (레이블과 입력 필드를 묶음)
export const InputGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

// 레이블 스타일 정의
export const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #ccc;
`;

// 로그인 입력 필드 스타일 정의
export const LoginInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  background-color: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  color: #f0f0f0;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d4af37;
  }

  // 웹킷 기반 브라우저 자동 완성 스타일 재정의
  &:-webkit-autofill {
    -webkit-text-fill-color: #f0f0f0 !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

// 계정 복구 (아이디/비밀번호 찾기) 링크 스타일 정의
export const AccountRecovery = styled.a`
  position: absolute;
  right: 0;
  top: -28px;
  font-size: 12px;
  color: #888;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

// 버튼 스타일 정의
export const Button = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  font-size: 14px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  margin-top: 10px;

  // outline 속성에 따른 조건부 스타일 적용
  ${(props) =>
    props.outline
      ? css`
          background-color: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
          &:hover {
            background-color: #333;
            border-color: #f0f0f0;
          }
        `
      : css`
          background-color: #c9a84c;
          border: none;
          color: #1e1e1e;
          &:hover {
            background-color: #e0b94b;
          }
        `}
`;

// 구분선 ("또는") 스타일 정의
export const OrDivider = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
  color: #888;
  position: relative;

  // 구분선 양쪽의 가로선 스타일 정의
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background-color: #3a3a3a;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

// 소셜 로그인 버튼 그룹 스타일 정의
export const SocialLoginGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

// 소셜 로그인 버튼 개별 스타일 정의
export const SocialButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  background-color: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: rgba(255, 255, 255);

  &:hover {
    background-color: #3e3e3e;
  }

  img {
    margin-right: 8px;
  }
`;
