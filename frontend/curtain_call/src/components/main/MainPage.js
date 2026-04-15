import { useEffect, useState } from "react";
import styled from "styled-components";
import HeroSection from "./HeroSection";
import MusicalListSection from "./MusicalListSection";
import CommunityHotSection from "./CommunityHotSection";
import Footer from "../common/Footer";
import { musicalMockData } from "../PRO/MusicalList";

const MainPage = () => {
  const [musicals, setMusicals] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyPosts = [
      {
        postId: 1,
        category: "티켓 양도",
        title: "레 미제라블 2층 R석 양도합니다",
        commentCount: 124,
      },
      {
        postId: 2,
        category: "정보 공유",
        title: "이번 주 할인 이벤트 정리해봤어요",
        commentCount: 15,
      },
      {
        postId: 3,
        category: "공연후기",
        title: "레 미제라블 4번대 관람 후기입니다",
        commentCount: 89,
      },
      {
        postId: 4,
        category: "Q&A",
        title: "2026년 상반기 뮤지컬 라인업 총정리",
        commentCount: 203,
      },
      {
        postId: 5,
        category: "토크 공간",
        title: "가장 좋아하는 넘버 하나씩 적어봐요",
        commentCount: 55,
      },
      {
        postId: 6,
        category: "공연 메이트",
        title: "이번 주말 같이 보실 분 구합니다",
        commentCount: 41,
      },
    ];

    setMusicals(musicalMockData);
    setPosts(dummyPosts);
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

      <Footer />
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
