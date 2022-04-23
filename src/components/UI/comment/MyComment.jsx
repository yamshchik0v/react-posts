import React from 'react';
import cl from './MyComment.module.css';

const MyComment = ({ email, body }) => {
  return (
    <section className={cl.commentBody}>
      <h5 className={cl.commentEmail}>{email}</h5>
      <hr />
      <div className={cl.commentText}>{body}</div>
    </section>
  );
};

export default MyComment;
