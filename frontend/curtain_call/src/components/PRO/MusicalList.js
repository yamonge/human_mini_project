import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import Pagination from "../common/Pagination";

const ITEMS_PER_PAGE = 6;
const TABS = ["전체", "공연중", "공연예정", "공연완료"];
const SORT_OPTIONS = ["평점순", "가나다순", "공연일순"];

const STATUS_STYLES = {
  공연중: { color: "#00bc7d", bg: "rgba(0, 188, 125, 0.1)" },
  공연예정: { color: "#c9a84c", bg: "rgba(201, 168, 76, 0.1)" },
  공연완료: { color: "#aaaaaa", bg: "rgba(170, 170, 170, 0.1)" },
};
const DEFAULT_STATUS_STYLE = { color: "#888888", bg: "rgba(136, 136, 136, 0.1)" };

const formatDate = (dateStr) => String(dateStr ?? "").replaceAll("-", ".");

const calculateDday = (startDate) => {
  const target = new Date(String(startDate).replaceAll(".", "-"));
  const diffDays = Math.ceil((target - new Date()) / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? `D-${diffDays}` : "D-day";
};

const MusicalItem = ({ data, onClickItem }) => {
  const statusStyle = STATUS_STYLES[data.status] ?? DEFAULT_STATUS_STYLE;

  return (
    <ItemCard onClick={() => onClickItem(data.musicalId)} style={{ cursor: "pointer" }}>
      <Poster src={data.posterUrl} alt={data.title} />
      <Info>
        <div className="top-row">
          <span
            className="status-tag"
            style={{ color: statusStyle.color, backgroundColor: statusStyle.bg }}
          >
            {data.status}
          </span>
          {data.status === "공연예정" && (
            <span className="d-day">{calculateDday(data.startDate)}</span>
          )}
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
            {formatDate(data.startDate)} ~ {formatDate(data.endDate)}
          </div>
          <div>
            <span className="label">출연</span>
            {data.casts || "정보없음"}
          </div>
        </div>
      </Info>
    </ItemCard>
  );
};

const MusicalListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialTab = location.state?.selectedTab || "전체";
  const initialSearch = location.state?.searchKeyword || "";

  const [musicals, setMusicals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState(initialTab);
  const [sortBy, setSortBy] = useState("평점순");
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchMusicals = async () => {
      const response = await AxiosApi.getMusicalList();
      if (response.success) {
        setMusicals(response.data ?? []);
      }
    };
    fetchMusicals();
  }, []);

  useEffect(() => {
    const keyword = location.state?.searchKeyword || "";
    setSearchTerm(keyword);
    setCurrentPage(1);
  }, [location.state?.searchKeyword]);

  const filteredData = useMemo(() => {
    return musicals.filter((item) => {
      const matchSearch = item.title.includes(searchTerm);
      const matchTab = filterStatus === "전체" || item.status === filterStatus;
      return matchSearch && matchTab;
    });
  }, [musicals, searchTerm, filterStatus]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (sortBy === "평점순") return (b.rating ?? 0) - (a.rating ?? 0);
      if (sortBy === "가나다순") return a.title.localeCompare(b.title);
      if (sortBy === "공연일순") {
        return new Date(String(a.startDate).replaceAll(".", "-"))
          - new Date(String(b.startDate).replaceAll(".", "-"));
      }
      return 0;
    });
  }, [filteredData, sortBy]);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedData, currentPage]);

  const handleTabChange = (tab) => {
    setFilterStatus(tab);
    setCurrentPage(1);
  };

  const handleSortChange = (type) => {
    setSortBy(type);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

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
              onChange={handleSearch}
              placeholder="뮤지컬 명을 검색하세요."
            />
          </SearchContainer>
        </TitleSection>

        <TabContainer>
          {TABS.map((tab) => (
            <Tab
              key={tab}
              active={filterStatus === tab}
              onClick={() => handleTabChange(tab)}
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
            {SORT_OPTIONS.map((type) => (
              <SortButton
                key={type}
                active={sortBy === type}
                onClick={() => handleSortChange(type)}
              >
                {type}
              </SortButton>
            ))}
          </SortGroup>
        </ListHeader>

        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <MusicalItem
              key={item.musicalId}
              data={item}
              onClickItem={(id) => navigate(`/musicals/${id}`)}
            />
          ))
        ) : (
          <EmptyMessage>해당하는 공연이 없습니다.</EmptyMessage>
        )}

        <PaginationWrapper>
          <Pagination
            totalCount={filteredData.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            width={36}
            height={36}
          />
        </PaginationWrapper>
      </ContentWrapper>
    </MainContent>
  );
};

export default MusicalListPage;

/* ──────────────── Styled Components ──────────────── */

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

  .d-day {
    color: #c9a84c;
    font-size: 13px;
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

const PaginationWrapper = styled.div`
  padding-bottom: 60px;
`;

const EmptyMessage = styled.div`
  padding: 100px 0;
  text-align: center;
  color: #666;
`;
