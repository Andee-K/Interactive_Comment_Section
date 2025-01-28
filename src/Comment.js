import React, { useState } from "react";
import ReplyForm from "./ReplyForm";
import ProfileHeader from "./ProfileHeader";
import LikeButton from "./LikeButton.js";

export default function Comment({ comment, addReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleAddReply = (replyText) => {
    addReply(comment.id, replyText, comment.user.username);
    setShowReplyForm(false);
  };

  return (
    <div className="comment w-full p-8 flex flex-col bg-white rounded-lg m-3 mb-6 shadow-lg">
      <div className="flex justify-start w-full space-x-6">
        <LikeButton score={comment.score} />
        <div className="main-content">
          <ProfileHeader
            user={comment.user}
            createdAt={comment.createdAt}
            onReplyClick={() => setShowReplyForm(!showReplyForm)}
          />
          <p className="mt-4 text-gray-500">
            {comment.replyingTo && (
              <span className="text-reply-color font-semibold">
                @{comment.replyingTo}{" "}
              </span>
            )}
            {comment.content}
          </p>
        </div>
      </div>

      {showReplyForm && (
        <div className="reply-form w-full mt-4 pl-8">
          <ReplyForm onSubmit={handleAddReply} />
        </div>
      )}
    </div>
  );
}
