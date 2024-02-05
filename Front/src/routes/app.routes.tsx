import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PostForm from '../components/post-form/postForm';
import { useUsers } from '../hooks/use.user';

const LoginForm = lazy(() => import('../components/login-form/loginForm'));
const RegistrationForm = lazy(
  () => import('../components/registration-form/registrationForm')
);
const HomePage = lazy(() => import('../pages/home.page/home.page'));
const UserDetail = lazy(() => import('../components/userDetail/userDetail'));
const PostList = lazy(() => import('../components/post-list/postList'));

export function AppRoutes() {
  const { status, currentUser, userDetail } = useUsers();

  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>

        <Route
          path="/register"
          element={<RegistrationForm mode="register" />}
        ></Route>

        <Route path="/my-posts" element={<PostList />}></Route>

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

        <Route
          path="/user/:userId"
          element={<UserDetail user={userDetail!} />}
        ></Route>

        <Route
          path="/youraccount"
          element={<UserDetail user={currentUser} />}
        ></Route>

        <Route path="/new-posts" element={<PostForm />}></Route>

        <Route path="/login" element={<LoginForm />}></Route>

        <Route
          path="/home"
          element={
            status === 'not logged' ? <Navigate to="/login" /> : <HomePage />
          }
        ></Route>

        <Route path="*" element={<Navigate to="/login" />}></Route>
      </Routes>
    </Suspense>
  );
}
