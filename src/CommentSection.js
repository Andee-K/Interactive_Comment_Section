import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import Replies from "./Replies";

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
          currId += 1;
          if (comment.replies && comment.replies.length > 0) {
            comment.replies.forEach(() => (currId += 1));
          }
        });
        setNextId(currId);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Add a reply
  const addReply = (commentId, replyText, replyingTo) => {
    setNextId((prevId) => prevId + 1);
    setComments((currComments) =>
      currComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: nextId,
                content: replyText,
                createdAt: Date.now(),
                score: 0,
                replyingTo: replyingTo,
                user: currentUser,
              },
            ],
          };
        }
        return comment;
      })
    );
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col w-3/4 space-y-6">
        {comments.map((comment) => (
          <div key={comment.id}>
            {/* Render the main comment box */}
            <Comment comment={comment} addReply={addReply} />

            {/* Render the replies OUTSIDE the main comment's box */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-8 mt-2 border-l-4 border-gray-200 pl-4">
                <Replies replies={comment.replies} addReply={addReply} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
