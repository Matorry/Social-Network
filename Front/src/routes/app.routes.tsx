import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Chat from '../components/chat/chat';
import { useUsers } from '../hooks/use.user';

const LoginForm = lazy(() => import('../components/login-form/loginForm'));
const RegistrationForm = lazy(
  () => import('../components/registration-form/registrationForm')
);
const HomePage = lazy(() => import('../components/home.page/home.page'));
const UserDetail = lazy(() => import('../components/userDetail/userDetail'));
const PostDetail = lazy(() => import('../components/post.detail/postDetail'));
const PostList = lazy(() => import('../components/post-list/postList'));
const PostForm = lazy(() => import('../components/post-form/postForm'));
const CommentForm = lazy(
  () => import('../components/comment-form/commentForm')
);

export function AppRoutes() {
  const { status, currentUser, userDetail } = useUsers();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/register"
          element={<RegistrationForm mode="register" />}
        />
        <Route path="/my-posts" element={<PostList />} />
        <Route
          path="/update-account"
          element={
            status === 'logged' ? (
              <RegistrationForm mode="update" currentUser={currentUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/comment-form/:postId" element={<CommentForm />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route
          path="/user/:userId"
          element={<UserDetail user={userDetail!} />}
        />
        <Route
          path="/youraccount"
          element={<UserDetail user={currentUser} />}
        />
        <Route path="/new-posts" element={<PostForm />} />
        <Route path="/edit-post/:id" element={<PostForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/home"
          element={
            status === 'not logged' ? <Navigate to="/login" /> : <HomePage />
          }
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
}
