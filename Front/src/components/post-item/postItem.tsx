import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../models/post';
import styles from './postItem.module.scss';

type Props = {
  post: Post;
  isHome: boolean;
};

const PostItem: React.FC<Props> = ({ post, isHome }) => {
  return (
    <Link to={`/post/${post.id}`} className={styles.div}>
      <h3>Title: {post.title}</h3>
      <p>{post.text}</p>
      <p>Likes: {post.likes.length}</p>
      {isHome && <p>Author: {post.author.name}</p>}
    </Link>
  );
};

export default PostItem;
