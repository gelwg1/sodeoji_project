// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { formatDistance } from 'date-fns';
// import { Link } from 'react-router-dom';
// import AddComment from './add-comment'
// import { Comment } from 'antd';

// export default function Comments({ postId, postTime, commentInput }) {
//   const firstLayercomments = getCommentsByParentId(postId, 0);
//   postTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(postTime);
//   for (i=)
//   return (
//     <>
//       <div className="p-4 pt-1 pb-4">
//         {firstLayercomments?.map((item) => (
//           <>
//           <p key={`${item?.comment}-${item?.username}`} className="mb-1">
//             <Comment
//             actions={[<span key="comment-nested-reply-to">Reply to</span>]}
//             author={<a href={`/p/${item.displayName}`}>{item?.username}</a>}
//             content={<p>{item?.comment}</p>}
//             >
//               {/* { secondLayercomments = getCommentsByParentId(item?.commentId, item?.commentId)
//                 secondLayercomments?.map((item) => (
//                   <>
//                   <p key={`${item?.comment}-${item?.username}`} className="mb-1">
//                     <Comment
//                     actions={[<span key="comment-nested-reply-to">Reply to</span>]}
//                     author={<a href="/p/${item.displayName}">{item?.username}</a>}
//                     content={<p>{item?.comment}</p>}
//                     >
//                   </Comment>
//                   </p>
//               } */}
//             </Comment>
//           </p>
//           </>
//         ))}
//         {/* {firstLayercomments.length >=3 && (
//           <button
//             className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
//             type="button"
//             onClick={showNextComments}
//             onKeyDown={(event) => {
//               if (event.key === 'Enter') {
//                 showNextComments();
//               }
//             }}
//           >
//             他のコメントを見る
//           </button>
//         )} */}
//         <p className="text-gray-base uppercase text-xs mt-2">
//           {postTime} 前
//         </p>
//       </div>
//       <AddComment
//         postId={postId}
//         commentInput={commentInput}
//       />
//     </>
//   );
// }

// Comments.propTypes = {
//   postId: PropTypes.string.isRequired,
//   comments: PropTypes.array.isRequired,
//   postTime: PropTypes.number.isRequired,
//   commentInput: PropTypes.object.isRequired
// };