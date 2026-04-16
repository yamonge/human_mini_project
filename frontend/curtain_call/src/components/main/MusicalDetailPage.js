import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Pagination from "../common/Pagination";

const REVIEW_PAGE_SIZE = 5;

const MusicalDetailPage = () => {
  const { musicalId } = useParams();

  const [musicalDetail] = useState({
    musicalId: Number(musicalId),
    title: "레 미제라블",
    synopsis:
      "빅토르 위고의 불멸의 명작이 무대 위에서 살아 숨쉽니다. 혁명과 사랑, 용서와 구원의 대서사시. 19세기 프랑스를 배경으로 장 발장의 일생을 통해 인간의 존엄성과 희망을 노래한 작품으로, 전 세계 49개국에서 1억 3천만 명 이상이 관람한 뮤지컬 역사상 최고의 걸작.",
    rating: 9.8,
    reviewCount: 1772,
    startDate: "2026-03-15",
    endDate: "2026-07-30",
    venue: "블루스퀘어 신한카드홀",
    runtime: "2시간 55분",
    ageLimit: "8세 이상",
    crew: "로리 윌슨",
    status: "공연중",
    castNames: "양준모, 민우혁, 린, 이지혜",
    posterUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
    introImages: [
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063",
    ],
    address: "서울 용산구 이태원로 294",
  });

  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewCount, setReviewCount] = useState(musicalDetail.reviewCount);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);

  const [sortType, setSortType] = useState("latest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  const [totalRatingSum, setTotalRatingSum] = useState(
    musicalDetail.rating * musicalDetail.reviewCount,
  );

  const [reviews, setReviews] = useState([
    {
      reviewId: 1,
      userName: "오케스트라팬",
      rating: 10,
      content: "라이브 오케스트라 퀄리티 대박",
      detail:
        "이번 시즌 오케스트라 편성이 정말 탄탄해요. 음향이 좌석 전체에 고르게 퍼지고 배우들 목소리와의 밸런스도 완벽합니다.",
      createdAt: "2026-04-10T09:10:00",
    },
    {
      reviewId: 2,
      userName: "무대매니아",
      rating: 8,
      content: "주연 배우 연기 미쳤다",
      detail:
        "특히 2막 마지막 넘버에서 눈물이 터졌습니다. 이번 시즌 최고의 무대라고 생각해요.",
      createdAt: "2026-04-10T12:30:00",
    },
    {
      reviewId: 3,
      userName: "극장러버",
      rating: 10,
      content: "첫 관람 후기",
      detail:
        "뮤지컬 자주 보는 편인데 이 작품은 정말 최고였습니다. 음악, 연기, 무대 모두 다 완벽했어요.",
      createdAt: "2026-04-11T14:05:00",
    },
    {
      reviewId: 4,
      userName: "현장파",
      rating: 8,
      content: "무대 연출이 인상적이에요",
      detail: "무대 전환이 빠르고 조명 연출이 정말 좋았습니다.",
      createdAt: "2026-04-11T15:00:00",
    },
    {
      reviewId: 5,
      userName: "넘버덕후",
      rating: 10,
      content: "대표 넘버가 너무 좋아요",
      detail: "주요 넘버들이 하나같이 인상적이고 귀에 남아요.",
      createdAt: "2026-04-12T16:15:00",
    },
    {
      reviewId: 6,
      userName: "공연초보",
      rating: 6,
      content: "첫 뮤지컬인데 괜찮았어요",
      detail: "조금 길긴 했지만 전체적으로 몰입감 있었습니다.",
      createdAt: "2026-04-12T17:20:00",
    },
    {
      reviewId: 7,
      userName: "관극러버",
      rating: 10,
      content: "재관람 의사 있음",
      detail: "캐스팅이 좋아서 다른 배우 조합으로도 보고 싶네요.",
      createdAt: "2026-04-12T18:10:00",
    },
    {
      reviewId: 8,
      userName: "무대조명팬",
      rating: 8,
      content: "조명과 무대미술이 훌륭",
      detail: "시각적으로 굉장히 완성도가 높았습니다.",
      createdAt: "2026-04-13T19:25:00",
    },
    {
      reviewId: 9,
      userName: "사운드체크",
      rating: 10,
      content: "음향 밸런스 최고",
      detail: "대사와 노래 전달력이 정말 좋았어요.",
      createdAt: "2026-04-13T20:10:00",
    },
    {
      reviewId: 10,
      userName: "뮤덕1",
      rating: 8,
      content: "배우 합이 좋았어요",
      detail: "앙상블까지 포함해서 전체적인 조화가 좋았습니다.",
      createdAt: "2026-04-13T21:00:00",
    },
    {
      reviewId: 11,
      userName: "뮤덕2",
      rating: 10,
      content: "감정선이 진짜 좋음",
      detail: "특히 후반부 감정선이 정말 좋았습니다.",
      createdAt: "2026-04-13T22:20:00",
    },
    {
      reviewId: 12,
      userName: "뮤덕3",
      rating: 6,
      content: "호불호는 있을 듯",
      detail: "작품 길이가 길어서 취향은 탈 수 있겠어요.",
      createdAt: "2026-04-13T23:05:00",
    },
    {
      reviewId: 13,
      userName: "뮤덕4",
      rating: 10,
      content: "명작은 명작",
      detail: "스토리, 배우, 음악 다 만족스러웠습니다.",
      createdAt: "2026-04-14T00:00:00",
    },
    {
      reviewId: 14,
      userName: "뮤덕5",
      rating: 8,
      content: "전반적으로 좋았습니다",
      detail: "무난하게 만족하고 나왔습니다.",
      createdAt: "2026-04-14T00:40:00",
    },
    {
      reviewId: 15,
      userName: "뮤덕6",
      rating: 10,
      content: "다시 보고 싶네요",
      detail: "한 번 더 보면 더 깊게 보일 것 같아요.",
      createdAt: "2026-04-14T01:30:00",
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isSubmitEnabled = selectedRating > 0 && reviewContent.trim().length > 0;

  const averageRating = useMemo(() => {
    return (totalRatingSum / reviewCount).toFixed(1);
  }, [totalRatingSum, reviewCount]);

  const sortedReviews = useMemo(() => {
    const copiedReviews = [...reviews];

    if (sortType === "rating") {
      return copiedReviews.sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    return copiedReviews.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }, [reviews, sortType]);

  const currentReviews = useMemo(() => {
    const startIndex = (currentReviewPage - 1) * REVIEW_PAGE_SIZE;
    const endIndex = startIndex + REVIEW_PAGE_SIZE;
    return sortedReviews.slice(startIndex, endIndex);
  }, [sortedReviews, currentReviewPage]);

  const handleSubmitReview = () => {
    if (!isSubmitEnabled) return;

    const now = new Date();

    const newReview = {
      reviewId: Date.now(),
      userName: "현재사용자",
      rating: selectedRating,
      content: reviewContent.trim(),
      detail: reviewContent.trim(),
      createdAt: now.toISOString(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setReviewContent("");
    setSelectedRating(0);
    setReviewCount((prev) => prev + 1);
    setTotalRatingSum((prev) => prev + selectedRating);
    setSortType("latest");
    setCurrentReviewPage(1);
    setIsSortOpen(false);
  };

  const handleSelectSort = (type) => {
    setSortType(type);
    setCurrentReviewPage(1);
    setIsSortOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.replaceAll("-", ".");
  };

  const getRelativeTime = (dateString) => {
    const now = new Date();
    const target = new Date(dateString);
    const diffMs = now - target;

    if (diffMs <= 0) return "방금 전";

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (diffMs < minute) return "방금 전";

    if (diffMs < hour) {
      const minutes = Math.floor(diffMs / minute);
      return `${minutes}분 전`;
    }

    if (diffMs < day) {
      const hours = Math.floor(diffMs / hour);
      return `${hours}시간 전`;
    }

    const days = Math.floor(diffMs / day);
    return `${days}일 전`;
  };

  const getStarFillPercents = (rating) => {
    const numericRating = Number(rating) || 0;
    const fiveStarScore = numericRating / 2;

    return Array.from({ length: 5 }, (_, index) => {
      const fill = Math.max(0, Math.min(1, fiveStarScore - index));
      return fill * 100;
    });
  };

  return (
    <Page>
      <Container>
        <Layout>
          <LeftPanel>
            <PosterWrapper>
              <PosterBadge>{musicalDetail.status}</PosterBadge>
              <Poster src={musicalDetail.posterUrl} alt={musicalDetail.title} />
            </PosterWrapper>

            <MusicalTitle>{musicalDetail.title}</MusicalTitle>

            <RatingSummary>
              <RatingStars>
                {getStarFillPercents(averageRating).map(
                  (fillPercent, index) => (
                    <StarBox key={`avg-star-${index}`}>
                      <StarBase>★</StarBase>
                      <StarFill $fillPercent={fillPercent}>★</StarFill>
                    </StarBox>
                  ),
                )}
              </RatingStars>
              <RatingText>
                {averageRating} ({reviewCount})
              </RatingText>
            </RatingSummary>

            <InfoList>
              <InfoBlock>
                <InfoLabel>공연기간</InfoLabel>
                <InfoValue>
                  {formatDate(musicalDetail.startDate)} ~
                  <br />
                  {formatDate(musicalDetail.endDate)}
                </InfoValue>
              </InfoBlock>

              <InfoBlock>
                <InfoLabel>공연장소</InfoLabel>
                <InfoValue>{musicalDetail.venue}</InfoValue>
              </InfoBlock>

              <InfoBlock>
                <InfoLabel>관람시간</InfoLabel>
                <InfoValue>{musicalDetail.runtime}</InfoValue>
              </InfoBlock>

              <InfoBlock>
                <InfoLabel>관람연령</InfoLabel>
                <InfoValue>{musicalDetail.ageLimit}</InfoValue>
              </InfoBlock>
            </InfoList>
          </LeftPanel>

          <RightPanel>
            <SectionCard>
              <SectionTitle>작품 정보</SectionTitle>

              <TopInfoRow>
                <InfoInlineGroup>
                  <InfoKey>연출</InfoKey>
                  <InfoData>{musicalDetail.crew}</InfoData>
                </InfoInlineGroup>

                <InfoInlineGroup>
                  <InfoKey>공연상태</InfoKey>
                  <StatusChip>{musicalDetail.status}</StatusChip>
                </InfoInlineGroup>
              </TopInfoRow>

              <InfoRow>
                <InfoKey>출연</InfoKey>
                <InfoData>{musicalDetail.castName || "정보없음"}</InfoData>
              </InfoRow>
            </SectionCard>

            <SectionCard>
              <SectionTitle>작품 소개</SectionTitle>
              <DescriptionText>{musicalDetail.synopsis}</DescriptionText>
            </SectionCard>

            <SectionCard>
              <SectionTitle>
                소개이미지 ({musicalDetail.introImages.length})
              </SectionTitle>
              <IntroImageRow>
                {musicalDetail.introImages.map((image, index) => (
                  <IntroImage
                    key={index}
                    src={image}
                    alt={`소개이미지-${index + 1}`}
                  />
                ))}
              </IntroImageRow>
            </SectionCard>

            <SectionCard>
              <SectionTitle>네이버지도</SectionTitle>
              <MapPlaceholder>
                <MapPin>📍</MapPin>
                <MapTooltip>
                  <strong>{musicalDetail.venue}</strong>
                  <span>{musicalDetail.address}</span>
                </MapTooltip>
              </MapPlaceholder>

              <AddressBox>
                <AddressTitle>{musicalDetail.venue}</AddressTitle>
                <AddressText>{musicalDetail.address}</AddressText>
              </AddressBox>
            </SectionCard>

            <SectionCard>
              <CommunityHeader>
                <SectionTitle>커뮤니티</SectionTitle>

                <SortDropdown ref={sortRef}>
                  <SortButton onClick={() => setIsSortOpen((prev) => !prev)}>
                    {sortType === "latest" ? "최신순 ▾" : "별점순 ▾"}
                  </SortButton>

                  {isSortOpen && (
                    <SortMenu>
                      <SortMenuItem onClick={() => handleSelectSort("latest")}>
                        최신순
                      </SortMenuItem>
                      <SortMenuItem onClick={() => handleSelectSort("rating")}>
                        별점순
                      </SortMenuItem>
                    </SortMenu>
                  )}
                </SortDropdown>
              </CommunityHeader>

              <ReviewWriteBox>
                <WriteTop>
                  <WriteLabel>별점</WriteLabel>
                  <WriteStars>
                    {[1, 2, 3, 4, 5].map((star) => {
                      const scoreValue = star * 2;
                      return (
                        <WriteStar
                          key={star}
                          $active={selectedRating >= scoreValue}
                          onClick={() => setSelectedRating(scoreValue)}
                        >
                          ★
                        </WriteStar>
                      );
                    })}
                  </WriteStars>
                </WriteTop>

                <ReviewTextarea
                  placeholder="관람 후기나 공연에 대한 이야기를 남겨보세요"
                  maxLength={500}
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                />

                <WriteBottom>
                  <TextCount>{reviewContent.length} / 500</TextCount>
                  <SubmitButton
                    disabled={!isSubmitEnabled}
                    onClick={handleSubmitReview}
                  >
                    등록
                  </SubmitButton>
                </WriteBottom>
              </ReviewWriteBox>

              <ReviewList>
                {currentReviews.map((review) => (
                  <ReviewItem key={review.reviewId}>
                    <ReviewAvatar>{review.userName[0]}</ReviewAvatar>

                    <ReviewContent>
                      <ReviewMeta>
                        <ReviewerName>{review.userName}</ReviewerName>
                        <ReviewDate>
                          {getRelativeTime(review.createdAt)}
                        </ReviewDate>
                        <ReviewStars>
                          {getStarFillPercents(review.rating).map(
                            (fillPercent, index) => (
                              <SmallStarBox
                                key={`${review.reviewId}-star-${index}`}
                              >
                                <SmallStarBase>★</SmallStarBase>
                                <SmallStarFill $fillPercent={fillPercent}>
                                  ★
                                </SmallStarFill>
                              </SmallStarBox>
                            ),
                          )}
                        </ReviewStars>
                      </ReviewMeta>

                      <ReviewTitle>{review.content}</ReviewTitle>
                      <ReviewDetail>{review.detail}</ReviewDetail>
                    </ReviewContent>
                  </ReviewItem>
                ))}
              </ReviewList>

              <ReviewPaginationBox>
                <Pagination
                  totalCount={sortedReviews.length}
                  itemsPerPage={REVIEW_PAGE_SIZE}
                  currentPage={currentReviewPage}
                  onPageChange={setCurrentReviewPage}
                  width={28}
                  height={28}
                />
              </ReviewPaginationBox>
            </SectionCard>
          </RightPanel>
        </Layout>
      </Container>
    </Page>
  );
};

export default MusicalDetailPage;

const Page = styled.main`
  min-height: 100vh;
  background: #0a0a0f;
  color: #ffffff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 20px 80px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 270px 1fr;
  gap: 18px;
  align-items: start;
`;

const LeftPanel = styled.aside`
  position: sticky;
  top: 24px;
`;

const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 14px;
`;

const PosterBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  padding: 5px 10px;
  border-radius: 999px;
  background: #14b87a;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
`;

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 0.72;
  object-fit: cover;
  display: block;
`;

const MusicalTitle = styled.h1`
  margin: 0 0 10px 0;
  font-size: 36px;
  font-weight: 800;
`;

const RatingSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 2px;
`;

const StarBox = styled.span`
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
`;

const StarBase = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  color: rgba(255, 255, 255, 0.22);
  font-size: 16px;
  line-height: 1;
`;

const StarFill = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ $fillPercent }) => `${$fillPercent}%`};
  overflow: hidden;
  white-space: nowrap;
  color: #c9a84c;
  font-size: 16px;
  line-height: 1;
`;

const RatingText = styled.span`
  font-size: 14px;
  color: #c9a84c;
  font-weight: 600;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InfoLabel = styled.span`
  font-size: 13px;
  color: #7f8aa3;
`;

const InfoValue = styled.span`
  font-size: 15px;
  line-height: 1.6;
  color: #e5e7eb;
`;

const RightPanel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionCard = styled.article`
  background: #0d0d14;
  border: 1px solid #1d2330;
  border-radius: 16px;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 700;
`;

const TopInfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 14px;
`;

const InfoInlineGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
`;

const InfoKey = styled.span`
  min-width: 72px;
  font-size: 14px;
  color: #7f8aa3;
`;

const InfoData = styled.span`
  font-size: 15px;
  color: #e5e7eb;
`;

const StatusChip = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(20, 184, 122, 0.18);
  color: #14b87a;
  font-size: 12px;
  font-weight: 700;
`;

const DescriptionText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 2;
  color: #dbe2ee;
`;

const IntroImageRow = styled.div`
  display: flex;
  gap: 12px;
`;

const IntroImage = styled.img`
  width: calc((100% - 24px) / 3);
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
`;

const MapPlaceholder = styled.div`
  height: 260px;
  border-radius: 14px;
  background:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    #171924;
  background-size: 56px 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 14px;
`;

const MapPin = styled.div`
  font-size: 34px;
`;

const MapTooltip = styled.div`
  position: absolute;
  top: 48%;
  left: 56%;
  transform: translate(-50%, -50%);
  padding: 10px 14px;
  border-radius: 12px;
  background: #0b0d16;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;

  span {
    color: #9ca3af;
  }
`;

const AddressBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const AddressTitle = styled.strong`
  font-size: 16px;
`;

const AddressText = styled.span`
  font-size: 14px;
  color: #9ca3af;
`;

const CommunityHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const SortDropdown = styled.div`
  position: relative;
`;

const SortButton = styled.button`
  border: 1px solid #253047;
  background: transparent;
  color: #cfd5df;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
`;

const SortMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 88px;
  background: #171924;
  border: 1px solid #253047;
  border-radius: 10px;
  overflow: hidden;
  z-index: 5;
`;

const SortMenuItem = styled.button`
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: transparent;
  color: #cfd5df;
  font-size: 12px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #202332;
  }
`;

const ReviewWriteBox = styled.div`
  border: 1px solid #252936;
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 22px;
  background: #151722;
`;

const WriteTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
`;

const WriteLabel = styled.span`
  font-size: 14px;
  color: #cfd5df;
`;

const WriteStars = styled.div`
  display: flex;
  gap: 4px;
`;

const WriteStar = styled.button`
  border: none;
  background: transparent;
  color: ${({ $active }) => ($active ? "#c9a84c" : "rgba(255,255,255,0.22)")};
  font-size: 24px;
  cursor: pointer;
  padding: 0;
`;

const ReviewTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  resize: none;
  border: none;
  outline: none;
  background: transparent;
  color: #ffffff;
  font-size: 14px;
  line-height: 1.7;

  &::placeholder {
    color: #7f8aa3;
  }
`;

const WriteBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextCount = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  background: ${({ disabled }) => (disabled ? "#343844" : "#c9a84c")};
  color: ${({ disabled }) => (disabled ? "#9ca3af" : "#111827")};
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const ReviewItem = styled.div`
  display: flex;
  gap: 14px;
`;

const ReviewAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #1f2330;
  color: #cfd5df;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  flex-wrap: wrap;
`;

const ReviewerName = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const ReviewDate = styled.span`
  font-size: 12px;
  color: #7f8aa3;
`;

const ReviewStars = styled.div`
  display: flex;
  gap: 2px;
`;

const SmallStarBox = styled.span`
  position: relative;
  display: inline-block;
  width: 12px;
  height: 12px;
`;

const SmallStarBase = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  color: rgba(255, 255, 255, 0.22);
  font-size: 12px;
  line-height: 1;
`;

const SmallStarFill = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ $fillPercent }) => `${$fillPercent}%`};
  overflow: hidden;
  white-space: nowrap;
  color: #c9a84c;
  font-size: 12px;
  line-height: 1;
`;

const ReviewTitle = styled.p`
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 700;
`;

const ReviewDetail = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: #9ca3af;
`;

const ReviewPaginationBox = styled.div`
  margin-top: 20px;
`;
