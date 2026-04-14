import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  width: 420px;
  padding: 30px;
  border-radius: 16px;
  background: #0b0f1a;
  color: white;
  position: relative;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
`;

export const CloseButton = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

export const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: ${(props) => (props.success ? "#c9a84c20" : "#ff4d4f20")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: ${(props) => (props.success ? "#c9a84c" : "#ff4d4f")};
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

export const SubText = styled.p`
  text-align: center;
  font-size: 14px;
  opacity: 0.7;
  margin-bottom: 20px;
  white-space: pre-line;
`;

export const InfoBox = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Label = styled.span`
  opacity: 0.6;
`;

export const Value = styled.span`
  color: #c9a84c;
  font-weight: bold;
`;

export const ErrorBox = styled.div`
  background: rgba(255, 77, 79, 0.1);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;

  ul {
    padding-left: 15px;
  }

  li {
    margin-bottom: 5px;
    font-size: 14px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background: #c9a84c;
  color: black;
  border: none;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const SubButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;
