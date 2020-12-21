import React from 'react';
import './../dashboard/post.css';
import './../dashboard/comment.css';

const Post =({name, date, content, likes, comments})=>{
    return(
        <div className="post">
            <h3>{name}</h3>
            <p>{content}</p>
            <p>{likes.length+" like"}</p>
            <p>{date}</p>
            {comments.map(comment =>(
                <div key={comment.id} className="comment">
                    <b>{comment.user.firstName+" "+comment.user.lastName+":  "}</b>{comment.content}
                </div>
            ))}
        </div>
    )
}

export default Post