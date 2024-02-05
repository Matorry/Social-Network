/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePosts } from '../../hooks/use.post';
import { useUsers } from '../../hooks/use.user';
import { PostNoId } from '../../models/post';
import styles from './postForm.module.scss';

const PostForm: React.FC = () => {
  const { currentUser } = useUsers();
  const { createPost, updatePost, currentUserPosts } = usePosts();
  const { id } = useParams<{ id?: string }>();

  const [postFormData, setPostFormData] = useState<PostNoId>({
    id: '',
    author: currentUser,
    title: '',
    text: '',
    date: new Date(),
  });

  useEffect(() => {
    if (id) {
      const post = currentUserPosts.find((element) => element.id === id);
      if (post) {
        setPostFormData({
          id: post.id,
          author: post.author,
          title: post.title,
          text: post.text,
          date: post.date,
        });
      }
    }
  }, [id, currentUserPosts]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostFormData((prevData: PostNoId) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      const { author, ...postDataWithoutAuthor } = postFormData;
      await updatePost(postFormData.id, postDataWithoutAuthor);
    } else {
      await createPost(postFormData);
    }

    setPostFormData({
      id: '',
      author: currentUser,
      title: '',
      text: '',
      date: new Date(),
    });
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={postFormData.title}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label htmlFor="text">Text:</label>
        <textarea
          id="text"
          name="text"
          value={postFormData.text}
          onChange={handleChange}
          className={styles.text}
          required
        />

        <button type="submit" className={styles.button}>
          {id ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </main>
  );
};

export default PostForm;
