import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../common/Pagination";
import AxiosApi from "../../api/AxiosApi";

const REVIEW_PAGE_SIZE = 5;

const MusicalDetailPage = () => {
  const { musicalId } = useParams();
  const navigate = useNavigate();

  const [musicalDetail, setMusicalDetail] = useState({});

  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewCount, setReviewCount] = useState(musicalDetail.reviewCount);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);

  const [sortType, setSortType] = useState("latest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMusicalDetail = async () => {
      try {
        const response = await AxiosApi.getMusical(musicalId);
        setMusicalDetail(response.data);
      } catch (error) {
        console.error("뮤지컬 상세 정보 조회 실패:", error);
      }

      try {
        const response = await AxiosApi.getReviewList(musicalId);
        setReviews(response.data);
      } catch (error) {
        console.error("리뷰 목록 조회 실패:", error);
      }

      setReviewCount(reviews.length);
    };

    fetchMusicalDetail();

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
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("로그인 후 후기를 등록할 수 있습니다.");
      navigate("/login");
      return;
    }

    if (!isSubmitEnabled) return;

    const loginUser = JSON.parse(storedUser);
    const now = new Date();

    const newReview = {
      reviewId: Date.now(),
      userName: loginUser.name || "현재사용자",
      rating: selectedRating,
      content: reviewContent.trim(),
      detail: reviewContent.trim(),
      createdAt: now.toISOString(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setReviewContent("");
    setSelectedRating(0);
    setReviewCount((prev) => prev + 1);
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
                {getStarFillPercents(musicalDetail.rating).map(
                  (fillPercent, index) => (
                    <StarBox key={`avg-star-${index}`}>
                      <StarBase>★</StarBase>
                      <StarFill $fillPercent={fillPercent}>★</StarFill>
                    </StarBox>
                  ),
                )}
              </RatingStars>
              <RatingText>
                {musicalDetail.rating} ({reviewCount})
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
                <InfoData>{musicalDetail.casts || "정보없음"}</InfoData>
              </InfoRow>
            </SectionCard>

            <SectionCard>
              <SectionTitle>작품 소개</SectionTitle>
              <DescriptionText>{musicalDetail.synopsis}</DescriptionText>
            </SectionCard>

            <SectionCard>
              <SectionTitle>소개이미지</SectionTitle>
              <IntroImageRow>
                {musicalDetail.introImg1 && (
                  <IntroImage src={musicalDetail.introImg1} alt="소개이미지" />
                )}
                {musicalDetail.introImg2 && (
                  <IntroImage src={musicalDetail.introImg2} alt="소개이미지" />
                )}
                {musicalDetail.introImg3 && (
                  <IntroImage src={musicalDetail.introImg3} alt="소개이미지" />
                )}
                {musicalDetail.introImg4 && (
                  <IntroImage src={musicalDetail.introImg4} alt="소개이미지" />
                )}
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
