import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 420px;
  background-color: #0d0f1a;
  border-radius: 20px;
  padding: 40px 30px;
  color: #fff;

  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #aaa;
  font-size: 20px;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
`;

export const IconBg = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.success ? "rgba(201,168,76,0.15)" : "rgba(255,70,70,0.15)"};
`;

export const Icon = styled.div`
  width: 30px;
  height: 30px;

  background-color: ${(props) => (props.success ? "#c9a84c" : "#ff4d4f")};

  mask: ${(props) =>
    props.success
      ? "url('/icons/mail.svg') no-repeat center / contain"
      : "url('/icons/close_circle.svg') no-repeat center / contain"};

  -webkit-mask: ${(props) =>
    props.success
      ? "url('/icons/mail.svg') no-repeat center / contain"
      : "url('/icons/close_circle.svg') no-repeat center / contain"};
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
  margin-bottom: 25px;
`;

export const InfoBox = styled.div`
  background-color: ${(props) =>
    props.success ? "rgba(255,255,255,0.05)" : "rgba(255, 70, 70, 0.08)"};

  border: 1px solid
    ${(props) =>
      props.success ? "rgba(255,255,255,0.1)" : "rgba(255,70,70,0.3)"};

  border-radius: 12px;
  padding: 15px;
  margin-bottom: 25px;
`;

export const InfoText = styled.p`
  font-size: 13px;
  color: ${(props) =>
    props.success ? "rgba(255,255,255,0.6)" : "rgba(255,120,120,0.9)"};
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;

  ${(props) =>
    props.primary
      ? css`
          background-color: #c9a84c;
          color: #111;
          border: none;

          &:hover {
            background-color: #e0b94b;
          }
        `
      : css`
          background-color: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.7);

          &:hover {
            background-color: #222;
          }
        `}
`;

export const BottomLink = styled.p`
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
