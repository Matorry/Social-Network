import React, { useState } from 'react';
import { usePosts } from '../../hooks/use.post';
import { useUsers } from '../../hooks/use.user';
import { PostNoId } from '../../models/post';
import styles from './postForm.module.scss';

const PostForm: React.FC = () => {
  const { currentUser } = useUsers();
  const { createPost } = usePosts();

  const [postFormData, setPostFormData] = useState<PostNoId>({
    id: '',
    author: currentUser,
    title: '',
    text: '',
    date: new Date(),
    likes: [],
    comments: [],
  });

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

    await createPost(postFormData);

    setPostFormData({
      id: '',
      author: currentUser,
      title: '',
      text: '',
      date: new Date(),
      likes: [],
      comments: [],
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
          Create Post
        </button>
      </form>
    </main>
  );
};

export default PostForm;
