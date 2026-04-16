import { useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ heroList = [] }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const rankedHeroList = useMemo(() => {
    return [...heroList]
      .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
      .slice(0, 3);
  }, [heroList]);

  if (!rankedHeroList.length) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return String(dateString).replaceAll("-", ".");
  };

  const getStarFillPercents = (rating) => {
    const numericRating = Number(rating) || 0;
    const fiveStarScore = numericRating / 2;

    return Array.from({ length: 5 }, (_, index) => {
      const fill = Math.max(0, Math.min(1, fiveStarScore - index));
      return fill * 100;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? rankedHeroList.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === rankedHeroList.length - 1 ? 0 : prev + 1,
    );
  };

  const handleMoveDetail = (musicalId) => {
    navigate(`/musicals/${musicalId}`);
  };

  return (
    <Section>
      <SliderTrack $currentIndex={currentIndex}>
        {rankedHeroList.map((hero, index) => (
          <Slide key={hero.musicalId} $bg={hero.posterUrl}>
            <DarkOverlay />

            <Content>
              <RankBadge>🏆 {index + 1}위</RankBadge>

              <Title>{hero.title}</Title>

              <RatingRow>
                <StarsWrapper>
                  {getStarFillPercents(hero.rating).map(
                    (fillPercent, starIndex) => (
                      <StarBox key={`${hero.musicalId}-star-${starIndex}`}>
                        <StarBase>★</StarBase>
                        <StarFill $fillPercent={fillPercent}>★</StarFill>
                      </StarBox>
                    ),
                  )}
                </StarsWrapper>

                <Score>{Number(hero.rating || 0).toFixed(1)}</Score>
              </RatingRow>

              <Description>{hero.synopsis}</Description>

              <InfoRow>
                <InfoItem>
                  • {formatDate(hero.startDate)} ~ {formatDate(hero.endDate)}
                </InfoItem>
                <InfoItem>• {hero.venue}</InfoItem>
              </InfoRow>

              <DetailButton onClick={() => handleMoveDetail(hero.musicalId)}>
                공연 상세 보기
              </DetailButton>
            </Content>
          </Slide>
        ))}
      </SliderTrack>

      <ArrowGroup>
        <ArrowButton onClick={handlePrev}>‹</ArrowButton>
        <ArrowButton onClick={handleNext}>›</ArrowButton>
      </ArrowGroup>

      <IndicatorRow>
        {rankedHeroList.map((_, index) => (
          <Indicator
            key={index}
            $active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </IndicatorRow>
    </Section>
  );
};

export default HeroSection;

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 540px;
  margin-bottom: 56px;
  overflow: hidden;
  border: 1px solid #1d2330;
  border-radius: 20px;
`;

const SliderTrack = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transform: ${({ $currentIndex }) => `translateX(-${$currentIndex * 100}%)`};
  transition: transform 0.55s ease-in-out;
`;

const Slide = styled.div`
  position: relative;
  min-width: 100%;
  height: 100%;
  padding: 26px 22px 28px 22px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-image: ${({ $bg }) => `url(${$bg})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const DarkOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(4, 9, 18, 0.88) 0%,
    rgba(4, 9, 18, 0.58) 42%,
    rgba(4, 9, 18, 0.12) 100%
  );
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 520px;
`;

const RankBadge = styled.div`
  position: relative;
  top: -50px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 28px;
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid rgba(201, 168, 76, 0.55);
  background: rgba(201, 168, 76, 0.12);
  color: #c9a84c;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

const Title = styled.h1`
  margin: 0 0 18px 0;
  font-size: 46px;
  font-weight: 800;
  line-height: 1.1;
  color: #ffffff;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
`;

const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const StarBox = styled.span`
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 1;
`;

const StarBase = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  color: rgba(255, 255, 255, 0.28);
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

const Score = styled.span`
  font-size: 22px;
  color: #c9a84c;
  font-weight: 700;
`;

const Description = styled.p`
  margin: 0 0 22px 0;
  font-size: 15px;
  line-height: 2;
  color: #dbe2ee;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const InfoItem = styled.span`
  font-size: 14px;
  color: #b8c0d0;
`;

const DetailButton = styled.button`
  min-width: 150px;
  height: 44px;
  padding: 0 24px;
  border: none;
  border-radius: 999px;
  background: #c9a84c;
  color: #111827;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

const ArrowGroup = styled.div`
  position: absolute;
  right: 24px;
  top: 50%;
  z-index: 3;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ArrowButton = styled.button`
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: 22px;
  cursor: pointer;
  backdrop-filter: blur(4px);
`;

const IndicatorRow = styled.div`
  position: absolute;
  left: 50%;
  bottom: 22px;
  z-index: 3;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 7px;
`;

const Indicator = styled.button`
  width: ${({ $active }) => ($active ? "28px" : "7px")};
  height: 5px;
  border: none;
  border-radius: 999px;
  background: ${({ $active }) =>
    $active ? "#C9A84C" : "rgba(255,255,255,0.35)"};
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
`;
