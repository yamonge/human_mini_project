// HeaderCss.js
import styled from "styled-components";

// 헤더 전체 컨테이너
export const HeaderContainer = styled.header`
  background-color: #121214; /* 배경색 */
  height: 80px; /* 높이 */
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: space-between; /* 양쪽 끝 정렬 */
  padding: 0 40px; /* 좌우 패딩 */
  border-bottom: 1px solid #232325; /* 하단 경계선 */
  color: white; /* 기본 글자색 */
  position: relative; /* 자식 요소의 절대 위치 지정을 위함 */
`;

/* --- 로고 섹션 --- */
export const LogoSection = styled.div`
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 12px; /* 아이템 간 간격 */
  cursor: pointer; /* 클릭 가능한 커서 */
`;

export const LogoIcon = styled.div`
  width: 40px; /* 너비 */
  height: 40px; /* 높이 */
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  color: #121214; /* 아이콘 색상 (실제로는 이미지라 배경색에 가까움) */

  img {
    width: 70px; /* 이미지 너비 */
    height: 70px; /* 이미지 높이 */
  }
`;

export const LogoText = styled.span`
  font-size: 20px; /* 글자 크기 */
  font-weight: 700; /* 글자 두께 */
  letter-spacing: 1.5px; /* 글자 간격 */
  color: #e5e5e5; /* 글자색 */
`;

/* --- 검색 섹션 --- */
export const SearchWrapper = styled.div`
  flex: 1; /* 남은 공간을 차지 */
  max-width: 580px; /* 최대 너비 */
  margin: 0 40px; /* 좌우 마진 */
  position: relative; /* 내부 아이콘의 절대 위치 지정을 위함 */

  svg {
    position: absolute; /* 절대 위치 */
    left: 18px; /* 왼쪽에서 18px */
    top: 50%; /* 상단에서 50% */
    transform: translateY(-50%); /* 세로 중앙 정렬 */
    color: #666; /* 아이콘 색상 */
  }
`;

export const SearchInput = styled.input`
  width: 100%; /* 너비 100% */
  background-color: #1c1c1e; /* 배경색 */
  border: 1px solid #333; /* 경계선 */
  border-radius: 50px; /* 둥근 모서리 */
  padding: 12px 20px 12px 50px; /* 패딩 (왼쪽은 아이콘 때문에 더 넓게) */
  color: white; /* 글자색 */
  font-size: 15px; /* 글자 크기 */
  outline: none; /* 포커스 시 외곽선 제거 */
  transition: border 0.2s; /* 경계선 변화 애니메이션 */

  &::placeholder {
    color: #555; /* 플레이스홀더 글자색 */
  }

  &:focus {
    border-color: #d4b56a; /* 포커스 시 경계선 색상 변경 */
  }
`;

/* --- 버튼/프로필 섹션 --- */
export const RightSection = styled.div`
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 12px; /* 아이템 간 간격 */
`;

export const LoginButton = styled.button`
  background: transparent; /* 배경 투명 */
  border: 1px solid #444; /* 경계선 */
  color: #ccc; /* 글자색 */
  padding: 10px 24px; /* 패딩 */
  border-radius: 50px; /* 둥근 모서리 */
  cursor: pointer; /* 클릭 가능한 커서 */
  font-size: 14px; /* 글자 크기 */
  &:hover {
    background: #1c1c1e; /* 호버 시 배경색 변경 */
  }
`;

export const SignupButton = styled.button`
  background-color: #d4b56a; /* 배경색 */
  border: none; /* 경계선 없음 */
  color: #000; /* 글자색 */
  padding: 10px 24px; /* 패딩 */
  border-radius: 50px; /* 둥근 모서리 */
  cursor: pointer; /* 클릭 가능한 커서 */
  font-size: 14px; /* 글자 크기 */
  font-weight: 600; /* 글자 두께 */
`;

/* --- 로그인 시 프로필 컨테이너 --- */
export const ProfileContainer = styled.div`
  position: relative; /* 자식 요소의 절대 위치 지정을 위함 */
`;

export const ProfileToggle = styled.button`
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 12px; /* 아이템 간 간격 */
  background-color: #1c1c1e; /* 배경색 */
  border: 1px solid #333; /* 경계선 */
  padding: 6px 16px 6px 6px; /* 패딩 */
  border-radius: 50px; /* 둥근 모서리 */
  cursor: pointer; /* 클릭 가능한 커서 */
  color: white; /* 글자색 */
  transition: background 0.2s; /* 배경색 변화 애니메이션 */

  &:hover {
    background-color: #252527; /* 호버 시 배경색 변경 */
  }
`;

export const Avatar = styled.div`
  width: 32px; /* 너비 */
  height: 32px; /* 높이 */
  background-color: #d4b56a; /* 배경색 */
  border-radius: 50%; /* 원형 */
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  color: #000; /* 글자색 */
  font-weight: bold; /* 글자 두께 */
  font-size: 14px; /* 글자 크기 */
`;

/* --- 프로필 상세보기 (Dropdown) --- */
export const ProfileDropdown = styled.div`
  position: absolute; /* 절대 위치 */
  top: 55px; /* 상단에서 55px */
  right: 0; /* 오른쪽 끝에 정렬 */
  width: 260px; /* 너비 */
  background-color: #121214; /* 배경색 */
  border: 1px solid #232325; /* 경계선 */
  border-radius: 20px; /* 둥근 모서리 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* 그림자 */
  overflow: hidden; /* 내용이 넘치면 숨김 */
  z-index: 100; /* 다른 요소 위에 표시 */
`;

export const UserInfoSection = styled.div`
  padding: 24px 20px; /* 패딩 */
`;

export const UserName = styled.div`
  font-size: 18px; /* 글자 크기 */
  font-weight: 600; /* 글자 두께 */
  margin-bottom: 4px; /* 하단 마진 */
`;

export const UserEmail = styled.div`
  font-size: 14px; /* 글자 크기 */
  color: #666; /* 글자색 */
`;

export const Divider = styled.div`
  height: 1px; /* 높이 */
  background-color: #232325; /* 배경색 */
  margin: 0 16px; /* 좌우 마진 */
`;

export const LogoutButton = styled.button`
  width: 100%; /* 너비 100% */
  padding: 20px; /* 패딩 */
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 12px; /* 아이템 간 간격 */
  color: #ff5c5c; /* 글자색 */
  background: none; /* 배경 투명 */
  border: none; /* 경계선 없음 */
  font-size: 18px; /* 글자 크기 */
  font-weight: 500; /* 글자 두께 */
  cursor: pointer; /* 클릭 가능한 커서 */
  text-align: left; /* 텍스트 왼쪽 정렬 */

  &:hover {
    background-color: #1c1c1e; /* 호버 시 배경색 변경 */
  }
`;
