import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleUpVoteDetailThread,
  asyncToggleDownVoteDetailThread,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
} from "../states/threadDetail/action";
import ThreadDetail from "../components/ThreadDetail";
import AddComment from "../components/AddComment";
import CommentList from "../components/CommentList";

const DetailPage = () => {
  const { id } = useParams();
  const { threadDetail = null, authUser = null } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const handleOnAddComment = (content) => {
    dispatch(asyncAddComment(content));
  };

  const handleOnClickUpVoteThread = () => {
    dispatch(asyncToggleUpVoteDetailThread());
  };

  const handleOnClickDownVoteThread = () => {
    dispatch(asyncToggleDownVoteDetailThread());
  };

  const handleOnClickUpVoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment(commentId));
  };

  const handleOnClickDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment(commentId));
  };

  const threadDetailWithUSer = {
    ...threadDetail,
    authUser: authUser?.id,
  };

  if (!threadDetail) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container px-8 pt-5">
      <div className="mb-5">
        <ThreadDetail
          {...threadDetailWithUSer}
          upVote={handleOnClickUpVoteThread}
          downVote={handleOnClickDownVoteThread}
        />
      </div>
      <div className="mb-5">
        <h3 className="text-xl mb-3 font-semibold">Beri komentar</h3>
        <AddComment addComment={handleOnAddComment} />
      </div>
      <div className="mb-3 border-b border-slate-300 pb-10">
        <CommentList
          comments={threadDetailWithUSer.comments}
          upVote={handleOnClickUpVoteComment}
          downVote={handleOnClickDownVoteComment}
          authUser={authUser?.id}
        />
      </div>
    </div>
  );
};

export default DetailPage;
