import React, { useState, useEffect } from "react";
import Comment from "./Comment";

export default function CommentSection() {
  const [comments, setComments] = useState([]);

  // Fetch the JSON data (mocked for now)
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then((response) => response.json())
      .then((jsonData) => setComments(jsonData.comments || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addReply = (commentId, replyText, replyingTo) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now(), // Unique ID for the reply
                  content: replyText,
                  createdAt: "Just now",
                  score: 0,
                  replyingTo: replyingTo,
                  user: {
                    username: "current_user",
                    image: {
                      png: "./images/avatars/image-juliusomo.png",
                      webp: "./images/avatars/image-juliusomo.webp",
                    },
                  },
                },
              ],
            }
          : comment
      )
    );
  };

  return (
    <div className="flex justify-center flex-col items-center min-h-screen">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          addReply={addReply}
        />
      ))}
    </div>
  );
}
