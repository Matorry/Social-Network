import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostItem from '../../components/post-item/postItem';
import SearchForm from '../../components/searchForm/searchForm';
import { usePosts } from '../../hooks/use.post';
import { useUsers } from '../../hooks/use.user';
import styles from './home.page.module.scss';

const HomePage: React.FC = () => {
  const { currentUser } = useUsers();
  const { loadUserFollowingPosts, currentUserFollowingPosts } = usePosts();

  const id = currentUser.id;

  useEffect(() => {
    loadUserFollowingPosts(id);
  }, [loadUserFollowingPosts, id]);

  return (
    <div className={styles.postListContainer}>
      <SearchForm></SearchForm>
      <h2 className={styles.postListTitle}>My followings posts:</h2>

      {currentUserFollowingPosts.length > 0 ? (
        <ul className={styles.postList}>
          {currentUserFollowingPosts.map((post) => (
            <li key={post.id}>
              <PostItem post={post} isHome={true} />
              <Link to={`/comment-form/${post.id}`}>Add comment</Link>
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
