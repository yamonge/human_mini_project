import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FindIdResult = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSuccess = location.state?.isSuccess ?? false;

  return (
    <div>
      <h2>{isSuccess ? "아이디 찾기 성공" : "아이디 찾기 실패"}</h2>

      {isSuccess ? (
        <button onClick={() => navigate("/login")}>로그인</button>
      ) : (
        <button onClick={() => navigate("/account-recovery")}>다시 시도</button>
      )}
    </div>
  );
};

export default FindIdResult;
