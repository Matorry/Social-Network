import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../models/post';
import styles from './postItem.module.scss';

type Props = {
  post: Post;
};

const PostItem: React.FC<Props> = ({ post }) => {
  return (
    <div className={styles.div}>
      <h3>Title: {post.title}</h3>
      <p>{post.text}</p>
      <span>
        <Link to={`/edit-post/${post.id}`} className={styles.button}>
          Edit
        </Link>
      </span>
      <span>
        <Link to={`/delete-post/${post.id}`} className={styles.button}>
          Delete
        </Link>
      </span>
    </div>
  );
};

export default PostItem;
