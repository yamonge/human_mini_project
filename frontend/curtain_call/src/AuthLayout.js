import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  background-color: #0b0c13;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default AuthLayout;
