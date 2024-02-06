import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useComment } from '../../hooks/use.comment';
import { usePosts } from '../../hooks/use.post';

const PostDetailsPage: React.FC = () => {
  const { postId } = useParams();
  const { currentUserFollowingPosts, currentUserPosts } = usePosts();
  const { loadPostComments, currentPostComments } = useComment();
  const posts = [...currentUserFollowingPosts, ...currentUserPosts];
  const post = posts.find((element) => element.id === postId);

  useEffect(() => {
    loadPostComments(postId!);
  }, [loadPostComments, postId]);

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.author.name}</p>
          <p>{post.text}</p>
          <h3>Comments</h3>
          <ul>
            {currentPostComments.map((comment, index) => (
              <li key={index}>
                <p>
                  <strong>{comment.author.userName}</strong>: {comment.text}
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
