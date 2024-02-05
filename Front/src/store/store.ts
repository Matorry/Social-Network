import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../slices/post.slice';
import usersReducer from '../slices/user.slice';

export const appStore = configureStore({
  reducer: {
    usersState: usersReducer,
    postState: postsReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
