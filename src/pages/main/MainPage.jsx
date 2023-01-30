import React, { useEffect, useState, useRef, useMemo } from "react";
import TinderCard from "react-tinder-card";
import Layout from "../../components/Layout";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import {
  __getUsersThunk,
  __userReset,
  __getMatchUsersThunk,
} from "../../redux/modules/userSlice";
import { useDispatch } from "react-redux";
import Card from "../../components/Card";

const MainPage = () => {
  const dispatch = useDispatch();
  const { users, isSuccess, matchUsers } = useSelector((state) => state.user);

  //////// simple code ///////

  //   const [lastDirection, setLastDirection] = useState();

  //   const swiped = (direction, swipedUserId) => {
  //     // if (direction === "right") {
  //     //   updateMatches(swipedUserId);
  //     // }
  //     setLastDirection(direction);
  //   };
  //   const outOfFrame = (name) => {
  //     console.log(name + " left the screen!");
  //   };

  /////////////////////////////////

  /////////////// Advanced code ///////////////////////
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(__getUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      // GET 되었을때 set
      setCurrentIndex(users.length - 1);
    }

    return () => {
      dispatch(__userReset());
    };
  }, [users, isSuccess, dispatch]);

  // 새로고침 했을 때 마운트 되기전에 useState에 안담겨서
  // undefined 발생
  // 로직 한번 생각하기

  const [lastDirection, setLastDirection] = useState("");
  // used for outOfFrame closure

  // currentIndex가 set되었을때 값 넣어야함
  // get 되기 전에 currentIndex를 가져와서 0이 들어감
  const currentIndexRef = useRef(currentIndex);

  // 값이 들어가는 때 : 무언가 변하거나 저장했을 때 값이 들어감
  // 예 : currentIndexRef에 값을 넣고 저장했을 때
  // 주석 쓰고 저장해도 값이 들어감 .....
  const childRefs = useMemo(
    () =>
      Array(users.length)
        .fill(0)
        .map((i) => React.createRef()),
    [users]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    console.log(currentIndex);
    currentIndexRef.current = val;
    console.log(currentIndexRef.current);
  };

  const canGoBack = currentIndex < users.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  // 이거는 버튼 클릭하고 스와이프 완료 되었을때 실행되는 함수
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    //
    if (canSwipe && currentIndex < users.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  /////////////////////////////////////////

  return (
    <Layout>
      <StContainer>
        {/*  내가 만든 코드 */}
        {/* <Stmain>
          <StInfo>
            <p>이름</p>
            <p>나이</p>
          </StInfo>
          <StBtn>
            <IconButton
              style={{
                color: "#ec5e6f",
                border: "1px solid #ec5e6f",
              }}
              sx={{ width: 60, height: 60 }}
            >
              <ClearIcon fontSize="large" />
            </IconButton>
            <IconButton
              style={{ color: "#76e2b3", border: "1px solid #76e2b3" }}
              sx={{ width: 60, height: 60 }}
            >
              <FavoriteIcon fontSize="large" />
            </IconButton>
          </StBtn>
        </Stmain> */}
        {/* ////////////////////////// */}

        {/* simple code */}
        {/* <>
          <Stdashboard>
            <StswipeContainer>
              <StcardContainer>
                {users?.map((user) => (
                  <Sttest>
                    <TinderCard
                      //   style={{ position: absolute }}
                      key={user.id}
                      onSwipe={(dir) => swiped(dir, user.id)}
                      onCardLeftScreen={() => outOfFrame(user.nickName)}
                    >
                      <StCard
                        style={{ backgroundImage: "url(" + user.profile + ")" }}
                      >
                        <h3>{user.nickName} username</h3>
                      </StCard>
                    </TinderCard>
                  </Sttest>
                ))}
                <div className="swipe-info">
                  {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                </div>
              </StcardContainer>
            </StswipeContainer>
          </Stdashboard>
        </> */}

        {/* /////////////////////////////////////////////// */}

        {/* Advanced code */}
        <div>
          <StchatBox>
            <Sttitle>
              <p>message</p>
            </Sttitle>
            <StchatList>
              {matchUsers.map((matchUser) => {
                return <Card key={matchUser.id} matchUser={matchUser} />;
              })}
              <div></div>
              <div></div>
              <div></div>
            </StchatList>
          </StchatBox>
        </div>
        <div>
          <link
            href="https://fonts.googleapis.com/css?family=Damion&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
            rel="stylesheet"
          />
          {/* <h1>React Tinder Card</h1> */}
          <StcardContainer>
            {users.map((character, index) => (
              <StTinderBox>
                <TinderCard
                  ref={childRefs[index]}
                  key={character.nickName}
                  onSwipe={(dir) => swiped(dir, character.nickName, index)}
                  onCardLeftScreen={() => outOfFrame(character.nickName, index)}
                >
                  <StCard
                    style={{
                      backgroundImage: "url(" + character.profile + ")",
                    }}
                  >
                    <h1>
                      {character.nickName}, {character.age}
                    </h1>
                  </StCard>
                </TinderCard>
              </StTinderBox>
            ))}
          </StcardContainer>
          <Stbuttons>
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("left")}
            >
              Swipe left!
            </button>
            {/* <button
              style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
              onClick={() => goBack()}
            >
              Undo swipe!
            </button> */}
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("right")}
            >
              Swipe right!
            </button>
          </Stbuttons>
          {lastDirection ? (
            <StinfoText key={lastDirection}>
              You swiped {lastDirection}
            </StinfoText>
          ) : (
            <StinfoText>
              Swipe a card or press a button to get Restore Card button visible!
            </StinfoText>
          )}
        </div>
      </StContainer>
    </Layout>
  );
};

