import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LoginContainer,
  Header,
  Title,
  CloseButton,
  TabContainer,
  TabButton,
  FormDescription,
  FindForm,
  InputGroup,
  Label,
  FindInput,
  Button,
  ErrorMessage,
} from "./AuthPageCss";
import AxiosApi from "../../../api/AxiosApi";

const FindAccount = () => {
  const location = useLocation();

  // 현재 활성화된 탭 상태 ('id' 또는 'password'), URL state에서 가져오거나 기본값 'id'
  const [activeTab, setActiveTab] = useState(location.state?.tab || "id");

  // 아이디 찾기 탭에서 사용할 사용자 이름 상태
  const [id_name, setId_name] = useState("");
  // 아이디 찾기 탭에서 사용할 사용자 생년월일 상태
  const [birth_date, setBirth_date] = useState("");

  // 비밀번호 찾기 탭에서 사용할 사용자 이름 상태
  const [pw_name, setPw_name] = useState("");
  // 비밀번호 찾기 탭에서 사용할 사용자 이메일 상태
  const [email, setEmail] = useState("");

  // 페이지 이동을 위한 useNavigate 훅 사용
  const navigate = useNavigate();

  // 이름 유효성 검사 함수 (2자 이상)
  const validateName = (value) => value.length >= 2;
  // 이메일 유효성 검사 함수
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  // 생년월일 유효성 검사 함수 (YYYY-MM-DD 형식)
  const validateBirth_date = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);

  // ✅ 탭 변경 핸들러 (입력 필드 초기화 포함)
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // 탭 변경 시 모든 입력 필드 초기화
    setId_name("");
    setBirth_date("");
    setPw_name("");
    setEmail("");
  };

  // ✅ 아이디 찾기 폼 제출 핸들러
  const handleFindId = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    // 1. 빈값 체크
    if (!id_name || !birth_date) {
      alert("모든 항목을 입력해주세요");
      return;
    }
    // 2. 형식 체크
    if (!validateName(id_name) || !validateBirth_date(birth_date)) {
      alert("입력 형식을 확인해주세요");
      return;
    }

    // 3. 정상적인 경우 (실제로는 서버 통신 필요)
    // TODO: userData 객체 생성
    const userData = {
      name: id_name,
      birthDate: birth_date,
    };

    // TODO: API 호출
    const response = await AxiosApi.findId(userData);
    if (response.success) {
      navigate("/id-result", {
        state: {
          isSuccess: true,
          email: response.data.email,
          createdAt: response.data.createdAt,
        },
      });
    } else {
      navigate("/id-result", {
        state: { isSuccess: false },
      });
    }
  };

  // ✅ 비밀번호 찾기 폼 제출 핸들러
  const handleFindPw = async (e) => {
    e.preventDefault();

    if (!pw_name || !email) {
      alert("모든 항목을 입력해주세요");
      return;
    }

    if (!validateName(pw_name) || !validateEmail(email)) {
      alert("입력 형식을 확인해주세요.");
      return;
    }

    const userData = {
      name: pw_name,
      email: email,
    };

    const response = await AxiosApi.findPw(userData);
    if (response.success) {
      navigate("/password-result", {
        state: { isSuccess: true },
      });
    } else {
      navigate("/password-result", {
        state: { isSuccess: false },
      });
    }
  };

  return (
    <LoginContainer>
      <Header>
        {/* 현재 활성화된 탭에 따라 제목 변경 */}
        <Title>{activeTab === "id" ? "아이디 찾기" : "비밀번호 찾기"}</Title>
        {/* 닫기 버튼 클릭 시 로그인 페이지로 이동 */}
        <CloseButton onClick={() => navigate("/login")}>&times;</CloseButton>
      </Header>

      <TabContainer>
        {/* 아이디 찾기 탭 버튼 */}
        <TabButton
          active={activeTab === "id"}
          onClick={() => handleTabChange("id")}
        >
          아이디 찾기
        </TabButton>
        {/* 비밀번호 찾기 탭 버튼 */}
        <TabButton
          active={activeTab === "password"}
          onClick={() => handleTabChange("password")}
        >
          비밀번호 찾기
        </TabButton>
      </TabContainer>

      {/* 아이디 찾기 폼 (activeTab이 'id'일 때만 렌더링) */}
      {activeTab === "id" && (
        <FindForm onSubmit={handleFindId}>
          <FormDescription>이름과 생년월일을 입력해주세요</FormDescription>

          <InputGroup>
            <Label>이름</Label>
            <FindInput
              value={id_name} // id_name 상태와 바인딩
              onChange={(e) => setId_name(e.target.value)} // 변경 핸들러
              validationStatus={
                id_name === ""
                  ? null
                  : validateName(id_name)
                    ? "valid"
                    : "invalid"
              }
              placeholder="이름을 입력해주세요"
            />
            <ErrorMessage
              color={
                id_name === ""
                  ? "transparent"
                  : validateName(id_name)
                    ? "green"
                    : "red"
              }
            >
              {id_name === ""
                ? ""
                : validateName(id_name)
                  ? "올바른 이름입니다"
                  : "이름은 2자 이상 입력해주세요"}
            </ErrorMessage>
          </InputGroup>

          <InputGroup>
            <Label>생년월일</Label>
            <FindInput
              type="date"
              value={birth_date} // birth_date 상태와 바인딩
              onChange={(e) => setBirth_date(e.target.value)} // 변경 핸들러
              validationStatus={
                birth_date === ""
                  ? null
                  : validateBirth_date(birth_date)
                    ? "valid"
                    : "invalid"
              }
            />
            <ErrorMessage
              color={
                birth_date === ""
                  ? "transparent"
                  : validateBirth_date(birth_date)
                    ? "green"
                    : "red"
              }
            >
              {birth_date === ""
                ? ""
                : validateBirth_date(birth_date)
                  ? "올바른 형식입니다"
                  : "YYYY-MM-DD 형식으로 입력해주세요"}
            </ErrorMessage>
          </InputGroup>

          <Button type="submit">아이디 찾기</Button>
        </FindForm>
      )}

      {/* 비밀번호 찾기 폼 (activeTab이 'password'일 때만 렌더링) */}
      {activeTab === "password" && (
        <FindForm onSubmit={handleFindPw}>
          <FormDescription>이름과 이메일을 입력해주세요</FormDescription>

          <InputGroup>
            <Label>이름</Label>
            <FindInput
              value={pw_name} // pw_name 상태와 바인딩
              onChange={(e) => setPw_name(e.target.value)} // 변경 핸들러
              validationStatus={
                pw_name === ""
                  ? null
                  : validateName(pw_name)
                    ? "valid"
                    : "invalid"
              }
              placeholder="이름을 입력해주세요"
            />
            <ErrorMessage
              color={
                pw_name === ""
                  ? "transparent"
                  : validateName(pw_name)
                    ? "green"
                    : "red"
              }
            >
              {pw_name === ""
                ? ""
                : validateName(pw_name)
                  ? "올바른 이름입니다"
                  : "이름은 2자 이상 입력해주세요"}
            </ErrorMessage>
          </InputGroup>

          <InputGroup>
            <Label>이메일</Label>
            <FindInput
              value={email} // email 상태와 바인딩
              onChange={(e) => setEmail(e.target.value)} // 변경 핸들러
              validationStatus={
                email === "" ? null : validateEmail(email) ? "valid" : "invalid"
              }
              placeholder="이메일을 입력해주세요"
            />
            <ErrorMessage
              color={
                email === ""
                  ? "transparent"
                  : validateEmail(email)
                    ? "green"
                    : "red"
              }
            >
              {email === ""
                ? ""
                : validateEmail(email)
                  ? "올바른 이메일입니다"
                  : "이메일 형식이 아닙니다"}
            </ErrorMessage>
          </InputGroup>

          <Button type="submit">인증코드 보내기</Button>
        </FindForm>
      )}
    </LoginContainer>
  );
};

export default FindAccount;
