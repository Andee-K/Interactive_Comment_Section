import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import ReplyForm from "./ReplyForm";
import axios from "axios";

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [nextId, setNextId] = useState(0);
  const [replyID, setReplyID] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then((res) => res.json())
      .then(({ comments, currentUser }) => {
        setComments(comments || []);
        setCurrentUser(currentUser);
        setNextId(calculateNextId(comments));
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const calculateNextId = (comments) => {
    const allIds = comments.flatMap((comment) => [
      comment.id,
      ...(comment.replies || []).map((reply) => reply.id),
    ]);
    return Math.max(...allIds, 0) + 1;
  };

  const createReply = (content, replyingTo) => ({
    id: nextId,
    content,
    createdAt: Date.now(),
    score: 0,
    replyingTo,
    user: currentUser,
  });

  const addReply = async (parentId, replyText, replyingTo) => {
    const newReply = createReply(replyText, replyingTo);
    setNextId((prevId) => prevId + 1);

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: [...(comment.replies || []), newReply] }
          : {
              ...comment,
              replies: updateReplies(comment.replies, parentId, newReply),
            }
      )
    );

    try {
      await axios.post(`/data.json`, { comments });
      console.log({comments})
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateReplies = (replies, parentId, newReply) =>
    replies?.map((reply) =>
      reply.id === parentId
        ? { ...reply, replies: [...(reply.replies || []), newReply] }
        : {
            ...reply,
            replies: updateReplies(reply.replies, parentId, newReply),
          }
    ) || [];

  const handleReplyClick = (id) => setReplyID(id);

  const handleDeleteClick = (id) => {
    setComments((prevComments) =>
      prevComments
        .filter((comment) => comment.id !== id)
        .map((comment) => ({
          ...comment,
          replies: comment.replies?.filter((reply) => reply.id !== id),
        }))
    );
  };

  const renderComments = (commentsList) =>
    commentsList.map((comment) => (
      <div
        key={comment.id}
        className="ml-8 mt-2 border-l-4 border-gray-200 pl-4"
      >
        <Comment
          comment={comment}
          onReplyClick={() => handleReplyClick(comment.id)}
          onDeleteClick={() => handleDeleteClick(comment.id)}
          user={currentUser?.username}
        />
        {replyID === comment.id && (
          <ReplyForm
            onSubmit={(text) =>
              addReply(comment.id, text, comment.user.username)
            }
            userPic={currentUser?.image.png}
          />
        )}
        {comment.replies && renderComments(comment.replies)}
      </div>
    ));

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col w-3/4 space-y-6">
        {renderComments(comments)}
      </div>
    </div>
  );
}
