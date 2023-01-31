import React from "react";
import styled from "styled-components";
import UserCommentListItem from "./UserCommentListItem";

const UserCommentList = ({ comments, onClickDelete, onClickModify }) => {
  return (
    <StContainer>
      {comments &&
        comments.map((comment) => (
          <UserCommentListItem
            key={comment.id}
            comment={comment}
            onClickDelete={onClickDelete}
            onClickModify={onClickModify}
          />
        ))}
    </StContainer>
  );
};

export default UserCommentList;

const StContainer = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid black;
`;
