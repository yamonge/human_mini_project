import React, { useEffect, useMemo, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  FiChevronLeft,
  FiSearch,
  FiMessageSquare,
  FiEdit2,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";

const formatDateTimeToMinute = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return String(dateString).slice(0, 16).replace("T", " ");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
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

const filters = [
  "전체",
  "티켓 양도",
  "정보 공유",
  "공연메이트",
  "토크 공간",
  "공연후기",
  "Q&A",
];

const CommunityList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCategory = location.state?.selectedCategory || "전체";

  const [activeFilter, setActiveFilter] = useState(initialCategory);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortType, setSortType] = useState("최신순");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPosts = async () => {
      setLoading(true);

      const result = await AxiosApi.getPostList();
      console.log("게시글 목록 조회 결과:", result);
      console.log("게시글 목록 data:", result?.data);

      let postList = [];

      if (Array.isArray(result?.data)) {
        postList = result.data;
      } else if (Array.isArray(result)) {
        postList = result;
      } else {
        setPosts([]);
        setLoading(false);
        console.error(result);
        return;
      }

      setPosts(postList);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const normalizedPosts = useMemo(() => {
    return posts.map((post, index) => ({
      id: post.id ?? post.postId ?? index + 1,
      category: post.category ?? "",
      title: post.title ?? "",
      content: post.content ?? "",
      author: post.userName ?? "익명",
      rawDate: post.createdAt || "",
      comments: Number(post.commentCount ?? 0),
    }));
  }, [posts]);

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
            {loading ? (
              <EmptyBox>게시글을 불러오는 중입니다.</EmptyBox>
            ) : sortedPosts.length > 0 ? (
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
                      <span>{formatDateTimeToMinute(post.rawDate)}</span>
                    </AuthorDate>

                    <CommentCount>
                      <FiMessageSquare /> {post.comments}
                    </CommentCount>
                  </PostMeta>
                </PostCard>
              ))
            ) : (
              <EmptyBox>아직 게시글이 없습니다.</EmptyBox>
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
