import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #121214;
    color: #ececed;
    font-family: 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`;

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #121214;
`;

const PageLayout = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 40px 20px 80px;
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: #9da0a4;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  margin-bottom: 24px;
  &:hover {
    color: #ececed;
  }
`;

const TitleSection = styled.div`
  margin-bottom: 40px;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #ececed;
`;

const PageSubTitle = styled.p`
  font-size: 16px;
  color: #c9a84c;
  margin: 0;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #ececed;
  display: flex;
  gap: 4px;
  &::after {
    content: "*";
    color: #ff4d4d;
  }
`;

const CategoryGrid = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const CategoryBtn = styled.button`
  background-color: ${(props) => (props.active ? "#C9A84C" : "#1a1c1e")};
  color: ${(props) => (props.active ? "#121214" : "#9da0a4")};
  border: 1px solid #2e3135;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: ${(props) => (props.active ? "#C9A84C" : "#2e3135")};
  }
`;

const TextInput = styled.input`
  background-color: #1a1c1e;
  border: 1px solid #2e3135;
  border-radius: 12px;
  padding: 18px;
  color: #ececed;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #c9a84c;
  }
  &::placeholder {
    color: #5c5f63;
  }
`;

const CharCount = styled.span`
  align-self: flex-end;
  font-size: 12px;
  color: #5c5f63;
  margin-top: 4px;
`;

const TextArea = styled.textarea`
  background-color: #1a1c1e;
  border: 1px solid #2e3135;
  border-radius: 12px;
  padding: 18px;
  color: #ececed;
  font-size: 16px;
  min-height: 400px;
  resize: none;
  outline: none;
  line-height: 1.6;
  &:focus {
    border-color: #c9a84c;
  }
  &::placeholder {
    color: #5c5f63;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 18px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) =>
    props.variant === "primary" ? "#2a2824" : "transparent"};
  color: ${(props) => (props.variant === "primary" ? "#C9A84C" : "#9da0a4")};
  border: 1px solid
    ${(props) => (props.variant === "primary" ? "#C9A84C" : "#2e3135")};

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary" ? "#3b382d" : "#1a1c1e"};
  }
`;

const CommunityWrite = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const categories = [
    "정보 공유",
    "티켓 양도",
    "공연메이트",
    "토크 공간",
    "공연후기",
    "Q&A",
  ];

  const handleSubmit = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("로그인 후 게시글을 작성할 수 있습니다.");
      navigate("/login");
      return;
    }

    if (!selectedCategory || !title.trim() || !content.trim()) {
      alert("모든 필수 항목(*)을 입력해주세요.");
      return;
    }

    const loginUser = JSON.parse(storedUser);

    const postData = {
      userId: Number(loginUser.userId ?? loginUser.id),
      title: title.trim(),
      content: content.trim(),
      category: selectedCategory,
    };

    const result = await AxiosApi.createPost(postData);
    console.log("게시글 등록 결과:", result);

    if (result?.success || result?.data || typeof result === "object") {
      alert("게시글이 등록되었습니다.");
      navigate("/community", {
        state: { refresh: Date.now() },
      });
      return;
    }

    alert(result?.message || result || "게시글 등록 실패");
  };

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <PageLayout>
          <BackLink onClick={() => navigate("/community")}>
            <FiChevronLeft /> 커뮤니티로 돌아가기
          </BackLink>

          <TitleSection>
            <PageTitle>글 작성</PageTitle>
            <PageSubTitle>
              뮤지컬 팬들과 공유하고 싶은 이야기를 작성해보세요
            </PageSubTitle>
          </TitleSection>

          <FormSection>
            <InputGroup>
              <Label>카테고리</Label>
              <CategoryGrid>
                {categories.map((cat) => (
                  <CategoryBtn
                    key={cat}
                    active={selectedCategory === cat}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </CategoryBtn>
                ))}
              </CategoryGrid>
            </InputGroup>

            <InputGroup>
              <Label>제목</Label>
              <TextInput
                placeholder="제목을 입력하세요"
                maxLength={100}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <CharCount>{title.length} / 100</CharCount>
            </InputGroup>

            <InputGroup>
              <Label>내용</Label>
              <TextArea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </InputGroup>

            <ButtonRow>
              <ActionButton
                variant="secondary"
                onClick={() => navigate("/community")}
              >
                취소
              </ActionButton>
              <ActionButton variant="primary" onClick={handleSubmit}>
                등록
              </ActionButton>
            </ButtonRow>
          </FormSection>
        </PageLayout>
      </PageWrapper>
    </>
  );
};

export default CommunityWrite;
