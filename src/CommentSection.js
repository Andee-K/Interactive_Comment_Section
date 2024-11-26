import React, { useState, useEffect } from "react";
import Comment from "./Comment";

export default function CommentSection() {
    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [nextId, setNextId] = useState(0);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/data.json`)
            .then((response) => response.json())
            .then((jsonData) => {
                setComments(jsonData.comments || []);
                setCurrentUser(jsonData.currentUser);
                let currId = 0;
                jsonData.comments.forEach((comment) => {
                    currId += 1
                    if (comment.replies && comment.replies.length > 0) {
                        comment.replies.forEach(() => {
                            currId += 1
                        });
                    }
                });
                setNextId(currId);
                console.log(currId);
            })
            .catch((error) => console.error("Error fetching data:", error));
        }, []);

const addReply = (commentId, replyText, replyingTo) => {
    setNextId((prevId) => prevId + 1);
    console.log(nextId);
    setComments((currComments) =>
        currComments.map((comment) => {
            if (comment.id === commentId)  {
                return {
                    ...comment,
                    replies: [
                        ...comment.replies,
                        {
                            "id": nextId,
                            "content": replyText,
                            "createdAt": Date.now(),
                            "score": 0,
                            "replyingTo": replyingTo,
                            "user": currentUser
                        }
                    ]
                }
            }
        })
    );
};

return (
    <div className="flex justify-center min-h-screen">
        <div className="flex justify-center flex-col items-center w-3/4">
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    addReply={addReply}
                />
            ))}
        </div>
    </div>
);
}
