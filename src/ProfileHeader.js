import React from "react";

export default function ProfileHeader({ user, createdAt, onReplyClick }) {
  return (
    <div className="header flex justify-between items-center">
      {/* Profile Info */}
      <div className="profile-header flex items-center space-x-4">
        <img
          className="w-12 h-12 rounded-full"
          src={user.image.png}
          alt={`${user.username}'s avatar`}
        />
        <p className="font-bold">{user.username}</p>
        <p className="text-gray-500">{createdAt}</p>
      </div>

      {/* Reply Button */}
      <button
        className="reply-button flex items-center text-reply-color hover:underline mr-4"
        onClick={onReplyClick}
      >
        <svg className="mr-4" width="14" height="13" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
            fill="#5357B6"
          />
        </svg>
        Reply
      </button>
    </div>
  );
}
