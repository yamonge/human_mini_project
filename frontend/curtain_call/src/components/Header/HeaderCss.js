import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: #121214;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  border-bottom: 1px solid #232325;
  color: white;
  position: relative;
`;

/* --- 로고 섹션 --- */
export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

export const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #121214;

  img {
    width: 70px;
    height: 70px;
  }
`;

export const LogoText = styled.span`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #e5e5e5;
`;

/* --- 검색 섹션 --- */
export const SearchWrapper = styled.div`
  flex: 1;
  max-width: 580px;
  margin: 0 40px;
  position: relative;

  svg {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: #1c1c1e;
  border: 1px solid #333;
  border-radius: 50px;
  padding: 12px 20px 12px 50px;
  color: white;
  font-size: 15px;
  outline: none;
  transition: border 0.2s;

  &::placeholder {
    color: #555;
  }

  &:focus {
    border-color: #d4b56a;
  }
`;

/* --- 버튼/프로필 섹션 --- */
export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LoginButton = styled.button`
  background: transparent;
  border: 1px solid #444;
  color: #ccc;
  padding: 10px 24px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background: #1c1c1e;
  }
`;

export const SignupButton = styled.button`
  background-color: #d4b56a;
  border: none;
  color: #000;
  padding: 10px 24px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

/* --- 로그인 시 프로필 컨테이너 --- */
export const ProfileContainer = styled.div`
  position: relative;
`;

export const ProfileToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #1c1c1e;
  border: 1px solid #333;
  padding: 6px 16px 6px 6px;
  border-radius: 50px;
  cursor: pointer;
  color: white;
  transition: background 0.2s;

  &:hover {
    background-color: #252527;
  }
`;

export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background-color: #d4b56a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  font-size: 14px;
`;

/* --- 프로필 상세보기 (Dropdown) --- */
export const ProfileDropdown = styled.div`
  position: absolute;
  top: 55px;
  right: 0;
  width: 260px;
  background-color: #121214;
  border: 1px solid #232325;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 100;
`;

export const UserInfoSection = styled.div`
  padding: 24px 20px;
`;

export const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const UserEmail = styled.div`
  font-size: 14px;
  color: #666;
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #232325;
  margin: 0 16px;
`;

export const LogoutButton = styled.button`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ff5c5c;
  background: none;
  border: none;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #1c1c1e;
  }
`;
