import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./HeaderCss";
import { Search, ChevronDown, LogOut } from "lucide-react";
import logo from "../img/logo.png";

const Header = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user_info, setUserInfo] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  const isUserLoggedIn = !!user_info;

  const handleUserLogout = () => {
    localStorage.removeItem("user");
    setUserInfo(null);
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleSearch = () => {
    const keyword = searchKeyword.trim();
    if (!keyword) return;

    navigate("/musicals", { state: { searchKeyword: keyword } });
    setSearchKeyword("");
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
        {!isUserLoggedIn ? (
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
              <S.Avatar>
                {user_info.name ? user_info.name.charAt(0) : "U"}
              </S.Avatar>
              <span style={{ fontSize: "15px", fontWeight: "500" }}>
                {user_info.name}
              </span>
              <ChevronDown size={18} color="#666" />
            </S.ProfileToggle>

            {isMenuOpen && (
              <S.ProfileDropdown>
                <S.UserInfoSection>
                  <S.UserName>{user_info.name}</S.UserName>
                  <S.UserEmail>{user_info.email}</S.UserEmail>
                </S.UserInfoSection>

                <S.Divider />

                <S.LogoutButton onClick={handleUserLogout}>
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
