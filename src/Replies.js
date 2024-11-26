import React from "react";
import Comment from "./Comment";

export default function Replies({ replies, addReply }) {
    return (
        <>
            {replies.map((reply) => (
                <div key={reply.id} className="reply w-full mt-4 pl-10">
                    <Comment
                        key={reply.id}
                        comment={reply}
                        addReply={addReply}
                    />
                </div>
            ))}
        </>
    );
}
