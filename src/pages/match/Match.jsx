import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getMatchRoomThunk } from "../../redux/modules/userSlice";
import Layout from "../../components/Layout";
import styled from "styled-components";
import { gTheme } from "../../theme/globalTheme";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UserCommentList from "./UserCommentList";
import { __getComments } from "../../redux/modules/commentSlice";
import { __submitComment } from "../../redux/modules/commentSlice";
import { __deleteComment } from "../../redux/modules/commentSlice";
import { __modifyComment } from "../../redux/modules/commentSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { border } from "@mui/system";

const Match = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { isSuccess, matchRooms, matchUsers } = useSelector(
    (state) => state.user
  );
  console.log(matchRooms);
  const commentsData = useSelector((state) => state.comment.comments);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  console.log(commentsData);

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    // const date = new Date(commentsData.createdAt);
    // console.log(date);
    let commentData = {
      content: comment,
      roomId: Number(roomId),
    };
    dispatch(__submitComment(commentData));
    setComment("");
  };

  const handleCommentDelete = (commentId) => {
    dispatch(__deleteComment(commentId));
  };

  const handleCommentModify = (data) => {
    const payload = { comment: data.comment, commentId: data.commentId };
    dispatch(__modifyComment(payload));
  };

  useEffect(() => {
    dispatch(__getMatchRoomThunk(roomId));
    dispatch(__getComments(roomId));
  }, [dispatch]);

  useEffect(() => {
    setComments(commentsData);
  }, [commentsData]);

  return (
    <Layout>
      <StContainer>
        <StArrow>
          <ArrowBackIosNewIcon
            // sx={{ mt: 10, ml: 10 }}
            onClick={() => navigate("/main")}
          />
        </StArrow>
        <StImageContainer>
          <img src={matchRooms.yourProfile} />
        </StImageContainer>
        <StUserInfo>
          <StUserName>{matchRooms.yourName}</StUserName>
        </StUserInfo>
        <StCommentContainer>
          <StCommentInputContainer>
            <UserCommentList
              comments={comments}
              onClickDelete={handleCommentDelete}
              onClickModify={handleCommentModify}
              matchRooms={matchRooms}
            />
            <StCommentTextField
              id="outlined-basic"
              label="댓글"
              variant="outlined"
              value={comment}
              onChange={onChangeComment}
            />
            <StCommentRegistration
              variant="contained"
              sx={{ ml: 1, bgcolor: gTheme.color.primary }}
              onClick={handleCommentSubmit}
            >
              등록
            </StCommentRegistration>
          </StCommentInputContainer>
        </StCommentContainer>
      </StContainer>
    </Layout>
  );
};

export default Match;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const StImageContainer = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    border-radius: 10px;
    width: 200px;
    height: 250px;
    object-fit: cover;
  }
`;

const StUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0px;
`;

const StUserName = styled.div`
  font-size: 30px;
`;

const StCommentContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500px;
`;

const StCommentInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #dcdcdc; */
  height: 500px;
  gap: 20px;
`;

const StCommentTextField = styled(TextField)`
  width: 60%;
  height: 55px;
`;

const StCommentRegistration = styled(Button)`
  height: 53px;
  width: 30%;
`;

const StArrow = styled.div`
  width: 50px;
  height: 50px;
  margin: 100px 0px 0px 110px;
  cursor: pointer;
`;
