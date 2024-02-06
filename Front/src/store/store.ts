import { configureStore } from '@reduxjs/toolkit';
import commentReducer from '../slices/comment.slice';
import postsReducer from '../slices/post.slice';
import usersReducer from '../slices/user.slice';

export const appStore = configureStore({
  reducer: {
    usersState: usersReducer,
    postState: postsReducer,
    commentState: commentReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
