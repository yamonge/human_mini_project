import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MusicalListPage = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Container>
        <BackButton onClick={() => navigate("/")}>← 메인으로</BackButton>
        <Title>뮤지컬 전체보기 페이지</Title>
        <Description>
          여기에 나중에 전체 뮤지컬 목록 페이지를 구현하면 됩니다.
        </Description>
      </Container>
    </Page>
  );
};

export default MusicalListPage;

const Page = styled.main`
  min-height: 100vh;
  background: #0a0a0f;
  color: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const BackButton = styled.button`
  margin-bottom: 20px;
  border: none;
  background: transparent;
  color: #d8b24c;
  cursor: pointer;
  font-size: 16px;
`;

const Title = styled.h1`
  margin: 0 0 12px 0;
  font-size: 32px;
`;

const Description = styled.p`
  margin: 0;
  color: #94a3b8;
`;
