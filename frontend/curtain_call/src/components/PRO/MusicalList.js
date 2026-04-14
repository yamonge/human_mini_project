import React, { useState } from "react";
import styled from "styled-components";

const MainContent = styled.main`
  background-color: #0b0c10;
  color: #ffffff;
  padding: 40px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 20px;
  border-bottom: 1px solid #222;
  padding-bottom: 15px;
`;

const Tab = styled.span`
  font-size: 15px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#c9a84c" : "#888")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  position: relative;

  ${(props) =>
    props.active &&
    `
  &::after {
   content: '';
   position: absolute;
   bottom: -16px;
   left: 0;
   width: 100%;
   height: 2px;
   background-color: #c9a84c;
  }
 `}
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  .total-count {
    font-size: 14px;
    color: #eee;
    span {
      color: #c9a84c;
      font-weight: bold;
    }
  }
`;

const SortGroup = styled.div`
  display: flex;
  background-color: #1a1b1e;
  padding: 4px;
  border-radius: 20px;
  gap: 2px;
`;

const SortButton = styled.button`
  background: ${(props) => (props.active ? "#333" : "transparent")};
  color: ${(props) => (props.active ? "#fff" : "#666")};
  border: none;
  padding: 6px 14px;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
`;

const TitleSection = styled.section`
  margin-bottom: 40px;
  h1 {
    font-size: 24px;
    color: white;
    margin-bottom: 8px;
  }
  .sub-title {
    color: #c9a84c;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  border-radius: 30px;
  border: none;
  background-color: #2a2b2e;
  color: white;
  font-size: 15px;
  outline: none;
  &::placeholder {
    color: #666;
  }
  &:focus {
    background-color: #35363a;
  }
`;

const ItemCard = styled.div`
  display: flex;
  width: 100%;
  gap: 25px;
  padding: 30px 0;
  border-bottom: 1px solid #1f2023;
`;

const Poster = styled.img`
  width: 130px;
  height: 180px;
  border-radius: 6px;
  object-fit: cover;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  .top-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .status-tag {
    background: rgba(0, 188, 125, 0.1);
    color: #00bc7d;
    padding: 3px 8px;
    font-size: 11px;
    border-radius: 4px;
    font-weight: bold;
  }

  .rating {
    color: #c9a84c;
    font-weight: bold;
    font-size: 14px;
  }

  h3 {
    font-size: 20px;
    margin: 0 0 12px 0;
    color: #fff;
  }

  .description {
    font-size: 13.5px;
    color: #888;
    line-height: 1.5;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .details {
    font-size: 14px;
    color: #888;
    line-height: 1.5;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bottom-info {
    font-size: 13px;
    color: #666;
    display: flex;
    flex-direction: column;
    gap: 6px;
    .label {
      color: #555;
      margin-right: 10px;
      font-weight: bold;
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
  padding-bottom: 60px;
`;

const PageButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #333;
  background-color: transparent;
  color: #888;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  &:hover {
    border-color: #c9a84c;
    color: #c9a84c;
  }
  &.active {
    background-color: #c9a84c;
    color: #000;
    border-color: #c9a84c;
    font-weight: bold;
  }
  &:disabled {
    cursor: default;
    opacity: 0.3;
    &:hover {
      border-color: #333;
      color: #888;
    }
  }
