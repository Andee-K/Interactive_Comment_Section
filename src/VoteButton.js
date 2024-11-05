import React, { useState } from 'react';


export default function VoteButton(props) {
    let [count, setCount] = useState(props.score);

    function upVote() {
        setCount(count + 1);
    }

    function downVote() {
        setCount(count - 1);
    }

    return (
        <div>
            <button onClick={upVote}>+</button>
            <p>{count}</p>
            <button onClick={downVote}>-</button>
        </div>
    );
}