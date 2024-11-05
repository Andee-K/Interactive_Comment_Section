import React from 'react';
import VoteButton from './VoteButton';
import ReplyButton from './ReplyButton';

export default function Replies(props) {
    if (props.replies) {
        return (
            <>
                {props.replies.map((reply) => (
                    <div key={reply.id}>
                        <div className="header">
                            <img src={reply.user.image.png}/>
                            <p>{reply.user.username}</p>
                            <p>{reply.createdAt}</p>
                        </div>
                        <p>@{reply.replyingTo} {reply.content}</p>
                        <VoteButton score={reply.score} />
                        <ReplyButton />
                    </div>
                ))}
            </>
        );
    }
}