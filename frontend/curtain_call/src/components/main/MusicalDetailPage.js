import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const MusicalDetailPage = () => {
  const navigate = useNavigate();
  const { musicalId } = useParams();

  return (
    <Page>
      <Container>
        <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>
        <Title>공연 상세 페이지</Title>
        <Description>선택한 공연 ID: {musicalId}</Description>
      </Container>
    </Page>
  );
};

export default MusicalDetailPage;

const Page = styled.main`
  min-height: 100vh;
  background: #030712;
  color: #ffffff;
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
  color: #c9a84c;
  font-size: 16px;
  cursor: pointer;
`;

const Title = styled.h1`
  margin: 0 0 12px 0;
  font-size: 32px;
`;

const Description = styled.p`
  margin: 0;
  color: #94a3b8;
`;
