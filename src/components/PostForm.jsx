import React, { useState } from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import { isNewPostValid } from '../utils/postValidation';
import MyError from './UI/error/MyError';

const Postform = ({ create, posts }) => {
  const [post, setPost] = useState({ title: '', body: '' });
  const [error, setError] = useState('');

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: posts.length,
    };
    if (isNewPostValid(post)) {
      setError('');
      create(newPost);
      setPost({ title: '', body: '' });
    } else setError('*Necessery to fill both fields');
  };

  return (
    <form>
      <MyError err={error} />
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type={'text'}
        placeholder='Post Title'
      />
      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type={'text'}
        placeholder='Post Description'
      />
      <MyButton onClick={addNewPost}>Create post</MyButton>
    </form>
  );
};

export default Postform;
