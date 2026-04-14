import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const categoryStyleMap = {
  공지사항: {
    text: "#ffb84d",
    bg: "rgba(255, 184, 77, 0.12)",
    iconBg: "rgba(255, 184, 77, 0.18)",
    icon: "📌",
  },
  퇴근후기: {
    text: "#3dd9c4",
    bg: "rgba(61, 217, 196, 0.12)",
    iconBg: "rgba(61, 217, 196, 0.18)",
    icon: "💬",
  },
  공연일기: {
    text: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.12)",
    iconBg: "rgba(245, 158, 11, 0.18)",
    icon: "🔥",
  },
  "질문 글": {
    text: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.12)",
    iconBg: "rgba(139, 92, 246, 0.18)",
    icon: "📈",
  },
};

const CommunityHotSection = ({ hotPosts }) => {
  const navigate = useNavigate();

  const handleMovePostDetail = (postId) => {
    navigate(`/community/${postId}`);
  };

  return (
    <Section>
      <SmallLabel>COMMUNITY</SmallLabel>
      <Title>커뮤니티 HOT 게시물</Title>

      <Board>
        <Grid>
          {hotPosts.map((post) => {
            const style = categoryStyleMap[post.category] || {
              text: "#d8b24c",
              bg: "rgba(216,178,76,0.12)",
              iconBg: "rgba(216,178,76,0.18)",
              icon: "•",
            };

            return (
              <PostItem key={post.postId}>
                <LeftArea>
                  <IconBox $iconBg={style.iconBg}>{style.icon}</IconBox>

                  <PostTextArea>
                    <CategoryPill $text={style.text} $bg={style.bg}>
                      {post.category}
                    </CategoryPill>

                    <PostTitle
                      onClick={() => handleMovePostDetail(post.postId)}
                    >
                      {post.title}
                    </PostTitle>
                  </PostTextArea>
                </LeftArea>

                <MetaArea>
                  <CommentMeta>💬 {post.commentCount}</CommentMeta>
                </MetaArea>
              </PostItem>
            );
          })}
        </Grid>
      </Board>

      <ButtonRow>
        <MoreButton onClick={() => navigate("/community")}>
          커뮤니티 전체 게시물 보기 →
        </MoreButton>
      </ButtonRow>
    </Section>
  );
};

export default CommunityHotSection;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SmallLabel = styled.p`
  margin: 0 0 8px 0;
  font-size: 11px;
  letter-spacing: 1.8px;
  color: #c9a54e;
`;

const Title = styled.h2`
  margin: 0 0 18px 0;
  font-size: 28px;
  font-weight: 700;
`;

const Board = styled.div`
  border: 1px solid #1d2330;
  border-radius: 16px;
  background: #0a0f1c;
  padding: 12px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const PostItem = styled.article`
  min-height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 14px;
  border-bottom: 1px solid #181f2d;

  &:nth-last-child(-n + 2) {
    border-bottom: none;
  }

  &:nth-child(odd) {
    border-right: 1px solid #181f2d;
  }
`;

const LeftArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconBox = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $iconBg }) => $iconBg};
  font-size: 13px;
`;

const PostTextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CategoryPill = styled.span`
  width: fit-content;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: ${({ $text }) => $text};
  background: ${({ $bg }) => $bg};
`;

const PostTitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #dde3ee;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const MetaArea = styled.div`
  margin-left: 12px;
`;

const CommentMeta = styled.span`
  font-size: 12px;
  color: #6f788b;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const MoreButton = styled.button`
  padding: 12px 24px;
  border-radius: 999px;
  border: 1px solid #253047;
  background: transparent;
  color: #cfd5df;
  font-size: 13px;
  cursor: pointer;
`;