`;

const MusicalItem = ({ data }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "공연중":
        return { color: "#00bc7d", bg: "rgba(0, 188, 125, 0.1)" };
      case "공연예정":
        return { color: "#c9a84c", bg: "rgba(201, 168, 76, 0.1)" };
      case "공연완료":
        return { color: "#aaaaaa", bg: "rgba(170, 170, 170, 0.1)" };
      default:
        return { color: "#888888", bg: "rgba(136, 136, 136, 0.1)" };
    }
  };

  const style = getStatusStyle(data.status);

  return (
    <ItemCard>
      <Poster src={data.posterUrl} alt={data.title} />
      <Info>
        <div className="top-row">
          <span
            className="status-tag"
            style={{ color: style.color, backgroundColor: style.bg }}
          >
            {data.status}
          </span>
          <span className="rating">★ {data.rating?.toFixed(1)}</span>
        </div>
        <h3>{data.title}</h3>
        <p className="details">{data.synopsis}</p>
        <div className="bottom-info">
          <div>
            <span className="label">장소</span>
            {data.venue}
          </div>
          <div>
            <span className="label">기간</span>
            {data.startDate} ~ {data.endDate}
          </div>
          <div>
            <span className="label">출연</span>
            {data.castName || "정보없음"}
          </div>
        </div>
      </Info>
    </ItemCard>
  );
};

const MusicalListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("전체");
  const itemPerPage = 6;
  const [sortBy, setSortBy] = useState("평점순");
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    {
      musicalId: 1,
      title: "레 미제라블",
      status: "공연중",
      rating: 9.8,
      synopsis:
        "빅토르 위고의 불멸의 명작이 무대 위에서 살아 숨쉰다. 혁명과 사랑, 용서와 구원의 대서사시.",
      venue: "블루스퀘어 신한카드홀",
      startDate: "2026.03.15",
      endDate: "2026.07.30",
      castName: "양준모, 민우혁, 카이, 이지혜",
      posterUrl: "https://via.placeholder.com/130x180",
    },
    {
      musicalId: 2,
      title: "해밀턴",
      status: "공연예정",
      rating: 9.7,
      synopsis:
        "미국 건국의 아버지 알렉산더 해밀턴의 일생을 힙합과 R&B로 풀어낸 혁신적인 뮤지컬.",
      venue: "LG아트센터 서울",
      startDate: "2026.04.20",
      endDate: "2026.08.31",
      castName: "박은태, 김준수, 아이비",
      posterUrl: "https://via.placeholder.com/130x180",
    },
    {
      musicalId: 3,
      title: "오페라의 유령",
      status: "공연중",
      rating: 9.6,
      synopsis:
        "세계에서 가장 사랑받는 뮤지컬. 파리 오페라 하우스의 지하 깊숙이 숨겨진 사랑 이야기.",
      venue: "샤롯데씨어터",
      startDate: "2026.04.01",
      endDate: "2026.09.14",
      castName: "전동석, 손지수, 김우형",
      posterUrl: "https://via.placeholder.com/130x180",
    },
    {
      musicalId: 4,
      title: "위키드",
      status: "공연중",
      rating: 9.5,
      synopsis:
        "오즈의 마법사의 또 다른 이야기. 착한 마녀와 나쁜 마녀가 되기 이전, 두 소녀의 우정과 성장에 관한 이야기.",
      venue: "예술의전당 오페라극장",
      startDate: "2026.02.01",
      endDate: "2026.08.20",
      castName: "옥주현,정선아,박강현",
      posterUrl: "https://via.placeholder.com/130x180",
    },
    {
      musicalId: 5,
      title: "엘리자벳",
      status: "공연예정",
      rating: 9.5,
      synopsis:
        "오스트리아의 황후 엘리자벳의 파란만장한 일생을 그린 웅장한 유럽 뮤지컬.",
      venue: "예술의전당 오페라극장",
      startDate: "2026.06.01",
      endDate: "2026.11.30",
      castName: "김소현, 박효신, 규현",
      posterUrl: "https://via.placeholder.com/130x180",
    },
    {
      musicalId: 6,
      title: "맘마미아",
      status: "공연예정",
      rating: 9.4,
      synopsis:
        "ABBA의 명곡들로 가득 찬 유쾌하고화려한 무대. 웃음과 감동이 넘치는 축제의 현장.",
      venue: "디큐브아트센터",
      startDate: "2026.05.10",
      endDate: "2026.10.05",
      castName: "최정원, 나하나, 홍지민",
      posterUrl: "https://via.placeholder.com/130x180",
    },
    {
      musicalId: 7,
      title: "공연이 종료된 작품",
      status: "공연완료",
      rating: 8.5,
      synopsis: "이미 종료된 공연의 예시 데이터입니다.",
      venue: "예술의전당",
      startDate: "2025.01.01",
      endDate: "2025.02.01",
      castName: "배우A",
      posterUrl: "https://via.placeholder.com/130x180",
    },
  ];

  const filteredData = mockData.filter((item) => {
    const matchSearch = item.title.includes(searchTerm);
    const matchTab = filterStatus === "전체" || item.status === filterStatus;
    return matchSearch && matchTab;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "평점순") return b.rating - a.rating;
    if (sortBy === "가나다순") return a.title.localeCompare(b.title);
    if (sortBy === "공연일순")
      return new Date(a.startDate) - new Date(b.startDate);
    return 0;
  });

  const indexofLastItem = currentPage * itemPerPage;
  const indexofFirstItem = indexofLastItem - itemPerPage;
  const currentItems = sortedData.slice(indexofFirstItem, indexofLastItem);

  const totalPages = Math.ceil(filteredData.length / itemPerPage);

  return (
    <MainContent>
      <ContentWrapper>
        <TitleSection>
          <p className="sub-title">CURTAIN CALL</p>
          <h1>뮤지컬 전체</h1>
          <p style={{ color: "#888", fontSize: "14px" }}>
            국내외 다양한 뮤지컬 공연을 한눈에 만나보세요.
          </p>
          <SearchContainer>
            <SearchInput
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="뮤지컬 명을 검색하세요."
            />
          </SearchContainer>
        </TitleSection>
        <TabContainer>
          {["전체", "공연중", "공연예정", "공연완료"].map((tab) => (
            <Tab
              key={tab}
              active={filterStatus === tab}
              onClick={() => setFilterStatus(tab)}
            >
              {tab}
            </Tab>
          ))}
        </TabContainer>

        <ListHeader>
          <div className="total-count">
            총 <span>{filteredData.length}</span>개의 뮤지컬
          </div>
          <SortGroup>
            {["평점순", "가나다순", "공연일순"].map((type) => (
              <SortButton
                key={type}
                active={sortBy === type}
                onClick={() => {
                  setSortBy(type);
                  setCurrentPage(1);
                }}
              >
                {type}
              </SortButton>
            ))}
          </SortGroup>
        </ListHeader>

        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <MusicalItem key={item.musicalId} data={item} />
          ))
        ) : (
          <div
            style={{ padding: "100px 0", textAlign: "center", color: "#666" }}
          >
            해당하는 공연이 없습니다.
          </div>
        )}
        <PaginationContainer>
          <PageButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            &lt;
          </PageButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <PageButton
                key={pageNum}
                className={currentPage === pageNum ? "active" : ""}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </PageButton>
            ),
          )}
          <PageButton
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            &gt;
          </PageButton>
        </PaginationContainer>
      </ContentWrapper>
    </MainContent>
  );
};
export default MusicalListPage;
