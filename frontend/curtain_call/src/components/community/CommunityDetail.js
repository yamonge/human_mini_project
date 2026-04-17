import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { FiChevronLeft, FiSend } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";

const formatDateTimeToMinute = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return String(dateString).slice(0, 16).replace("T", " ");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
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
  width: 100%;
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

const CommunityDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchDetailData = async () => {
    setLoading(true);

    const [postResult, commentResult] = await Promise.all([
      AxiosApi.getPost(postId),
      AxiosApi.getCommentList(postId),
    ]);

    console.log("게시글 상세 조회 결과:", postResult);
    console.log("댓글 목록 조회 결과:", commentResult);

    const postData = postResult?.data ?? postResult;
    const commentData = commentResult?.data ?? commentResult;

    if (postData && typeof postData === "object" && !Array.isArray(postData)) {
      setPost(postData);
    } else {
      setPost(null);
      console.error(postResult);
    }

    if (Array.isArray(commentData)) {
      setComments(commentData);
    } else {
      setComments([]);
      console.error(commentResult);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDetailData();
  }, [postId]);

  const handleCommentSubmit = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("로그인 후 댓글을 등록할 수 있습니다.");
      navigate("/login");
      return;
    }

    if (commentInput.trim() === "") return;

    const loginUser = JSON.parse(storedUser);

    const commentData = {
      userId: Number(loginUser.userId ?? loginUser.id),
      content: commentInput.trim(),
    };

    const result = await AxiosApi.createComment(commentData, postId);

    if (result?.success || result?.data || typeof result === "object") {
      setCommentInput("");
      fetchDetailData();
      return;
    }

    alert(result?.message || result || "댓글 등록 실패");
  };

  if (loading) {
    return (
      <>
        <GlobalStyle />
        <DetailWrapper>
          <DetailLayout>
            <BackButton onClick={() => navigate("/community")}>
              <FiChevronLeft /> 커뮤니티로 돌아가기
            </BackButton>
            <EmptyMessage>게시글을 불러오는 중입니다.</EmptyMessage>
          </DetailLayout>
        </DetailWrapper>
      </>
    );
  }

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

  const postAuthor = post.userName ?? "익명";
  const postDate = post.createdAt ?? "";
  const postCategory = post.category ?? "";
  const postTitle = post.title ?? "";
  const postContent = post.content ?? "";

  const sortedComments = [...comments].sort((a, b) => {
    const dateA = new Date(a.createdAt ?? "");
    const dateB = new Date(b.createdAt ?? "");
    return dateB - dateA;
  });

  return (
    <>
      <GlobalStyle />
      <DetailWrapper>
        <DetailLayout>
          <BackButton onClick={() => navigate("/community")}>
            <FiChevronLeft /> 커뮤니티로 돌아가기
          </BackButton>

          <PostContainer>
            <CategoryTag bgColor={categoryColors[postCategory]}>
              {postCategory}
            </CategoryTag>

            <PostTitle>{postTitle}</PostTitle>

            <AuthorSection>
              <ProfileCircle color="#ff4d4d">
                {postAuthor.substring(0, 1)}
              </ProfileCircle>

              <AuthorInfo>
                <AuthorName>{postAuthor}</AuthorName>
                <PostDate>{formatDateTimeToMinute(postDate)}</PostDate>
              </AuthorInfo>
            </AuthorSection>

            <PostContent>{postContent}</PostContent>
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
              {sortedComments.map((comment, index) => {
                const commentAuthor =
                  comment.author ??
                  comment.userName ??
                  comment.writer ??
                  comment.name ??
                  "익명";

                const commentDate =
                  comment.date ?? comment.createdAt ?? comment.created_at ?? "";

                const commentContent = comment.content ?? "";

                return (
                  <CommentItem
                    key={
                      comment.id ??
                      comment.commentId ??
                      comment.comment_id ??
                      index
                    }
                  >
                    <ProfileCircle color="#00C471">
                      {commentAuthor.substring(0, 1)}
                    </ProfileCircle>

                    <CommentBody>
                      <CommentMeta>
                        <AuthorDateBox>
                          <CommentAuthor>{commentAuthor}</CommentAuthor>
                          <PostDate>
                            {formatDateTimeToMinute(commentDate)}
                          </PostDate>
                        </AuthorDateBox>
                      </CommentMeta>

                      <CommentText>{commentContent}</CommentText>
                    </CommentBody>
                  </CommentItem>
                );
              })}
            </CommentList>
          </CommentSection>
        </DetailLayout>
      </DetailWrapper>
    </>
  );
};

export default CommunityDetail;
