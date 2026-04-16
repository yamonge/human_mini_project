import { Outlet } from "react-router-dom";

import styled from "styled-components";
import Header from "./components/Header/Header";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainLayout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
};

export default MainLayout;
