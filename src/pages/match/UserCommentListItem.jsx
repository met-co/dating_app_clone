import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { gTheme } from "../../theme/globalTheme";

const UserCommentListItem = ({
  comment,
  onClickDelete,
  onClickModify,
  matchRooms,
}) => {
  const [isModifyComment, setIsModifyComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const onClickModifyCancel = (event) => {
    event.stopPropagation();
    toggleModifyComment();
  };

  const onClickModifyHandler = (event) => {
    event.stopPropagation();
    onClickModify({ comment: commentText, commentId: comment.commentId });
    toggleModifyComment();
  };

  const onClickDeleteHandler = (event) => {
    event.stopPropagation();
    onClickDelete(comment.commentId);
  };

  const onClickModifyToggleHandler = (event) => {
    event.stopPropagation();
    toggleModifyComment();
  };

  const onChangeModifyComment = (event) => {
    setCommentText(event.target.value);
  };

  function toggleModifyComment() {
    setIsModifyComment((prev) => !prev);
  }

  const dateString = (comment) => {
    const date = new Date(comment.createdAt);
    return `${date.toLocaleString()}`;
  };

  useEffect(() => {
    setCommentText(comment.content);
  }, []);

  return (
    <SWrapper>
      <SCommentContainer>
        {isModifyComment ? (
          <>
            <SCommentTextField
              height={30}
              value={commentText}
              onChange={onChangeModifyComment}
            />
            <>
              <IconButton
                sx={{ color: "lightgray" }}
                onClick={onClickModifyCancel}
              >
                <CloseIcon />
              </IconButton>
              <IconButton
                sx={{ color: gTheme.color.primary }}
                onClick={onClickModifyHandler}
              >
                <DoneIcon />
              </IconButton>
            </>
          </>
        ) : (
          <>
            <StUserContainer>
              <StimgBox>
                <img src={matchRooms.myProfile} />
              </StimgBox>
              <StnicknameBox>
                <p>{matchRooms.myName}</p>
              </StnicknameBox>
            </StUserContainer>
            <StContentBox>
              <SContentText>{comment.content}</SContentText>
              <StDate>{dateString(comment)}</StDate>
            </StContentBox>
            <SCommentActions>
              {comment.status && (
                <>
                  <IconButton
                    sx={{ color: "lightgray" }}
                    onClick={onClickModifyToggleHandler}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: "lightgray" }}
                    onClick={onClickDeleteHandler}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </SCommentActions>
          </>
        )}
      </SCommentContainer>
    </SWrapper>
  );
};

export default UserCommentListItem;

/* Style */
const SWrapper = styled.div`
  width: 100%;
  /* padding: 13px 0px 0px 0px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 40px;
  border-top: 1px solid rgb(240, 240, 240);
`;

const SCommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  height: 80px;
`;

const SCommentTextField = styled(TextField)`
  width: 100%;
`;

const SCommentActions = styled.div`
  width: 13%;
  display: flex;
`;

const SContentText = styled.div`
  width: 100%;
  font-size: 16px;
  white-space: pre-wrap;
  padding-left: 10px;
`;

const StimgBox = styled.div`
  & > img {
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
`;

const StnicknameBox = styled.div`
  p {
    margin: 0;
  }
`;

const StUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
  border-right: 1px solid #dcdcdc;
`;

const StDate = styled.div`
  color: #a3a0a0;
`;

const StContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 10px;
`;
