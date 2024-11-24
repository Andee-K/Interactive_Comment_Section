import React, { useState } from "react";
import Replies from "./Replies";
import ReplyForm from "./ReplyForm";

export default function Comment({ comment, addReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false); 
  const [score, setScore] = useState(comment.score);

  const handleAddReply = (replyText) => {
    addReply(comment.id, replyText, comment.user.username); // Add reply using parent-provided function
    setShowReplyForm(false); // Close the reply form after submission
  };

return (
    <div className="comment w-2/3 p-8 flex flex-col bg-white rounded-lg m-3">
        {/* wrapper for likes and rest of content */}
        <div className="flex justify-start w-full space-x-4">
            {/* like feature */}
            <div className="likes-button bg-likes-bg-color rounded-lg w-20 flex flex-col justify-center items-center">
                <button className="text-plus-minus-color text-xl font-bold" onClick={() => setScore(score + 1)}>+</button>
                <p className="text-reply-color font-bold text-lg mt-1 mb-1">{score}</p>
                <button className="text-plus-minus-color text-xl font-bold" onClick={() => setScore(score - 1)}>-</button>
            </div>
            {/* header and comment content */}
            <div className="main-content">
                {/* header section */}
                <div className="header flex justify-between items-center">
                    <div className="profile-header flex items-center space-x-4">
                        <img
                        className="w-12 h-12 rounded-full"
                        src={comment.user.image.png}
                        alt={`${comment.user.username}'s avatar`}
                        />
                        <p className="font-bold">{comment.user.username}</p>
                        <p className="text-gray-500">{comment.createdAt}</p>
                    </div>

                    {/* reply button */}
                    <button
                        className="reply-button flex items-center reply-color hover:underline mr-4"
                        onClick={() => setShowReplyForm(!showReplyForm)}>
                        <svg className="mr-4" width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                            fill="#5357B6"/>
                        </svg>
                        Reply
                    </button>
                </div>
                {/* comment content */}
                <p className="mt-4">{comment.content}</p>
            </div>
        </div>

        <div className="replies w-full mt-4 pl-10">
            <Replies replies={comment.replies} addReply={addReply} />
        </div>

        {showReplyForm && (
            <div className="reply-form w-full mt-4 pl-8">
            <ReplyForm onSubmit={(replyText) => handleAddReply(replyText)} />
            </div>
        )}
    </div>
  );
}
