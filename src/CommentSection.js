import React, { useState, useEffect } from 'react';
import Comment from './Comment';

export default function CommentSection() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/data.json`)
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => setComments(jsonData.comments || [])) 
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    content={comment.content}
                    createdAt={comment.createdAt}
                    score={comment.score}
                    user={comment.user}
                    replies={comment.replies}
                />
            ))}
        </div>
    );
}
