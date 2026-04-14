import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  CloseButton,
  IconWrapper,
  IconBg,
  Icon,
  Title,
  Description,
  InfoBox,
  InfoText,
  Button,
  BottomLink,
} from "./PasswordResultCss";

const PasswordResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSuccess = location.state?.isSuccess;

  return (
    <Container>
      <CloseButton onClick={() => navigate("/")}>×</CloseButton>

      <IconWrapper>
        <IconBg success={isSuccess}>
          <Icon success={isSuccess} />
        </IconBg>
      </IconWrapper>

      <Title>
        {isSuccess ? "이메일을 확인해주세요" : "등록되지 않은 이메일입니다"}
      </Title>

      <Description>
        {isSuccess
          ? "이메일로 비밀번호 재설정 링크를 보냈습니다."
          : "입력한 이메일로 계정을 찾을 수 없습니다."}
      </Description>

      <InfoBox success={isSuccess}>
        {isSuccess ? (
          <>
            <InfoText success>링크는 30분간 유효합니다</InfoText>
            <InfoText success>
              메일이 오지 않았다면 스팸함을 확인해주세요
            </InfoText>
          </>
        ) : (
          <>
            <InfoText>이메일 주소를 다시 확인해주세요</InfoText>
            <InfoText>소셜 로그인 계정일 수 있습니다</InfoText>
            <InfoText>계정이 없다면 회원가입 해주세요</InfoText>
          </>
        )}
      </InfoBox>

      {isSuccess ? (
        <>
          <Button primary onClick={() => navigate("/login")}>
            로그인 페이지로
          </Button>
          <Button onClick={() => navigate("/find-account")}>
            다시 시도하기
          </Button>
        </>
      ) : (
        <>
          <Button primary onClick={() => navigate("/find-account")}>
            다시 시도하기
          </Button>
          <Button onClick={() => navigate("/signup")}>회원가입하기</Button>
        </>
      )}

      <BottomLink onClick={() => navigate("/find-account")}>
        계정 찾기로 돌아가기
      </BottomLink>
    </Container>
  );
};

export default PasswordResult;
