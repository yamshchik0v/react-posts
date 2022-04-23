import React, { useState, useEffect, useRef } from 'react';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/modal/MyModal';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader';
import { useFetching } from '../hooks/useFetching';
import { getPagesCount, getPagesArray } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import '../styles/App.css';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSerchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPagesCount(totalCount, limit));
    }
  );
  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  // testing posts array
  useEffect(() => {
    console.log(posts);
  }, [posts]);

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className='App'>
      <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
        Create new post
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <h3 style={{ textAlign: 'center', margin: '0 0 5px 0' }}>
          Create new post
        </h3>

        <PostForm create={createPost} posts={posts} />
      </MyModal>

      <hr style={{ margin: '10px 0' }} />

      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue={'Quantity of elements'}
        options={[
          { name: '5', value: 5 },
          { name: '10', value: 10 },
          { name: '20', value: 20 },
          { name: 'All', value: -1 },
        ]}
      />
      {postError && (
        <p style={{ textAlign: 'center', color: 'crimson', marginTop: 15 }}>
          Error: ${postError}
        </p>
      )}
      {isPostsLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <MyLoader />
        </div>
      )}
      <PostList
        remove={removePost}
        posts={sortedAndSerchedPosts}
        title='Posts List #1'
      />
      <div ref={lastElement}></div>
    </div>
  );
}

export default Posts;
