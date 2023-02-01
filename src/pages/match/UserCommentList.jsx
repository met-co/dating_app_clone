import React from "react";
import styled from "styled-components";
import UserCommentListItem from "./UserCommentListItem";

const UserCommentList = ({
  comments,
  onClickDelete,
  onClickModify,
  matchRooms,
}) => {
  return (
    <StContainer>
      {comments &&
        comments.map((comment) => (
          <UserCommentListItem
            key={comment.commentId}
            comment={comment}
            onClickDelete={onClickDelete}
            onClickModify={onClickModify}
            matchRooms={matchRooms}
          />
        ))}
    </StContainer>
  );
};

export default UserCommentList;

const StContainer = styled.div`
  width: 60%;
  height: 400px;
  overflow: scroll;
  border: 1px solid #dcdcdc;
  padding: 15px;
`;
