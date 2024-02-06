import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../models/comment';
import { createThunk, getByPostThunk } from '../thunks/comment.thunk';

export type CommentState = {
  currentPostComments: Comment[];
  error: string | undefined;
  loadState: 'loading' | 'loaded' | 'idle' | 'error';
};

const initialState: CommentState = {
  currentPostComments: [],
  loadState: 'idle',
  error: undefined,
};

const commentSlice = createSlice({
  name: 'comment',
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

    builder.addCase(getByPostThunk.pending, (state) => {
      state.error = undefined;
      state.loadState = 'loading';
    });

    builder.addCase(
      getByPostThunk.fulfilled,
      (state, { payload }: { payload: Comment[] }) => {
        state.error = undefined;
        state.currentPostComments = payload;
        state.loadState = 'loaded';
      }
    );

    builder.addCase(getByPostThunk.rejected, (state, action) => {
      state.loadState = 'error';
      state.error = action.error.message;
    });
  },
});

export const commentActions = commentSlice.actions;
export default commentSlice.reducer;
