import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <Stimg>
      <Layout>
        <Header />
        <StContainer>
          <p>오른쪽으로 스와이프</p>
          <button onClick={() => navigate("/signup")}>계정 만들기</button>
        </StContainer>
      </Layout>
    </Stimg>
  );
};

export default WelcomePage;

const Stimg = styled.div`
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url("https://images.unsplash.com/photo-1524601500432-1e1a4c71d692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2748&q=80");
  background-position: center 30%;
  background-size: cover;
`;

const StContainer = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    font-size: 116px;
    font-weight: 800;
    color: white;
    margin: 0 0 20px 0;
    @media screen and (max-width: 985px) {
      font-size: 70px;
    }
    @media screen and (max-width: 595px) {
      font-size: 50px;
    }
  }
  button {
    font-size: 19px;
    font-weight: 700;
    border: none;
    width: 260px;
    height: 44px;
    border-radius: 30px;
    background: linear-gradient(to right, #ef4578, #cb594b);
    opacity: 0.8;
    color: white;
    cursor: pointer;
  }
`;
