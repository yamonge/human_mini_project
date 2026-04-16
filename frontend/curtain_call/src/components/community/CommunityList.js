import React, { useMemo, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  FiChevronLeft,
  FiSearch,
  FiMessageSquare,
  FiEdit2,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

// 시간 계산 함수
const formatRelativeTime = (dateString) => {
  if (!dateString) return "";

  // 날짜 형식의 온점(.)을 하이픈(-)으로 바꾸고 공백이 있다면 ISO 형식에 맞게 처리
  const date = new Date(dateString.replace(/\./g, "-"));
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "방금 전";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}일 전`;

  // 7일 이상 지나면 원래 날짜 표시
  return dateString.split(" ")[0]; // 시간 정보 제외하고 날짜만 표시
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #121214;
    color: #ececed;
    font-family: 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`;

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #121214;
`;

const PageLayout = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 40px 20px 80px;
`;

const Header = styled.header`
  margin-bottom: 32px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #9da0a4;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  margin-bottom: 24px;

  &:hover {
    color: #ececed;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #9da0a4;
  margin: 0;
`;

const SearchBarRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 52px;
  background-color: #1a1c1e;
  border: 1px solid #2e3135;
  border-radius: 12px;
  width: 120px;
  overflow: hidden;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 12px 20px;
  font-size: 14px;
  color: #ececed;
  cursor: pointer;

  &:hover {
    background-color: #2e3135;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #5c5f63;
  font-size: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  background-color: #1a1c1e;
  border: 1px solid #2e3135;
  border-radius: 12px;
  padding: 16px 16px 16px 52px;
  color: #ececed;
  font-size: 16px;
  box-sizing: border-box;

  &::placeholder {
    color: #5c5f63;
  }
`;

const SortDropdown = styled.button`
  background-color: #1a1c1e;
  border: 1px solid #2e3135;
  border-radius: 12px;
  padding: 0 24px;
  color: #ececed;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  height: 52px;
  white-space: nowrap;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  background-color: ${(props) => (props.$active ? "#C9A84C" : "#1a1c1e")};
  color: ${(props) => (props.$active ? "#121214" : "#9da0a4")};
  border: 1px solid #2e3135;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.$active ? "#C9A84C" : "#2e3135")};
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PostCard = styled.div`
  background-color: #1a1c1e;
  border: 1px solid #2e3135;
  border-radius: 16px;
  padding: 24px;
  transition: border-color 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #4a4d51;
  }
`;

const CategoryColors = {
  "정보 공유": { bg: "#7C3AED", text: "#FFFFFF" },
  "토크 공간": { bg: "#0F766E", text: "#FFFFFF" },
  "Q&A": { bg: "#059669", text: "#FFFFFF" },
  공연메이트: { bg: "#0369A1", text: "#FFFFFF" },
  "공연 메이트": { bg: "#0369A1", text: "#FFFFFF" },
  "티켓 양도": { bg: "#DC2626", text: "#FFFFFF" },
  공연후기: { bg: "#D97706", text: "#FFFFFF" },
  "공연 후기": { bg: "#D97706", text: "#FFFFFF" },
};

const CategoryTag = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 16px;
  background-color: ${(props) => CategoryColors[props.$type]?.bg || "#2e3135"};
  color: ${(props) => CategoryColors[props.$type]?.text || "#9da0a4"};
`;

const PostTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #ececed;
`;

const PostPreviewText = styled.p`
  font-size: 14px;
  color: #9da0a4;
  margin: 0 0 20px 0;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #5c5f63;
`;

const AuthorDate = styled.div`
  display: flex;
  gap: 12px;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #5c5f63;
`;

const FloatingWriteButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #c9a84c;
  color: #121214;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const EmptyBox = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #5c5f63;
  background-color: #1a1c1e;
  border: 1px solid #2e3135;
  border-radius: 16px;
`;

export const communityPosts = [
  {
    postId: 1,
    userId: 101,
    category: "정보 공유",
    title: "대학로 소극장 뮤지컬 추천 리스트 2026",
    content:
      "대형 공연 외에 소극장 뮤지컬도 놓치면 아까운 작품들이 많아요. 올해 대학로 픽 목록 공유합니다.",
    author: "소극장마니아",
    createdAt: "2026.04.06",
    comments: 33,
  },
  {
    postId: 2,
    userId: 102,
    category: "토크 공간",
    title: "최애 뮤지컬 넘버 하나만 꼽는다면?",
    content:
      "저는 레미제라블의 One Day More입니다. 여러분의 최애 넘버도 궁금해요.",
    author: "넘버collector",
    createdAt: "2026.04.06",
    comments: 0,
  },
  {
    postId: 3,
    userId: 103,
    category: "Q&A",
    title: "뮤지컬 영어 원서 대본 구하는 방법?",
    content: "지킬앤하이드 영어 대본 공부하고 싶은데 어디서 구할 수 있나요?",
    author: "영어공부주",
    createdAt: "2026.04.07",
    comments: 11,
  },
  {
    postId: 4,
    userId: 104,
    category: "공연메이트",
    title: "레미제라블 고수 분들 같이 N차 관람 어떤가요?",
    content: "올해 이미 세 번 봤는데 같이 N차 관람하고 후기 나눌 분 구합니다.",
    author: "레미마니아",
    createdAt: "2026.04.07",
    comments: 23,
  },
  {
    postId: 5,
    userId: 105,
    category: "티켓 양도",
    title: "4/18 오페라의 유령 VIP석 양도 - 정가",
    content:
      "예매처 취소 불가 기간이 지나서 양도합니다. 비대면 안전거래 가능합니다.",
    author: "양도천사",
    createdAt: "2026.04.07",
    comments: 5,
  },
  {
    postId: 6,
    userId: 106,
    category: "공연메이트",
    title: "4/20 위키드 혼자 보러 가는데 같이 가실 분?",
    content:
      "4월 20일 오후 2시 샤롯데씨어터 위키드 관람 예정입니다. 혼자 보기 아쉬워서 같이 가실 분 구해요!",
    author: "위키드러버",
    createdAt: "2026.04.08",
    comments: 14,
  },
  {
    postId: 7,
    userId: 107,
    category: "공연후기",
    title: "맘마미아 보고 온 50대 엄마의 후기",
    content:
      "딸이 사줘서 처음 뮤지컬 봤어요. 너무 재밌어서 또 보고 싶습니다. ABBA 노래 너무 좋고 배우들도 최고예요!",
    author: "행복한엄마",
    createdAt: "2026.04.08",
    comments: 89,
  },
  {
    postId: 8,
    userId: 108,
    category: "정보 공유",
    title: "LG아트센터 주차 정보 & 주변 맛집 총정리",
    content:
      "LG아트센터 자주 가시는 분들을 위해 근처 주차장이랑 맛집 정리해봤어요. 공연 전후로 활용하세요!",
    author: "아트센터단골",
    createdAt: "2026.04.08",
    comments: 47,
  },
];

const filters = [
  "전체",
  "티켓 양도",
  "정보 공유",
  "공연메이트",
  "토크 공간",
  "공연후기",
  "Q&A",
];

const CommunityList = ({ posts = communityPosts }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCategory = location.state?.selectedCategory || "전체";

  const [activeFilter, setActiveFilter] = useState(initialCategory);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortType, setSortType] = useState("최신순");
  const [searchTerm, setSearchTerm] = useState("");

  const displayPosts = posts.length > 0 ? posts : communityPosts;

  const normalizedPosts = useMemo(() => {
    return displayPosts.map((post, index) => ({
      id: post.id ?? post.postId ?? index + 1,
      category: post.category ?? "",
      title: post.title ?? "",
      content: post.content ?? post.preview ?? "",
      author: post.author ?? post.userName ?? "익명",
      rawDate: post.date ?? post.createdAt ?? post.created_at ?? "",
      // date: post.date ?? post.createdAt ?? post.created_at ?? "",
      comments: Number(post.comments ?? post.commentCount ?? 0),
    }));
  }, [displayPosts]);

  const filteredPosts = useMemo(() => {
    return normalizedPosts.filter((post) => {
      const matchesFilter =
        activeFilter === "전체" || post.category === activeFilter;

      const matchesSearch =
        (post.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content || "").toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [normalizedPosts, activeFilter, searchTerm]);

  const sortedPosts = useMemo(() => {
    const copied = [...filteredPosts];

    return copied.sort((a, b) => {
      if (sortType === "최신순") {
        const dateA = new Date(String(a.rawDate || "").replace(/\./g, "-"));
        const dateB = new Date(String(b.rawDate || "").replace(/\./g, "-"));
        return dateB - dateA;
      }

      return (b.comments || 0) - (a.comments || 0);
    });
  }, [filteredPosts, sortType]);

  return (
    <>
      <GlobalStyle />

      <PageWrapper>
        <PageLayout>
          <Header>
            <BackButton onClick={() => navigate("/")}>
              <FiChevronLeft /> 홈으로 돌아가기
            </BackButton>

            <Title>커뮤니티</Title>
            <SubTitle>뮤지컬 팬들과 자유롭게 이야기를 나눠보세요</SubTitle>
          </Header>

          <SearchBarRow>
            <SearchInputWrapper>
              <SearchIcon />
              <SearchInput
                type="text"
                placeholder="게시글 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInputWrapper>

            <div style={{ position: "relative", display: "flex" }}>
              <SortDropdown onClick={() => setIsSortOpen((prev) => !prev)}>
                {sortType} ▼
              </SortDropdown>

              {isSortOpen && (
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      setSortType("최신순");
                      setIsSortOpen(false);
                    }}
                  >
                    최신순
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      setSortType("인기순");
                      setIsSortOpen(false);
                    }}
                  >
                    인기순
                  </DropdownItem>
                </DropdownMenu>
              )}
            </div>
          </SearchBarRow>

          <FilterRow>
            {filters.map((filter) => (
              <FilterTab
                key={filter}
                $active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </FilterTab>
            ))}
          </FilterRow>

          <PostList>
            {sortedPosts.length > 0 ? (
              sortedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  onClick={() => navigate(`/community/${post.id}`)}
                >
                  <CategoryTag $type={post.category}>
                    {post.category}
                  </CategoryTag>

                  <PostTitle>{post.title}</PostTitle>

                  <PostPreviewText>{post.content}</PostPreviewText>

                  <PostMeta>
                    <AuthorDate>
                      <span>@{post.author}</span>
                      <span>
                        {formatRelativeTime(post.rawDate).includes("전") ||
                        formatRelativeTime(post.rawDate) === "방금 전" ? (
                          <>
                            {post.rawDate.split(" ")[0]} (
                            {formatRelativeTime(post.rawDate)})
                          </>
                        ) : (
                          <>{formatRelativeTime(post.rawDate)}</>
                        )}
                      </span>
                    </AuthorDate>

                    <CommentCount>
                      <FiMessageSquare /> {post.comments}
                    </CommentCount>
                  </PostMeta>
                </PostCard>
              ))
            ) : (
              <EmptyBox>검색 결과가 없습니다.</EmptyBox>
            )}
          </PostList>

          <FloatingWriteButton onClick={() => navigate("/community/write")}>
            <FiEdit2 />
          </FloatingWriteButton>
        </PageLayout>
      </PageWrapper>
    </>
  );
};

export default CommunityList;
