import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { FiChevronLeft, FiSend } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { communityPosts } from "./CommunityList";

// 시간 계산 함수
const formatRelativeTime = (dateString) => {
  if (!dateString) return "";

  // 날짜 형식의 온점(.)을 하이픈(-)으로 바꾸고 공백이 있다면 ISO 형식에 맞게 처리
  const date = new Date(dateString.replace(/\./g, "-"));
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "방금 전";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}일 전`;

  // 7일 이상 지나면 원래 날짜 표시
  return dateString.split(" ")[0]; // 시간 정보 제외하고 날짜만 표시
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #121214;
  }
`;

const DetailWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #121214;
  padding: 40px 20px 80px;
  box-sizing: border-box;
`;

const DetailLayout = styled.div`
  max-width: 1024px;
  margin: 0 auto;
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
  margin-bottom: 32px;
  &:hover {
    color: #ececed;
  }
`;

const PostContainer = styled.div`
  background-color: #1a1c1e;
  border: 1px solid #2e3135;
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 24px;
`;

const CategoryTag = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 20px;
  background-color: ${(props) => props.bgColor || "#0369A1"};
  color: #ffffff;
`;

const PostTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #ececed;
  margin: 0 0 24px 0;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid #2e3135;
`;

const ProfileCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#ff4d4d"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AuthorName = styled.span`
  color: #ececed;
  font-size: 14px;
  font-weight: 500;
`;

const PostDate = styled.span`
  color: #5c5f63;
  font-size: 12px;
`;

const PostContent = styled.div`
  color: #9da0a4;
  font-size: 16px;
  line-height: 1.8;
  white-space: pre-wrap;
`;

const EmptyMessage = styled.div`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 18px;
`;

const CommentSection = styled.div`
  background-color: #1a1c1e;
  border: 1px solid #2e3135;
  border-radius: 20px;
  padding: 32px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ececed;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 24px;
  span {
    color: #c9a84c;
  }
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
`;

const InputBox = styled.div`
  flex: 1;
  position: relative;
  background-color: #121214;
  border: 1px solid #2e3135;
  border-radius: 12px;
  padding: 16px;
  min-height: 80px;
`;

const TextArea = styled.textarea`
  width: 100%;
  background: none;
  border: none;
  color: #ececed;
  resize: none;
  outline: none;
  font-size: 14px;
  &::placeholder {
    color: #5c5f63;
  }
`;

const SendButton = styled.button`
  position: absolute;
  right: 16px;
  bottom: 16px;
  background: none;
  border: none;
  color: #5c5f63;
  cursor: pointer;
  display: flex;
  &:hover {
    color: #c9a84c;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid #2e3135;
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
`;

const AuthorDateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentAuthor = styled.span`
  color: #ececed;
  font-size: 14px;
  font-weight: 600;
`;

const CommentText = styled.p`
  color: #9da0a4;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #5c5f63;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    color: #ff4d4d;
    text-decoration: underline;
  }
`;

const CommunityDetail = ({ userId = 1 }) => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const post = communityPosts.find(
    (item) => Number(item.postId ?? item.id) === Number(postId),
  );

  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "같이갈래요",
      date: "2026.04.08",
      content: "저 관심 있어요! 쪽지 보내볼게요 :)",
      profileColor: "#00C471",
    },
    {
      id: 2,
      author: "위키드러버",
      date: "2026.04.08",
      content: "@같이갈래요 쪽지 확인했어요! 답장 드릴게요~",
      profileColor: "#ff4d4d",
    },
  ]);

  const categoryColors = {
    "정보 공유": "#7C3AED",
    "토크 공간": "#0F766E",
    "Q&A": "#059669",
    공연메이트: "#0369A1",
    "공연 메이트": "#0369A1",
    "티켓 양도": "#DC2626",
    공연후기: "#D97706",
    "공연 후기": "#D97706",
  };

  const handleCommentSubmit = () => {
    if (commentInput.trim() === "") return;

    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    const newComment = {
      id: Date.now(),
      author: "나(User)",
      date: formattedDate,
      content: commentInput,
      profileColor: "#c9a84c",
    };

    setComments([...comments, newComment]);
    setCommentInput("");
  };

  const handleDeleteComment = (id) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      setComments(comments.filter((comment) => comment.id !== id));
    }
  };

  if (!post) {
    return (
      <>
        <GlobalStyle />
        <DetailWrapper>
          <DetailLayout>
            <BackButton onClick={() => navigate("/community")}>
              <FiChevronLeft /> 커뮤니티로 돌아가기
            </BackButton>
            <EmptyMessage>존재하지 않는 게시글입니다.</EmptyMessage>
          </DetailLayout>
        </DetailWrapper>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <DetailWrapper>
        <DetailLayout>
          <BackButton onClick={() => navigate("/community")}>
            <FiChevronLeft /> 커뮤니티로 돌아가기
          </BackButton>

          <PostContainer>
            <CategoryTag bgColor={categoryColors[post.category]}>
              {post.category}
            </CategoryTag>
            <PostTitle>{post.title}</PostTitle>
            <AuthorSection>
              <ProfileCircle color="#ff4d4d">
                {(post.author || "익명").substring(0, 1)}
              </ProfileCircle>
              <AuthorInfo>
                <AuthorName>{post.author}</AuthorName>
                <PostDate>
                  {formatRelativeTime(
                    post.createdAt || post.created_at || post.date,
                  )}
                </PostDate>
              </AuthorInfo>
            </AuthorSection>
            <PostContent>{post.content}</PostContent>
          </PostContainer>

          <CommentSection>
            <CommentHeader>
              댓글 <span>{comments.length}</span>
            </CommentHeader>

            <CommentInputWrapper>
              <ProfileCircle color="#c9a84c">나</ProfileCircle>
              <InputBox>
                <TextArea
                  placeholder="댓글을 입력하세요"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <SendButton onClick={handleCommentSubmit}>
                  <FiSend
                    size={18}
                    style={{ color: commentInput ? "#c9a84c" : "#5c5f63" }}
                  />
                </SendButton>
              </InputBox>
            </CommentInputWrapper>

            <CommentList>
              {comments.map((comment) => (
                <CommentItem key={comment.id}>
                  <ProfileCircle color={comment.profileColor}>
                    {comment.author.substring(0, 1)}
                  </ProfileCircle>

                  <CommentBody>
                    <CommentMeta>
                      <AuthorDateBox>
                        <CommentAuthor>{comment.author}</CommentAuthor>
                        <PostDate>{formatRelativeTime(comment.date)}</PostDate>
                      </AuthorDateBox>

                      {comment.author === "나(User)" && (
                        <DeleteButton
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          삭제
                        </DeleteButton>
                      )}
                    </CommentMeta>
                    <CommentText>{comment.content}</CommentText>
                  </CommentBody>
                </CommentItem>
              ))}
            </CommentList>
          </CommentSection>
        </DetailLayout>
      </DetailWrapper>
    </>
  );
};

export default CommunityDetail;
