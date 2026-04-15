import { useEffect, useState } from "react";
import styled from "styled-components";
import HeroSection from "./HeroSection";
import MusicalListSection from "./MusicalListSection";
import CommunityHotSection from "./CommunityHotSection";
import Footer from "../common/Footer";

const MainPage = () => {
  const [heroList, setHeroList] = useState([]);
  const [musicals, setMusicals] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyHeroList = [
      {
        musicalId: 1,
        title: "레 미제라블",
        synopsis:
          "빅토르 위고의 불멸의 명작을 무대 위에 담아낸 대작. 혁명과 사랑, 용서와 구원의 메시지를 웅장한 음악과 함께 전합니다.",
        rating: 9.8,
        startDate: "2026-03-15",
        endDate: "2026-07-30",
        venue: "블루스퀘어 신한카드홀",
        posterUrl:
          "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
      },
      {
        musicalId: 2,
        title: "오페라의 유령",
        synopsis:
          "강렬한 미스터리와 애절한 사랑이 교차하는 대표작. 화려한 무대미술과 음악으로 관객을 사로잡는 작품입니다.",
        rating: 9.6,
        startDate: "2026-04-01",
        endDate: "2026-08-14",
        venue: "샤롯데씨어터",
        posterUrl:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
      },
      {
        musicalId: 4,
        title: "위키드",
        synopsis:
          "초록 마녀의 시선으로 다시 풀어낸 판타지 뮤지컬. 화려한 무대와 매력적인 캐릭터가 돋보이는 작품입니다.",
        rating: 9.5,
        startDate: "2026-02-01",
        endDate: "2026-08-20",
        venue: "예술의전당",
        posterUrl:
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
      },
    ];

    const dummyMusicals = [
      {
        musicalId: 1,
        title: "레 미제라블",
        synopsis: "혁명과 인간애를 배경으로 한 깊은 감동의 무대.",
        rating: 9.8,
        startDate: "2026-03-15",
        endDate: "2026-07-30",
        venue: "블루스퀘어 신한카드홀",
        posterUrl:
          "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
        status: "공연중",
      },
      {
        musicalId: 2,
        title: "오페라의 유령",
        synopsis: "강렬한 사랑과 미스터리가 교차하는 작품.",
        rating: 9.6,
        startDate: "2026-04-01",
        endDate: "2026-08-14",
        venue: "샤롯데씨어터",
        posterUrl:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        status: "공연중",
      },
      {
        musicalId: 3,
        title: "맘마미아",
        synopsis: "유쾌한 에너지와 음악이 가득한 무대.",
        rating: 9.4,
        startDate: "2026-05-10",
        endDate: "2026-08-05",
        venue: "충무아트센터",
        posterUrl:
          "https://images.unsplash.com/photo-1503095396549-807759245b35",
        status: "공연예정",
      },
      {
        musicalId: 4,
        title: "위키드",
        synopsis: "판타지와 감동을 담은 대표 뮤지컬.",
        rating: 9.5,
        startDate: "2026-02-01",
        endDate: "2026-08-20",
        venue: "예술의전당",
        posterUrl:
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
        status: "공연중",
      },
      {
        musicalId: 5,
        title: "햄릿",
        synopsis: "고전을 현대적으로 재해석한 작품.",
        rating: 9.7,
        startDate: "2026-04-20",
        endDate: "2026-08-31",
        venue: "대학로 아트센터",
        posterUrl:
          "https://images.unsplash.com/photo-1499364615650-ec38552f4f34",
        status: "공연중",
      },
      {
        musicalId: 6,
        title: "노트르담 드 파리",
        synopsis: "강렬한 군무와 음악이 인상적인 작품.",
        rating: 8.3,
        startDate: "2025-11-01",
        endDate: "2026-03-31",
        venue: "세종문화회관",
        posterUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        status: "공연종료",
      },
      {
        musicalId: 7,
        title: "지킬 앤 하이드",
        synopsis: "선과 악의 내면을 그린 대표작.",
        rating: 9.2,
        startDate: "2026-03-01",
        endDate: "2026-06-30",
        venue: "디큐브링크아트센터",
        posterUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
        status: "공연중",
      },
      {
        musicalId: 8,
        title: "엘리자벳",
        synopsis: "황후의 삶을 아름답게 풀어낸 명작.",
        rating: 8.5,
        startDate: "2026-06-01",
        endDate: "2026-11-30",
        venue: "LG아트센터",
        posterUrl:
          "https://images.unsplash.com/photo-1519741497674-611481863552",
        status: "공연예정",
      },
      {
        musicalId: 9,
        title: "시카고",
        synopsis: "재즈와 군무가 돋보이는 명작.",
        rating: 9.1,
        startDate: "2026-07-15",
        endDate: "2026-10-20",
        venue: "블루스퀘어",
        posterUrl:
          "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
        status: "공연예정",
      },
      {
        musicalId: 10,
        title: "영웅",
        synopsis: "역사적 인물을 담은 감동적인 이야기.",
        rating: 9.3,
        startDate: "2026-01-10",
        endDate: "2026-05-15",
        venue: "세종문화회관",
        posterUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        status: "공연종료",
      },
      {
        musicalId: 11,
        title: "웃는 남자",
        synopsis: "묵직한 메시지와 아름다운 음악의 조화.",
        rating: 8.9,
        startDate: "2026-04-05",
        endDate: "2026-09-10",
        venue: "예술의전당",
        posterUrl:
          "https://images.unsplash.com/photo-1511578314322-379afb476865",
        status: "공연중",
      },
      {
        musicalId: 12,
        title: "프랑켄슈타인",
        synopsis: "강렬한 서사와 음악이 인상적인 작품.",
        rating: 9.0,
        startDate: "2026-08-01",
        endDate: "2026-12-20",
        venue: "충무아트센터",
        posterUrl:
          "https://images.unsplash.com/photo-1506157786151-b8491531f063",
        status: "공연예정",
      },
    ];

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

    setHeroList(dummyHeroList);
    setMusicals(dummyMusicals);
    setPosts(dummyPosts);
    setLoading(false);
  }, []);

  if (loading) {
    return <Status>로딩 중...</Status>;
  }

  return (
    <Page>
      <Container>
        <HeroSection heroList={heroList} />
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
