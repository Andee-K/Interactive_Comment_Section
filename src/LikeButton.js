import React, { useState } from "react";

export default function LikeButton({ score }) {
    const [currentScore, setCurrentScore] = useState(score);

    return (
        <div className="likes-button bg-likes-bg-color rounded-lg w-20 h-24 flex flex-col justify-around items-center">
            <button className="text-plus-minus-color text-xl font-bold" onClick={() => setCurrentScore(currentScore + 1)}>+</button>
            <p className="text-reply-color font-bold text-lg mt-1 mb-1">{currentScore}</p>
            <button className="text-plus-minus-color text-xl font-bold" onClick={() => setCurrentScore(currentScore - 1)}>-</button>
        </div>
    )
}