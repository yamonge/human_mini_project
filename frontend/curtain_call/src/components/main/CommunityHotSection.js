import { useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const categoryStyleMap = {
  "티켓 양도": {
    text: "#F4B44F",
    bg: "rgba(244, 180, 79, 0.14)",
    iconBg: "rgba(244, 180, 79, 0.16)",
    icon: "🎫",
  },
  "정보 공유": {
    text: "#3DD9C4",
    bg: "rgba(61, 217, 196, 0.14)",
    iconBg: "rgba(61, 217, 196, 0.16)",
    icon: "📢",
  },
  공연메이트: {
    text: "#60A5FA",
    bg: "rgba(96, 165, 250, 0.14)",
    iconBg: "rgba(96, 165, 250, 0.16)",
    icon: "🤝",
  },

  "토크 공간": {
    text: "#A78BFA",
    bg: "rgba(167, 139, 250, 0.14)",
    iconBg: "rgba(167, 139, 250, 0.16)",
    icon: "💬",
  },
  공연후기: {
    text: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.14)",
    iconBg: "rgba(245, 158, 11, 0.16)",
    icon: "⭐",
  },
  "Q&A": {
    text: "#F87171",
    bg: "rgba(248, 113, 113, 0.14)",
    iconBg: "rgba(248, 113, 113, 0.16)",
    icon: "❓",
  },
};

const CommunityHotSection = ({ posts }) => {
  const navigate = useNavigate();

  const hotPosts = useMemo(() => {
    return [...posts];
  }, []);

  const handleMovePostDetail = (postId) => {
    navigate(`/community/${postId}`);
  };

  const handleMoveCommunityPage = () => {
    navigate("/community");
  };

  return (
    <Section>
      <SmallLabel>COMMUNITY</SmallLabel>
      <Title>커뮤니티 HOT 게시물</Title>

      {hotPosts.length === 0 ? (
        <>
          <EmptyBox>아직 커뮤니티 게시글이 없습니다</EmptyBox>
          <ButtonRow>
            <MoreButton onClick={handleMoveCommunityPage}>
              커뮤니티 전체 게시물 보기 →
            </MoreButton>
          </ButtonRow>
        </>
      ) : (
        <>
          <Board>
            <Grid>
              {hotPosts.map((post) => {
                const style = categoryStyleMap[post.category] || {
                  text: "#C9A84C",
                  bg: "rgba(201, 168, 76, 0.14)",
                  iconBg: "rgba(201, 168, 76, 0.16)",
                  icon: "•",
                };

                const postId = post.postId ?? post.id;
                const commentCount = post.comments ?? post.commentCount ?? 0;

                return (
                  <PostItem key={postId}>
                    <LeftArea>
                      <IconCircle $iconBg={style.iconBg}>
                        <IconText>{style.icon}</IconText>
                      </IconCircle>

                      <PostTextArea>
                        <CategoryPill $text={style.text} $bg={style.bg}>
                          {post.category}
                        </CategoryPill>

                        <PostTitleText
                          onClick={() => handleMovePostDetail(postId)}
                        >
                          {post.title}
                        </PostTitleText>
                      </PostTextArea>
                    </LeftArea>

                    <MetaArea>
                      <CommentMeta>💬 {commentCount}</CommentMeta>
                    </MetaArea>
                  </PostItem>
                );
              })}
            </Grid>
          </Board>

          <ButtonRow>
            <MoreButton onClick={handleMoveCommunityPage}>
              커뮤니티 전체 게시물 보기 →
            </MoreButton>
          </ButtonRow>
        </>
      )}
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

const EmptyBox = styled.div`
  border: 1px solid #1d2330;
  border-radius: 16px;
  background: #0d0d14;
  padding: 48px 20px;
  text-align: center;
  color: #7f8aa3;
  font-size: 15px;
`;

const Board = styled.div`
  border: 1px solid #1d2330;
  border-radius: 16px;
  background: #0d0d14;
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

const IconCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ $iconBg }) => $iconBg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const IconText = styled.span`
  font-size: 14px;
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

const PostTitleText = styled.p`
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
