import React from 'react';

export default function ReplyForm() {
    const [comment, setComment] = useState("");

    return (
        <div>
            <img src="public/images/avatars/image-juliusomo.png"></img>
            <label>
                <input name="commentSubmit" value={comment}></input>
            </label>
            <button type="submit">Send</button>
        </div>
  );
}