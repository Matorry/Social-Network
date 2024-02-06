import React from 'react';
import { Post } from '../../models/post';
import styles from './postItem.module.scss';

type Props = {
  post: Post;
  isHome: boolean;
};

const PostItem: React.FC<Props> = ({ post, isHome }) => {
  return (
    <div className={styles.div}>
      <h3>Title: {post.title}</h3>
      <p>{post.text}</p>
      {isHome && <p>Author: {post.author.name}</p>}
    </div>
  );
};

export default PostItem;
