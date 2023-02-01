import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = ({ matchUser }) => {
  console.log(matchUser);
  return (
    <StLink to={`/match/${matchUser.roomId}`} key={matchUser.id}>
      <StCard>
        <StImgContainer>
          <img src={matchUser.profile} />
        </StImgContainer>
        <StTextContainer>
          <div>{matchUser.nickName}</div>
          <div>{matchUser.age}세</div>
          <div>{matchUser.distance}km</div>
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
  width: 270px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
`;

const StImgContainer = styled.div`
  /* margin: 0 auto; */
  border-radius: 15px;
  display: flex;
  justify-content: center;
  & > img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    object-fit: cover;
  }
`;

const StTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  & > div:first-child {
    font-size: 20px;
  }
  & > div:nth-child(2) {
    color: #868e96;
  }
  & > div:nth-child(3) {
    color: #868e96;
  }
`;
