import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <StWrap>{children}</StWrap>;
};
export default Layout;

const StWrap = styled.div`
  font-family: "Ubuntu", sans-serif;
  min-width: 400px;
  height: 100vh;
  margin: 0 auto;
  /* background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url("https://images.unsplash.com/photo-1524601500432-1e1a4c71d692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2748&q=80");
  background-position: center 30%;
  background-size: cover; */
`;
