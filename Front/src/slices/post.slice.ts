import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../models/post';
import {
  createThunk,
  deleteThunk,
  getUserPostsThunk,
} from '../thunks/post.thunk';

export type PostState = {
  followingPosts: Post[];
  currentUserPosts: Post[];
  error: string | undefined;
  loadState: 'loading' | 'loaded' | 'idle' | 'error';
};

const initialState: PostState = {
  followingPosts: [],
  currentUserPosts: [],
  loadState: 'idle',
  error: undefined,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createThunk.pending, (state) => {
      state.error = undefined;
      state.loadState = 'loading';
    });

    builder.addCase(createThunk.fulfilled, (state) => {
      state.error = undefined;
      state.loadState = 'loaded';
    });

    builder.addCase(createThunk.rejected, (state, action) => {
      state.loadState = 'error';
      state.error = action.error.message;
    });

    builder.addCase(getUserPostsThunk.pending, (state) => {
      state.error = undefined;
      state.loadState = 'loading';
    });

    builder.addCase(
      getUserPostsThunk.fulfilled,
      (state, { payload }: { payload: Post[] }) => {
        state.error = undefined;
        state.currentUserPosts = payload;
        state.loadState = 'loaded';
      }
    );

    builder.addCase(getUserPostsThunk.rejected, (state, action) => {
      state.loadState = 'error';
      state.error = action.error.message;
    });

    builder.addCase(deleteThunk.pending, (state) => {
      state.error = undefined;
      state.loadState = 'loading';
    });

    builder.addCase(
      deleteThunk.fulfilled,
      (state, { payload }: { payload: string }) => {
        state.error = undefined;
        state.currentUserPosts = state.currentUserPosts.filter(
          (element) => element.id !== payload
        );
        state.loadState = 'loaded';
      }
    );

    builder.addCase(deleteThunk.rejected, (state, action) => {
      state.loadState = 'error';
      state.error = action.error.message;
    });
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
