import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = ({ matchUser }) => {
  return (
    <StLink to={`/match/${matchUser.roomId}`} key={matchUser.id}>
      <StCard>
        <StImgContainer>
          <img src={matchUser.profile} />
        </StImgContainer>
        <StTextContainer>
          <div>{matchUser.nickName}</div>
          <div>{matchUser.age}</div>
          <div>{matchUser.distance}</div>
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
  border: 1px solid #9198e5;
  width: 300px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  gap: 50px;
`;

const StImgContainer = styled.div`
  width: 30%;
  margin: 0 auto;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  padding-left: 15px;
  & > img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    object-fit: cover;
  }
`;

const StTextContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
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
