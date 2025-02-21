import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import LikeButton from "./LikeButton.js";

export default function Comment({ comment, onReplyClick, onDeleteClick, user}) {
    // console.log("Comment User:", comment.user.username); // Debugging log
    // console.log("Current User Prop:", user); // Debugging log
    const isUser = user ? comment.user.username === user : false; // Handle undefined user
    // console.log("Is Current User:", isUser); // Debugging log
    
  return (
    <div className="comment w-full p-8 flex flex-col bg-white rounded-lg m-3 mb-6 shadow-lg">
      <div className="flex justify-start w-full space-x-6">
        <LikeButton score={comment.score} />
        <div className="main-content">
          <ProfileHeader
            user={comment.user}
            isUser={isUser}
            createdAt={comment.createdAt}
            onReplyClick={onReplyClick}
            onDeleteClick={onDeleteClick}
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
    </div>
  );
}
