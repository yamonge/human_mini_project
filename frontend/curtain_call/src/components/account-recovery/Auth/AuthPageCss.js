import styled, { css } from "styled-components";

export const LoginContainer = styled.div`
  width: 420px;
  background-color: #111118;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  padding: 20px 30px;
  color: #f0f0f0;
  font-family: "Arial", sans-serif;
  position: absolute; /* 절대 위치 지정 */
  left: 50%; /* 왼쪽에서 50% 지점 */
  transform: translateX(-50%); /* X축으로만 중앙 정렬 */

  /* min-height를 각 탭의 실제 내용 길이에 따라 조절할 수 있도록 합니다.
     여기서는 가장 긴 탭(비밀번호 찾기)의 최대 높이를 기준으로 min-height를 설정하여
     아이디 찾기 탭도 그 높이를 유지하게 하여 상단이 움직이지 않도록 합니다. */
  min-height: 400px; /* 비밀번호 찾기 탭의 내용을 충분히 수용할 수 있는 높이 (필요에 따라 조절) */
  /* height: auto; /* 콘텐츠에 따라 높이가 자동으로 조절되도록 */

  display: flex;
  flex-direction: column;
  box-sizing: border-box; /* padding이 width에 포함되도록 */

  /* height 변화에 애니메이션 효과 추가 */
  transition: min-height 0.3s ease-out; /* min-height 변화에 transition 적용 */

  /* 만약 내용이 많아져서 min-height를 초과할 경우 스크롤을 허용할 수 있도록 */
  max-height: 90vh;
  overflow-y: auto;
`;

export const Header = styled.div`
  margin-bottom: 20px;
  text-align: center; /* 헤더 텍스트도 중앙 정렬 */
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #888;
  line-height: 1.4; /* 줄 간격 추가 */
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #f0f0f0;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  background-color: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 12px 0;
  background-color: transparent;
  border: none;
  color: #f0f0f0;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  ${(props) =>
    props.active &&
    css`
      background-color: #c9a84c;
      color: #111118;
    `}

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.active ? "#e0b94b" : "#3a3a3a")};
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const FormDescription = styled.p`
  font-size: 14px;
  color: #ccc;
  margin-bottom: 20px;
  margin-top: -5px;
`;

export const FindForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const InputGroup = styled.div`
  margin-bottom: 25px; /* 에러 메시지 공간을 포함하여 여유있게 조정 */
  position: relative;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #ccc;
`;

export const FindInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  background-color: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  color: #f0f0f0;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d4af37;
  }

  ${(props) =>
    props.validationStatus === "valid" &&
    css`
      border-color: green;
    `}

  ${(props) =>
    props.validationStatus === "invalid" &&
    css`
      border-color: red;
    `}
`;

export const ErrorMessage = styled.p`
  font-size: 12px;
  position: absolute;
  bottom: -33px;

  /* ❌ 기존 */
  /* left: 0; */

  /* ✅ 수정 (우측 정렬) */
  right: 0;

  color: ${(props) => props.color || "red"};
  min-height: 14px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  font-size: 14px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  margin-top: 5px; /* 버튼 상단 마진 */

  ${(props) =>
    props.outline
      ? css`
          background-color: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
          &:hover {
            background-color: #333;
            border-color: #f0f0f0;
          }
        `
      : css`
          background-color: #c9a84c;
          border: none;
          color: #1e1e1e;
          &:hover {
            background-color: #e0b94b;
          }
        `}
`;

export const ReturnToLoginLink = styled.a`
  display: block;
  text-align: center;
  margin-top: auto;
  padding-top: 20px;
  font-size: 12px;
  color: #888;
  text-decoration: none;
  cursor: pointer; /* 클릭 가능한 요소임을 명시 */
  &:hover {
    text-decoration: underline;
  }
`;

export const FooterText = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 12px;
  color: #666;
`;

// --- 아이디 찾기 결과 화면 관련 스타일 ---

export const ResultIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-style: none;
  border-radius: 50%;
  margin: 0 auto 20px; /* 상단 마진을 0으로 설정하여 위로 이동 방지 */
  background-color: rgba(255, 255, 255, 0.1); /* 기본 색상 */
`;

export const ResultIconSuccess = styled.div`
  width: 24px;
  height: 24px;
  background-color: #c9a84c;
  mask: url("/icons/check_circle.svg") no-repeat center / contain; /* SVG 아이콘 경로 */
  -webkit-mask: url("/icons/check_circle.svg") no-repeat center / contain;
`;

export const ResultIconFail = styled.div`
  width: 30px;
  height: 30px;
  background-color: #111118;
  mask: url("/icons/close_circle.svg") no-repeat center / contain; /* SVG 아이콘 경로 */
  -webkit-mask: url("/icons/close_circle.svg") no-repeat center / contain;
`;

export const ResultTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
`;

export const ResultSubtitle = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  text-align: center;
  margin-bottom: 15px;
  line-height: 1.4;
`;

export const ResultInfoGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 12px 15px;
  margin-bottom: 10px; /* 이미지 간격 조절 */
  position: relative;
`;

export const ResultInfoLabel = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
`;

export const ResultInfoValue = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) =>
    props.isValue ? "rgb(201, 168, 76)" : "rgba(255, 255, 255, 0.55)"};
`;

export const SocialLoginText = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #c9a84c; /* 이미지의 '소셜 가입 제외' 색상과 유사하게 */
  background-color: rgba(201, 168, 76, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
`;

export const ResultButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* 버튼 사이 간격 */
  margin-top: 10px;
`;

export const ResultButton = styled(Button)``; // 기존 Button 스타일 재활용

export const InfoBox = styled.div`
  background-color: rgba(
    251,
    44,
    54,
    0.05
  ); /* 이미지의 빨간색 박스와 유사한 배경색 */
  border: 1px solid #5a2e2e; /* 테두리 색상 */
  border-radius: 8px;
  padding: 15px;
  margin-top: px;
  margin-bottom: 10px;
`;

export const InfoBoxTitle = styled.p`
  font-size: 14px;
  color: #f0f0f0;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const InfoBoxList = styled.ul`
  list-style: none; /* 기본 리스트 스타일 제거 */
  padding: 0;
  margin: 0;
`;

export const InfoBoxListItem = styled.li`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35); /* 밝은 회색 텍스트 */
  margin-bottom: 8px;
  position: relative;
  padding-left: 15px; /* 불릿 포인트 공간 */

  &::before {
    content: "•"; /* 커스텀 불릿 포인트 */
    color: #c9a84c; /* 불릿 포인트 색상 */
    position: absolute;
    left: 0;
    top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
