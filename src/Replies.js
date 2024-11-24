import React from "react";

export default function Replies({ replies, addReply }) {
    return (
    <div className="replies flex flex-col">
        {replies.map((reply) => (
        <div key={reply.id} className="reply">
            <div className="header">
            <img
                src={reply.user.image.png}
                alt={`${reply.user.username}'s avatar`}
            />
            <p>
                {reply.user.username} replying to @{reply.replyingTo}
            </p>
            <p>{reply.createdAt}</p>
            </div>
            <p>{reply.content}</p>
        </div>
        ))}
    </div>
    );
}
