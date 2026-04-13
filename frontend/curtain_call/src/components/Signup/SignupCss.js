// LoginCss.js 내용은 동일합니다.
import styled, { css } from "styled-components";

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

export const Header = styled.div`
  margin-bottom: 30px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #c9a84c;
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

export const LoginForm = styled.form`
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

export const FindPasswordLink = styled.a`
  position: absolute;
  right: 0;
  top: -28px;
  font-size: 12px;
  color: #888;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 12px;
  margin-top: 8px;
  text-align: right;
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

export const OrDivider = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
  color: #888;
  position: relative;

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

export const SocialLoginGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

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
