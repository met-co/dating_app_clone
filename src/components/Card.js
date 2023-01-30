import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = ({ matchUser }) => {
  return (
    <StLink to={`/match/${matchUser.id}`} key={matchUser.id}>
      <StCard>
        <StImgContainer>
          <img src={matchUser.profile} />
        </StImgContainer>
        <StTextContainer>
          <div>{matchUser.nickName}</div>
        </StTextContainer>
      </StCard>
    </StLink>
  );
};

export default Card;

const StLink = styled(Link)`
  text-decoration: none;
`;

const StCard = styled.div`
  color: #333333;
  width: 240px;
  height: 360px;
`;

const StImgContainer = styled.div`
  width: 90%;
  height: 230px;
  margin: 0 auto;
  border-radius: 15px;
  & > img {
    width: 90%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }
`;

const StTextContainer = styled.div`
  padding-left: 15px;
  & > div:first-child {
    margin: 10px 0px 5px 0px;
    font-size: 20px;
  }
  & > div:nth-child(2) {
    font-weight: bold;
    margin: 5px 0px;
  }
  & > div:nth-child(3) {
    color: #868e96;
  }
`;
