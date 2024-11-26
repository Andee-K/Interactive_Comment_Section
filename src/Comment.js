import React, { useState } from "react";
import Replies from "./Replies";
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
    <div className="comment w-full p-8 flex flex-col bg-white rounded-lg m-3">
        {/* wrapper for likes and rest of content */}
        <div className="flex justify-start w-full space-x-6">
            {/* like feature */}
            <LikeButton score={comment.score}/>
            {/* header and comment content */}
            <div className="main-content">
                {/* header section */}
                <ProfileHeader
                    user={comment.user}
                    createdAt={comment.createdAt}
                    onReplyClick={() => setShowReplyForm(!showReplyForm)}
                />
                {/* comment content */}
                <p className="mt-4 text-gray-500">
                    {comment.replyingTo ? (
                        <span className="text-reply-color font-semibold">@{comment.replyingTo} </span>
                    ) : ""}
                    {comment.content}
                </p>
            </div>
        </div>

        <div className="replies">
            {Array.isArray(comment.replies) && comment.replies.length > 0 && (
                <Replies replies={comment.replies} addReply={addReply} />
            )}
        </div>

        {showReplyForm && (
            <div className="reply-form w-full mt-4 pl-8">
                <ReplyForm onSubmit={(replyText) => handleAddReply(replyText)} />
            </div>
        )}
    </div>
  );
}
