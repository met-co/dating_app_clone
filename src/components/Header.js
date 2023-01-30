import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <StContainer>
      <StLogo onClick={() => navigate("/")}>
        <img src="img/flame2.png" />
        {/* <p>PINDER</p> */}
      </StLogo>
      <Stlogin>
        <button onClick={() => navigate("/signin")}>로그인</button>
      </Stlogin>
    </StContainer>
  );
};

export default Header;

const StContainer = styled.div`
  position: sticky;
  top: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const StLogo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  & > img {
    width: 70px;
    height: 70px;
  }
  & > p {
    font-size: 40px;
    color: white;
  }
`;

const Stlogin = styled.div`
  & > button {
    width: 120px;
    height: 36px;
    background-color: #d9d9da;
    font-size: 19px;
    font-weight: 700;
    border: none;
    border-radius: 20px;
    cursor: pointer;
  }
`;
