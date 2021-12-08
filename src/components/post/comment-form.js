import { useState } from "react";

const CommentForm = ({ handleSubmit, submitLabel }) => {
    const [text, setText] = useState("");
    const isTextareaDisable = text.length === 0;
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    };
    return (
       <form onSubmit={onSubmit}>
           <textarea 
                className="comment-form-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button className="comment-form-buton" disabled={isTextareaDisable}>
                {submitLabel}
                </button>
       </form>
    )
};

export default CommentForm;