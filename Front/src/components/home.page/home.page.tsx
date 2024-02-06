import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostItem from '../../components/post-item/postItem';
import SearchForm from '../../components/searchForm/searchForm';
import { usePosts } from '../../hooks/use.post';
import { useUsers } from '../../hooks/use.user';
import { Post } from '../../models/post';
import styles from './home.page.module.scss';

const HomePage: React.FC = () => {
  const { currentUser } = useUsers();
  const { loadUserFollowingPosts, currentUserFollowingPosts, updatePost } =
    usePosts();

  const id = currentUser.id;

  useEffect(() => {
    loadUserFollowingPosts(id);
  }, [loadUserFollowingPosts, id]);

  const handleLike = (post: Post) => {
    let likes: string[];
    if (!post.likes.includes(currentUser.id)) {
      likes = [...post.likes, currentUser.id];
    } else {
      likes = post.likes.filter((userId) => userId !== currentUser.id);
    }
    updatePost(post.id, { likes: likes });
  };

  return (
    <div className={styles.postListContainer}>
      <SearchForm></SearchForm>
      <h2 className={styles.postListTitle}>My followings posts:</h2>

      {currentUserFollowingPosts.length > 0 ? (
        <ul className={styles.postList}>
          {currentUserFollowingPosts.map((post) => (
            <li key={post.id}>
              <PostItem post={post} isHome={true} />
              <div className={styles.buttonContainer}>
                <button
                  className={styles.button}
                  onClick={() => handleLike(post)}
                >
                  {post.likes.includes(currentUser.id) ? 'Dislike' : 'Like'}
                </button>
                <Link to={`/comment-form/${post.id}`} className={styles.button}>
                  Add comment
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noPostsMessage}>No posts available.</p>
      )}
    </div>
  );
};
export default HomePage;
