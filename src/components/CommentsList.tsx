import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

import { IComment } from "../types/Icomment";

import { deleteComment } from "../store/reducers/ActionCreaters";
import { resetError } from "../store/reducers/commentSlice";

import { FaTimes } from "react-icons/fa";


interface CommentsListProps {
  comments: IComment[];
}
const CommentsList: FC<CommentsListProps> = () => {
  const dispatch = useAppDispatch();

  const { comments, isLoading, error } = useAppSelector(
    (state) => state.comments
  );
  
  const handleDelete = (id: string) => {
    dispatch(deleteComment(id));
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(resetError());
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [error, dispatch]);

  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        comments.map((comment) => (
          <div className="card" key={comment.id + 1}>
            <div className="commentwrapper">
              <p className="user">
                <span className="firstletter">{comment.user.username[0]}</span>{" "}
                {comment.user.username}
              </p>
              <p className="comment">{comment.body}</p>
            </div>

            <button
              className="deletebutton"
              onClick={() => handleDelete(comment.id.toString())}
            >
              <FaTimes />
            </button>
          </div>
        ))
      )}
      {error && <h2>{error}</h2> }
    </div>
  );
};
export default CommentsList;
