import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../models/post';
import { createThunk } from '../thunks/post.thunk';
import { registerThunk } from '../thunks/user.thunk';

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
    builder.addCase(registerThunk.pending, (state) => {
      state.error = undefined;
      state.loadState = 'loading';
    });

    builder.addCase(
      createThunk.fulfilled,
      (state, { payload }: { payload: Post }) => {
        state.error = undefined;
        state.currentUserPosts = [...state.currentUserPosts, payload];
        state.loadState = 'loaded';
      }
    );

    builder.addCase(createThunk.rejected, (state, action) => {
      state.loadState = 'error';
      state.error = action.error.message;
    });
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
