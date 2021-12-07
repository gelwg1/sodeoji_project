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
    // const canEdit = userId === comment.userId;
    const canDelete = user?.user_id === comment.userId;
    const isReplying = 
        activeComment &&
        activeComment.type === "replying" &&
        activeComment.id === comment.id;
    const replyId = parentId ? parentId : comment.id;
    return (
        <div className="comment">
            <div className="comment-text">{comment.body}</div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div>comment.createdAt</div>
                </div>
            </div>
            <div className="comment-actions">
                {canReply && 
                    <div className="comment-action"
                        onClick={() => 
                            setActiveComment({id: comment.id, type: "replying"})
                        }>Reply</div>}
                {/* {canEdit && <div className="comment-action">Edit</div>} */}
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
            {replies.length >0 && (
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