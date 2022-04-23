import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader';
import MyComment from '../components/UI/comment/MyComment';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostsById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isCommentsLoading, commentsError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsByPostId(id);
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchPostsById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div style={{ margin: '0 100px' }}>
      <h1>You opened post № #{post.id}</h1>
      {isLoading ? (
        <MyLoader />
      ) : (
        <div style={{ fontSize: '40px', margin: 20 }}>
          {post.id}. {post.title}
        </div>
      )}
      <p>Comments:</p>
      {isCommentsLoading ? (
        <MyLoader />
      ) : (
        <div>
          {comments.map((comment) => (
            <MyComment
              email={comment.email}
              body={comment.body}
              key={comment.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default PostIdPage;
