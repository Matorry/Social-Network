import React, { useEffect } from 'react';
import { usePosts } from '../../hooks/use.post';
import { useUsers } from '../../hooks/use.user';
import PostItem from '../post-item/postItem';
import styles from './postList.module.scss';

const PostList: React.FC = () => {
  const { currentUser } = useUsers();
  const { loadUserPosts, currentUserPosts } = usePosts();

  const id = currentUser.id;

  useEffect(() => {
    loadUserPosts(id);
  }, [loadUserPosts, id]);

  const posts = currentUserPosts;

  return (
    <div className={styles.postListContainer}>
      <h2 className={styles.postListTitle}>My posts:</h2>

      {posts.length > 0 ? (
        <ul className={styles.postList}>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        <p className={styles.noPostsMessage}>No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
