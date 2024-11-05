import React from 'react';
import VoteButton from './VoteButton';
import ReplyButton from './ReplyButton';
import Replies from './Replies';

export default function Comment(props) {
    return (
        <div>
            <div className="header">
                <img src={props.user.image.png}></img>
                <p>{props.user.username}</p>
                <p>{props.createdAt}</p>
            </div>
            <p>{props.content}</p>
            <VoteButton score={props.score} />
            <ReplyButton />
            <Replies replies={props.replies}/>
        </div>
    )
}