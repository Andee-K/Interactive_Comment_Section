import React, { useState } from "react";

export default function ReplyForm({ onSubmit }) {
    const [replyText, setReplyText] = useState("");

    const handleSubmit = (event) => {
    event.preventDefault();
    if (replyText.trim()) {
        onSubmit(replyText);
        setReplyText(""); // Clear the input field
    }
    };

    return (
    <form onSubmit={handleSubmit} className="reply-form">
        <input
        type="text"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Add your reply..."
        />
        <button type="submit">Reply</button>
    </form>
    );
}
