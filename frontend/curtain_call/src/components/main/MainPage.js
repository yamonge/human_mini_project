import { useEffect, useState } from "react";
import styled from "styled-components";
import HeroSection from "./HeroSection";
import MusicalListSection from "./MusicalListSection";
import CommunityHotSection from "./CommunityHotSection";
import { musicalMockData } from "../PRO/MusicalList";

const MainPage = () => {
  const [musicals, setMusicals] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusicals = async () => {
      const response = await musicalMockData();
      setMusicals(response.data);
    };
    fetchMusicals();
    setLoading(false);
  }, []);

  if (loading) {
    return <Status>로딩 중...</Status>;
  }

  return (
    <Page>
      <Container>
        <HeroSection heroList={musicals} />
        <MusicalListSection musicals={musicals} />
        <CommunityHotSection posts={posts} />
      </Container>
    </Page>
  );
};

export default MainPage;

const Page = styled.main`
  min-height: 100vh;
  background: #0a0a0f;
  color: #ffffff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px 90px;
`;

const Status = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0f;
  color: #ffffff;
  font-size: 18px;
`;
