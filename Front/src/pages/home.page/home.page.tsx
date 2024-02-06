import { useEffect } from 'react';
import PostItem from '../../components/post-item/postItem';
import SearchForm from '../../components/searchForm/searchForm';
import { usePosts } from '../../hooks/use.post';
import { useUsers } from '../../hooks/use.user';
import styles from './home.page.module.scss';

function HomePage() {
  const { currentUser } = useUsers();
  const { loadUserFollowingPosts, currentUserFollowingPosts } = usePosts();

  const id = currentUser.id;

  useEffect(() => {
    loadUserFollowingPosts(id);
  }, [loadUserFollowingPosts, id]);

  return (
    <main>
      <SearchForm></SearchForm>
      <div className={styles.postListContainer}>
        <h2 className={styles.postListTitle}>My posts:</h2>

        {currentUserFollowingPosts.length > 0 ? (
          <ul className={styles.postList}>
            {currentUserFollowingPosts.map((post) => (
              <div key={post.id}>
                <PostItem post={post} isHome={true} />
              </div>
            ))}
          </ul>
        ) : (
          <p className={styles.noPostsMessage}>No posts available.</p>
        )}
      </div>
    </main>
  );
}
export default HomePage;
