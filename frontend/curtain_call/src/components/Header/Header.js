import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as S from "./HeaderCss";
import { Search, ChevronDown, LogOut } from "lucide-react";
import logo from "../img/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isLoggedIn = !!user;

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("user"); // 저장된 정보 삭제
    setUser(null);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <S.HeaderContainer>
      {/* 1. 로고 섹션 (기존과 동일) */}
      <S.LogoSection onClick={() => navigate("/")}>
        <S.LogoIcon>
          <img src={logo} alt="로고" />
        </S.LogoIcon>
        <S.LogoText>CURTAIN CALL</S.LogoText>
      </S.LogoSection>

      {/* 2. 검색 섹션 (기존과 동일) */}
      <S.SearchWrapper>
        <Search size={20} />
        <S.SearchInput placeholder="뮤지컬명을 입력하세요" />
      </S.SearchWrapper>

      {/* 3. 우측 섹션 - 데이터 바인딩 부분 수정 */}
      <S.RightSection>
        {!isLoggedIn ? (
          <>
            <S.LoginButton onClick={() => navigate("/login")}>
              로그인
            </S.LoginButton>
            <S.SignupButton onClick={() => navigate("/signup")}>
              회원가입
            </S.SignupButton>
          </>
        ) : (
          <S.ProfileContainer>
            <S.ProfileToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {/* 이름의 첫 글자만 추출 (예: 김민지 -> 김) */}
              <S.Avatar>{user.name ? user.name.charAt(0) : "U"}</S.Avatar>
              <span style={{ fontSize: "15px", fontWeight: "500" }}>
                {user.name}
              </span>
              <ChevronDown size={18} color="#666" />
            </S.ProfileToggle>

            {isMenuOpen && (
              <S.ProfileDropdown>
                <S.UserInfoSection>
                  <S.UserName>{user.name}</S.UserName>
                  <S.UserEmail>{user.email}</S.UserEmail>
                </S.UserInfoSection>

                <S.Divider />

                <S.LogoutButton onClick={handleLogout}>
                  <LogOut size={20} />
                  <span>로그아웃</span>
                </S.LogoutButton>
              </S.ProfileDropdown>
            )}
          </S.ProfileContainer>
        )}
      </S.RightSection>
    </S.HeaderContainer>
  );
};

export default Header;
