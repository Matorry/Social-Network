import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../models/post';
import {
  createThunk,
  deleteThunk,
  getByAuthorThunk,
  getUserPostsThunk,
  updateThunk,
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

    builder.addCase(updateThunk.pending, (state) => {
      state.error = undefined;
      state.loadState = 'loading';
    });

    builder.addCase(
      updateThunk.fulfilled,
      (state, { payload }: { payload: Post }) => {
        state.error = undefined;
        const index = state.currentUserPosts.findIndex(
          (element) => element.id === payload.id
        );
        state.currentUserPosts[index] = payload;
        state.loadState = 'loaded';
      }
    );

    builder.addCase(updateThunk.rejected, (state, action) => {
      state.loadState = 'error';
      state.error = action.error.message;
    });

    builder.addCase(getByAuthorThunk.pending, (state) => {
      state.error = undefined;
      state.loadState = 'loading';
    });

    builder.addCase(
      getByAuthorThunk.fulfilled,
      (state, { payload }: { payload: Post[] }) => {
        state.error = undefined;
        state.followingPosts = payload;
        state.loadState = 'loaded';
      }
    );

    builder.addCase(getByAuthorThunk.rejected, (state, action) => {
      state.loadState = 'error';
      state.error = action.error.message;
    });
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
