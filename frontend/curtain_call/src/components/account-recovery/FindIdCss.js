import styled, { css } from "styled-components";

export const LoginContainer = styled.div`
  width: 420px;
  background-color: #111118;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  padding: 20px 30px;
  color: #f0f0f0;
  font-family: "Arial", sans-serif;
  position: relative;
  margin: auto;
`;

export const Header = styled.div`
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #888; /* 서브타이틀 색상 변경: 아이디/비밀번호 찾기 설명 문구 */
`;

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

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  background-color: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 12px 0;
  background-color: transparent;
  border: none;
  color: #f0f0f0;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  ${(props) =>
    props.active &&
    css`
      background-color: #c9a84c;
      color: #111118;
    `}

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.active ? "#e0b94b" : "#3a3a3a")};
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const FormDescription = styled.p`
  font-size: 14px;
  color: #ccc;
  margin-bottom: 20px;
`;

export const FindForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #ccc;
`;

export const FindInput = styled.input`
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

  ${(props) =>
    props.validationStatus === "valid" &&
    css`
      border-color: green;
    `}

  ${(props) =>
    props.validationStatus === "invalid" &&
    css`
      border-color: red;
    `}
`;

export const ErrorMessage = styled.p`
  font-size: 12px;
  position: absolute;
  bottom: -18px;
  right: 0;
  color: ${(props) => props.color || "red"};
`;

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

export const ReturnToLoginLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  color: #888;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
