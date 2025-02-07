import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import ReplyForm from "./ReplyForm";

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [nextId, setNextId] = useState(0);
  const [replyID, setReplyID] = useState(null); // Tracks which comment/reply is being replied to

  // Fetch data on component mount
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setComments(jsonData.comments || []);
        setCurrentUser(jsonData.currentUser);

        // Calculate the next available ID
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

  // Function to add a reply to a comment or a reply
  const addReply = (parentId, replyText, replyingTo, isReplyToReply = false) => {
    setNextId((prevId) => prevId + 1);
    setComments((currComments) =>
      currComments.map((comment) => {
        if (!isReplyToReply && comment.id === parentId) {
          // Add reply to a comment
          return {
            ...comment,
            replies: [
              ...(comment.replies || []), // Ensure replies array exists
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
        else if (isReplyToReply && comment.replies) {
          // Add reply to a nested reply
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === parentId) {
                return {
                  ...reply,
                  replies: [
                    ...(reply.replies || []), // Ensure nested replies array exists
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
              return reply;
            }),
          };
        }
        return comment;
      })
    );
    setReplyID(null); // Reset replyID after submitting the reply
  };

  // Function to handle the "Reply" button click
  const handleReplyClick = (id) => {
    setReplyID(id); // Set the ID of the comment/reply being replied to
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col w-3/4 space-y-6">
        {comments.map((comment) => (
          <div key={comment.id}>
            {/* Render the comment */}
            <Comment
              comment={comment}
              showReply={() => handleReplyClick(comment.id)} // Pass the comment ID to handleReplyClick
              user={currentUser.username}
            />

            {/* Conditionally render the ReplyForm if this comment is being replied to */}
            {replyID === comment.id && (
              <div className="reply-form w-full mt-4 p-3">
                <ReplyForm
                  onSubmit={(replyText) =>
                    addReply(comment.id, replyText, comment.user.username, false)
                  }
                  userPic={currentUser.image.png}
                />
              </div>
            )}

            {/* Render replies to this comment */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-8 mt-2 border-l-4 border-gray-200 pl-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="reply w-full mt-4 pl-10">
                    {/* Render the reply */}
                    <Comment
                      comment={reply}
                      showReply={() => handleReplyClick(reply.id)} // Pass the reply ID to handleReplyClick
                      user={currentUser.username}
                    />

                    {/* Conditionally render the ReplyForm if this reply is being replied to */}
                    {replyID === reply.id && (
                      <div className="reply-form w-full mt-4 pl-8">
                        <ReplyForm
                            onSubmit={(replyText) =>
                            addReply(reply.id, replyText, reply.user.username, true)
                          }
                          userPic={currentUser.image.png}
                        />
                      </div>
                    )}

                    {/* Render nested replies to this reply (if any) */}
                    {reply.replies && reply.replies.length > 0 && (
                      <div className="ml-8 mt-2 border-l-4 border-gray-200 pl-4">
                        {reply.replies.map((nestedReply) => (
                          <div key={nestedReply.id} className="nested-reply w-full mt-4 pl-10">
                            <Comment
                              comment={nestedReply}
                              showReply={() => handleReplyClick(nestedReply.id)} // Allow replying to nested replies
                              user={currentUser.username}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}