import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logoImg from "../img/logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleMoveMusicalTab = (tab) => {
    navigate("/musicals", {
      state: { selectedTab: tab },
    });
  };

  const handleMoveCommunityTab = (tab) => {
    navigate("/community", {
      state: { selectedCategory: tab },
    });
  };

  return (
    <FooterWrapper>
      <FooterInner>
        <TopSection>
          <BrandSection>
            <BrandTop>
              <LogoImage src={logoImg} alt="커튼콜 로고" />
              <BrandName>CURTAIN CALL</BrandName>
            </BrandTop>

            <BrandDescription>
              뮤지컬을 사랑하는 사람들을 위한
              <br />
              국내 최대 규모의 커뮤니티 플랫폼.
              <br />
              생생한 리뷰와 정보로 무대까지.
            </BrandDescription>
          </BrandSection>

          <MenuSection>
            <MenuColumn>
              <MenuTitle>공연정보</MenuTitle>

              <MenuLink
                type="button"
                onClick={() => handleMoveMusicalTab("전체")}
              >
                전체 공연
              </MenuLink>
              <MenuLink
                type="button"
                onClick={() => handleMoveMusicalTab("공연중")}
              >
                현재 공연
              </MenuLink>
              <MenuLink
                type="button"
                onClick={() => handleMoveMusicalTab("공연예정")}
              >
                개막 예정
              </MenuLink>
              <MenuLink
                type="button"
                onClick={() => handleMoveMusicalTab("공연종료")}
              >
                공연 종료
              </MenuLink>
            </MenuColumn>

            <CommunityColumn>
              <MenuTitle>커뮤니티</MenuTitle>

              <CommunityGrid>
                <MenuLink
                  type="button"
                  onClick={() => handleMoveCommunityTab("자유게시판")}
                >
                  자유게시판
                </MenuLink>

                <MenuLink
                  type="button"
                  onClick={() => handleMoveCommunityTab("뮤지컬 후기")}
                >
                  뮤지컬 후기
                </MenuLink>

                <MenuLink
                  type="button"
                  onClick={() => handleMoveCommunityTab("같이봐요")}
                >
                  같이봐요
                </MenuLink>

                <MenuLink
                  type="button"
                  onClick={() => handleMoveCommunityTab("정보공유")}
                >
                  정보공유
                </MenuLink>

                <MenuLink
                  type="button"
                  onClick={() => handleMoveCommunityTab("공지사항")}
                >
                  공지사항
                </MenuLink>

                <MenuLink
                  type="button"
                  onClick={() => handleMoveCommunityTab("질문 글")}
                >
                  질문 글
                </MenuLink>
              </CommunityGrid>
            </CommunityColumn>
          </MenuSection>
        </TopSection>

        <BottomSection>
          <Copyright>© 2026 CURTAIN CALL. All rights reserved.</Copyright>

          <PolicyRow>
            <PolicyLink type="button">개인정보처리방침</PolicyLink>
            <PolicyLink type="button">이용약관</PolicyLink>
            <PolicyLink type="button">운영정책</PolicyLink>
          </PolicyRow>
        </BottomSection>
      </FooterInner>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  width: 100%;
  background: #0a0a0f;
  border-top: 1px solid #1b1f2a;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 34px 20px 18px;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 60px;
  padding-bottom: 26px;
`;

const BrandSection = styled.div`
  width: 280px;
  flex-shrink: 0;
`;

const BrandTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
`;

const BrandName = styled.h2`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: #f5f7fb;
`;

const BrandDescription = styled.p`
  margin: 0 0 18px 0;
  font-size: 12px;
  line-height: 1.7;
  color: #7f8aa3;
`;

const MenuSection = styled.div`
  display: flex;
  gap: 70px;
  flex: 1;
`;

const MenuColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 120px;
`;

const CommunityColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 260px;
`;

const MenuTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 13px;
  font-weight: 700;
  color: #f5f7fb;
`;

const MenuLink = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0 0 12px 0;
  text-align: left;
  font-size: 12px;
  line-height: 1.5;
  color: #7f8aa3;
  cursor: pointer;

  &:hover {
    color: #c9a84c;
  }
`;

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  column-gap: 28px;
  row-gap: 0;
`;

const BottomSection = styled.div`
  border-top: 1px solid #161b26;
  padding-top: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 11px;
  color: #5f6778;
`;

const PolicyRow = styled.div`
  display: flex;
  gap: 18px;
`;

const PolicyLink = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  font-size: 11px;
  color: #5f6778;
  cursor: pointer;

  &:hover {
    color: #c9a84c;
  }
`;

const LogoImage = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
`;
