import CommentForm from "./comment-form";

const Comment = ({
    comment,
    replies,
    user,
    addComment,
    deleteComment,
    activeComment,
    setActiveComment,
    parentId
}) => {
    const canReply = Boolean(user?.user_id);
    const canEdit = user?.user_id === comment.userId;
    const canDelete = user?.user_id === comment.userId;
    const isReplying =
        activeComment &&
        activeComment.type === "replying" &&
        activeComment.id === comment.id;
    const replyId = parentId ? parentId : comment.id;
    const date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(comment.create_date);
    return (
        <div key={comment.id} className="comment">
            <div className="comment-image-container w-thanh">
                <img src={user?.avatar} />
            </div>
            
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div>{date}</div>
                </div>
                <div className="comment-text">{comment.body}</div>
            </div>
            <div className="comment-actions">
                {canReply &&
                    <div className="comment-action"
                        onClick={() =>
                            setActiveComment({ id: comment.id, type: "replying" })
                        }>Reply</div>}
                {canEdit && <div className="comment-action">Edit</div>}
                {canDelete &&
                    <div className="comment-action"
                        onClick={() => deleteComment(comment.id)}>Delete</div>}
            </div>
            {isReplying && (
                <CommentForm
                    submitLabel="Reply"
                    handleSubmit={(text) => addComment(text)}
                    user={user}
                    parentId={parentId}
                />
            )}
            {replies.length > 0 && (
                <div className="replies">
                    {replies.map((reply) => (
                        <Comment
                            comment={reply}
                            key={reply.id}
                            replies={[]}
                            user={user}
                            addComment={addComment}
                            deleteComment={deleteComment}
                            parentId={comment.id}
                        />
                    ))}
                </div>
            )}
        </div>
    )
};

export default Comment;