import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post, PostNoId } from '../models/post';
import { ApiPostRepository } from '../services/post.repository';

export const createThunk = createAsyncThunk<
  Post,
  { repository: ApiPostRepository; post: PostNoId; token: string }
>('post/create', async ({ repository, post, token }) => {
  const newPost = await repository.create(post, token);

  return newPost;
});

export const getUserPostsThunk = createAsyncThunk<
  Post[],
  { repository: ApiPostRepository; token: string; id: string }
>('post/get', async ({ repository, id, token }) => {
  const newPost = await repository.getUserPosts(id, token);

  return newPost;
});

export const deleteThunk = createAsyncThunk<
  string,
  { repository: ApiPostRepository; id: string; token: string }
>('post/delete', async ({ repository, id, token }) => {
  const newPost = await repository.delete(id, token);

  return newPost;
});

export const updateThunk = createAsyncThunk<
  Post,
  {
    repository: ApiPostRepository;
    data: Partial<Post>;
    id: string;
    token: string;
  }
>('post/update', async ({ repository, data, id, token }) => {
  const newPost = await repository.update(data, id, token);

  return newPost;
});

export const getByAuthorThunk = createAsyncThunk<
  Post[],
  {
    repository: ApiPostRepository;
    id: string;
    token: string;
  }
>('post/search-post', async ({ repository, id, token }) => {
  const posts = await repository.getByAuthor(id, token);

  return posts;
});
