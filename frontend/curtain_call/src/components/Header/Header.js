// Header.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./HeaderCss";
import { Search, ChevronDown, LogOut } from "lucide-react";
import logo from "../img/logo.png";
import { musicalMockData } from "../PRO/MusicalList";

const Header = () => {
  const navigate = useNavigate();
  // 메뉴(드롭다운) 열림/닫힘 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 사용자 정보 상태 관리 (초기값: null)
  const [user_info, setUserInfo] = useState(null); // user_info로 컬럼명 수정

  // 컴포넌트 마운트 시 로컬 스토리지에서 사용자 정보 로드
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // JSON 문자열을 객체로 파싱하여 user_info 상태에 저장
      setUserInfo(JSON.parse(storedUser));
    }
  }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때 한 번만 실행됨을 의미

  // 사용자 로그인 여부 확인 (user_info 객체가 존재하면 로그인 상태)
  const isUserLoggedIn = !!user_info; // isLoggedIn 대신 isUserLoggedIn으로 컬럼명 수정

  // 로그아웃 함수
  const handleUserLogout = () => {
    // handleLogout 대신 handleUserLogout으로 컬럼명 수정
    localStorage.removeItem("user"); // 로컬 스토리지에서 사용자 정보 삭제
    setUserInfo(null); // user_info 상태를 null로 설정
    setIsMenuOpen(false); // 메뉴 닫기
    navigate("/"); // 홈페이지로 이동
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
    // 헤더 컨테이너
    <S.HeaderContainer>
      {/* 1. 로고 섹션 */}
      {/* 로고 클릭 시 홈페이지로 이동 */}
      <S.LogoSection onClick={() => navigate("/")}>
        {/* 로고 아이콘 */}
        <S.LogoIcon>
          <img src={logo} alt="로고" />
        </S.LogoIcon>
        {/* 로고 텍스트 */}
        <S.LogoText>CURTAIN CALL</S.LogoText>
      </S.LogoSection>

      {/* 2. 검색 섹션 */}
      <S.SearchWrapper>
        {/* 검색 아이콘 */}
        <Search size={20} />
        {/* 검색 입력 필드 */}
        <S.SearchInput placeholder="뮤지컬명을 입력하세요" />
      </S.SearchWrapper>

      {/* 3. 우측 섹션 - 로그인/회원가입 버튼 또는 프로필 정보 */}
      <S.RightSection>
        {/* 사용자가 로그인하지 않았을 경우 */}
        {!isUserLoggedIn ? (
          <>
            {/* 로그인 버튼: 클릭 시 로그인 페이지로 이동 */}
            <S.LoginButton onClick={() => navigate("/login")}>
              로그인
            </S.LoginButton>
            {/* 회원가입 버튼: 클릭 시 회원가입 페이지로 이동 */}
            <S.SignupButton onClick={() => navigate("/signup")}>
              회원가입
            </S.SignupButton>
          </>
        ) : (
          // 사용자가 로그인했을 경우 프로필 컨테이너 렌더링
          <S.ProfileContainer>
            {/* 프로필 토글 버튼: 클릭 시 드롭다운 메뉴 열림/닫힘 */}
            <S.ProfileToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {/* 사용자 이름의 첫 글자를 아바타로 표시 */}
              <S.Avatar>
                {user_info.name ? user_info.name.charAt(0) : "U"}
              </S.Avatar>{" "}
              {/* user 대신 user_info로 컬럼명 수정 */}
              {/* 사용자 이름 표시 */}
              <span style={{ fontSize: "15px", fontWeight: "500" }}>
                {user_info.name} {/* user 대신 user_info로 컬럼명 수정 */}
              </span>
              {/* 아래쪽 화살표 아이콘 */}
              <ChevronDown size={18} color="#666" />
            </S.ProfileToggle>

            {/* isMenuOpen이 true일 때만 프로필 드롭다운 메뉴 렌더링 */}
            {isMenuOpen && (
              <S.ProfileDropdown>
                {/* 사용자 정보 섹션 */}
                <S.UserInfoSection>
                  {/* 사용자 이름 */}
                  <S.UserName>{user_info.name}</S.UserName>{" "}
                  {/* user 대신 user_info로 컬럼명 수정 */}
                  {/* 사용자 이메일 */}
                  <S.UserEmail>{user_info.email}</S.UserEmail>{" "}
                  {/* user 대신 user_info로 컬럼명 수정 */}
                </S.UserInfoSection>

                {/* 구분선 */}
                <S.Divider />

                {/* 로그아웃 버튼: 클릭 시 로그아웃 함수 호출 */}
                <S.LogoutButton onClick={handleUserLogout}>
                  {" "}
                  {/* handleLogout 대신 handleUserLogout으로 컬럼명 수정 */}
                  {/* 로그아웃 아이콘 */}
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
