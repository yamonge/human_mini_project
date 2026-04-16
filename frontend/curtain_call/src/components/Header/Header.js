import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./HeaderCss";
import { Search, ChevronDown, LogOut } from "lucide-react";
import logo from "../img/logo.png";
import { musicalMockData } from "../PRO/MusicalList";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleSearch = () => {
    const keyword = searchKeyword.trim().toLowerCase();

    if (!keyword) return;

    const matchedMusical = musicalMockData.find((musical) =>
      String(musical.title || "")
        .toLowerCase()
        .includes(keyword),
    );

    if (matchedMusical) {
      navigate(`/musicals/${matchedMusical.musicalId}`);
      setSearchKeyword("");
      return;
    }

    alert("일치하는 뮤지컬을 찾을 수 없습니다.");
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <S.HeaderContainer>
      <S.LogoSection onClick={() => navigate("/")}>
        <S.LogoIcon>
          <img src={logo} alt="로고" />
        </S.LogoIcon>
        <S.LogoText>CURTAIN CALL</S.LogoText>
      </S.LogoSection>

      <S.SearchWrapper>
        <Search
          size={20}
          style={{ cursor: "pointer" }}
          onClick={handleSearch}
        />
        <S.SearchInput
          placeholder="뮤지컬명을 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
      </S.SearchWrapper>

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
