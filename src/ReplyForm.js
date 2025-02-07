import React, { useState } from "react";

export default function ReplyForm({ onSubmit, userPic }) {
  const [replyText, setReplyText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (replyText.trim()) {
      onSubmit(replyText);
      setReplyText(""); // Clear the input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form flex flex-row justify-between p-4 bg-white rounded">
        <img
            className="h-12 rounded-full"
            src={userPic}
        />
        <input
            className="w-9/12 h-24 rounded border-reply-color border"
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Add your reply..."
        />
        <button 
            className="w-28 h-12 rounded bg-reply-color font-Rubik font-medium text-white"
            type="submit">REPLY
        </button>
    </form>
  );
}