export default MainPage;

const StContainer = styled.div`
  color: black;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div:first-child {
    width: 30%;
    height: 100%;
  }
  & > div:nth-child(2) {
    width: 70%;
    height: 100%;
  }
`;

const StcardContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StTinderBox = styled.div`
  position: absolute;
`;

const StCard = styled.div`
  position: relative;
  background-color: #fff;
  width: 80vw;
  max-width: 400px;
  height: 600px;
  box-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  & > h1 {
    position: absolute;
    bottom: 0;
    margin: 10px;
    color: #fff;
  }
`;

const Stbuttons = styled.div`
  margin: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  & > button {
    flex-shrink: 0;
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 18px;
    background-color: #9198e5;
    transition: 200ms;
    margin: 10px;
    font-weight: bolder;
    width: 160px;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    @media (max-width: 625px) {
      flex-direction: column;
    }
  }
`;

const StinfoText = styled.h3`
  width: 100%;
  justify-content: center;
  display: flex;
  color: black;
  animation-name: popup;
  animation-duration: 800ms;
`;

const StchatBox = styled.div`
  border-right: 1px solid #d5d5d5;
  height: 100vh;
`;

const Sttitle = styled.div`
  height: 140px;
  background: linear-gradient(to right, #ef4578, #ec6947);
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin: 0;
    font-size: 50px;
    color: white;
  }
`;

const StchatList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;

  div {
    border: 1px solid black;
    width: 80%;
    height: 50px;
  }
`;

// const Stdashboard = styled.div`
//   color: black;
// `;

// const StswipeContainer = styled.div`
//   width: 70%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const Stmain = styled.div`
//   color: black;
//   width: 400px;
//   height: 600px;
//   border: 1px solid black;
//   border-radius: 10px;
//   background-image: linear-gradient(
//       to bottom,
//       rgba(0, 0, 0, 0),
//       rgba(0, 0, 0, 0),
//       rgba(0, 0, 0, 0),
//       rgba(0, 0, 0, 0),
//       rgba(0, 0, 0, 1)
//     ),
//     url("https://images.unsplash.com/photo-1673894019491-4c569a62fdca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80");
//   background-position: center 30%;
//   background-size: cover;
// `;

// const StInfo = styled.div`
//   color: white;
//   height: 50px;
//   font-weight: 700;
//   margin-top: 420px;
//   padding: 0px 0px 50px 20px;
//   display: flex;
//   align-items: center;
//   gap: 15px;
//   & > p:first-child {
//     font-size: 40px;
//   }
//   & > p:nth-child(2) {
//     font-size: 25px;
//   }
// `;

// const StBtn = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin: 0px 70px 0px 70px;
// `;
