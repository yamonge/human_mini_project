import { useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MusicalCard from "./MusicalCard";
import Pagination from "../common/Pagination";

const TABS = ["전체", "공연중", "공연예정", "공연완료"];
const PAGE_SIZE = 8;

const tabDescriptionMap = {
  전체: "현재 상영 중이거나 예정된 국내 뮤지컬 공연을 만나보세요",
  공연중: "지금 바로 관람 가능한 국내 뮤지컬 공연입니다",
  공연예정: "곧 시작될 국내 뮤지컬 공연을 확인해보세요",
  공연완료: "공연이 종료된 국내 뮤지컬 작품입니다",
};

const MusicalListSection = ({ musicals }) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMusicals = useMemo(() => {
    if (selectedTab === "전체") return musicals;

    return musicals.filter((musical) => {
      const normalizedStatus = String(musical.status || "").trim();
      return normalizedStatus === selectedTab;
    });
  }, [musicals, selectedTab]);

  const currentMusicals = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredMusicals.slice(startIndex, endIndex);
  }, [filteredMusicals, currentPage]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  return (
    <Section>
      <HeaderRow>
        <HeaderLeft>
          <Title>뮤지컬</Title>
          <Description>{tabDescriptionMap[selectedTab]}</Description>
        </HeaderLeft>

        <HeaderRight>
          <ViewAllButton onClick={() => navigate("/musicals")}>
            전체보기 &gt;
          </ViewAllButton>
        </HeaderRight>
      </HeaderRow>

      <TabRow>
        {TABS.map((tab) => (
          <TabButton
            key={tab}
            $active={selectedTab === tab}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabRow>

      <Grid>
        {currentMusicals.map((musical) => (
          <MusicalCard key={musical.musicalId} musical={musical} />
        ))}
      </Grid>

      <Pagination
        totalCount={filteredMusicals.length}
        itemsPerPage={PAGE_SIZE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        width={28}
        height={28}
      />
    </Section>
  );
};

export default MusicalListSection;

const Section = styled.section`
  margin-bottom: 72px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 18px;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: 2px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #f8fafc;
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: #7f8aa3;
`;

const ViewAllButton = styled.button`
  border: none;
  background: transparent;
  color: #7f8aa3;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
`;

const TabRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
`;

const TabButton = styled.button`
  padding: 9px 18px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? "#C9A84C" : "#283142")};
  background: ${({ $active }) => ($active ? "#C9A84C" : "transparent")};
  color: ${({ $active }) => ($active ? "#111827" : "#d5d9e3")};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px 18px;
`;
