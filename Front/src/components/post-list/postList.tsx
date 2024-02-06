import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../../hooks/use.post';
import { useUsers } from '../../hooks/use.user';
import PostItem from '../post-item/postItem';
import styles from './postList.module.scss';

const PostList: React.FC = () => {
  const { currentUser } = useUsers();
  const { loadUserPosts, currentUserPosts, deletePost } = usePosts();

  const id = currentUser.id;

  useEffect(() => {
    loadUserPosts(id);
  }, [loadUserPosts, id]);

  const handleDelete = (postId: string) => {
    deletePost(postId);
  };

  return (
    <div className={styles.postListContainer}>
      <h2 className={styles.postListTitle}>My posts:</h2>

      {currentUserPosts.length > 0 ? (
        <ul className={styles.postList}>
          {currentUserPosts.map((post) => (
            <div key={post.id}>
              <PostItem post={post} isHome={false} />
              <Link to={`/edit-post/${post.id}`} className={styles.button}>
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className={styles.button}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <p className={styles.noPostsMessage}>No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
