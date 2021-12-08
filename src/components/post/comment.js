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
    const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(comment.create_date);
    // console.log(replies);
    return (
        <div key={comment.id} className="comment">
            <div className="w-thanh">
                <img src={comment?.avatar} />
            </div>

            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div>{date}</div>
                </div>
                <div className="comment-text">{comment.body}</div>

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
                        handleSubmit={(text) => addComment(text, replyId)}
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
                                deleteComment={deleteComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                addComment={addComment}
                                parentId={comment.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>


    )
};

export default Comment;