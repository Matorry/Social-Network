import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useComment } from '../../hooks/use.comment';
import { usePosts } from '../../hooks/use.post';
import styles from './postDetail.module.scss';

const PostDetailsPage: React.FC = () => {
  const { postId } = useParams();
  const { currentPost, getPostById } = usePosts();
  const { loadPostComments, currentPostComments } = useComment();

  useEffect(() => {
    getPostById(postId!);
    loadPostComments(postId!);
  }, [loadPostComments, postId, getPostById]);

  return (
    <div className={styles.div}>
      {currentPost ? (
        <div>
          <h2>{currentPost.title}</h2>
          <p>{currentPost.text}</p>
          <h3>Comments</h3>
          <ul>
            {currentPostComments.map((comment) => (
              <li key={comment.id}>
                <p>
                  <strong>{comment.author.userName}</strong>: <br></br>
                  {comment.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PostDetailsPage;
