import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  if (!dateString) return "";
  return dateString.replaceAll("-", ".");
};

const getDDay = (startDate) => {
  if (!startDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(startDate);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDay;
};

const MusicalCard = ({ musical }) => {
  const navigate = useNavigate();
  const { musicalId, title, rating, startDate, endDate, posterUrl, status } =
    musical;

  const dDay = status === "공연예정" ? getDDay(startDate) : null;
  const showDDay = status === "공연예정" && dDay !== null && dDay > 0;

  const handleMoveDetail = () => {
    navigate(`/musicals/${musicalId}`);
  };

  return (
    <Card>
      <ImageWrapper>
        <PosterImage src={posterUrl} alt={title} />

        {showDDay && <DDayBadge>D-{dDay}</DDayBadge>}

        <Overlay>
          <OverlayButton onClick={handleMoveDetail}>
            공연 상세 보기
          </OverlayButton>
        </Overlay>
      </ImageWrapper>

      <Content>
        <Title>{title}</Title>
        <Rating>★ {Number(rating || 0).toFixed(1)}</Rating>
        <DateText>
          {formatDate(startDate)} ~ {formatDate(endDate)}
        </DateText>
      </Content>
    </Card>
  );
};

export default MusicalCard;

const Card = styled.article`
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 0.78;
  overflow: hidden;
  border-radius: 14px;
  background: #0a0a0f;

  &:hover img {
    transform: scale(1.03);
  }

  &:hover div[data-overlay="true"] {
    opacity: 1;
  }
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const DDayBadge = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
  padding: 4px 8px;
  border-radius: 999px;
  background: #c9a84c;
  color: #111827;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
`;

const Overlay = styled.div.attrs({
  "data-overlay": "true",
})`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.32);
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const OverlayButton = styled.button`
  padding: 10px 18px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.42);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

const Content = styled.div`
  padding-top: 12px;
`;

const Title = styled.h3`
  margin: 0 0 6px 0;
  font-size: 15px;
  font-weight: 700;
  color: #f8fafc;
`;

const Rating = styled.p`
  margin: 0 0 6px 0;
  font-size: 13px;
  font-weight: 600;
  color: #c9a84c;
`;

const DateText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #7f8aa3;
`;
