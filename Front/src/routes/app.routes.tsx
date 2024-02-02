import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUsers } from '../hooks/use.user';

const LoginForm = lazy(() => import('../components/login-form/loginForm'));
const RegistrationForm = lazy(
  () => import('../components/registration-form/registrationForm')
);
const HomePage = lazy(() => import('../pages/home.page/home.page'));
export function AppRoutes() {
  const { status, user } = useUsers();

  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route
          path="/register"
          element={<RegistrationForm mode="register" />}
        ></Route>
        <Route
          path="/update-account"
          element={
            status === 'logged' ? (
              <RegistrationForm mode="update" currentUser={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/login" element={<LoginForm />}></Route>
        <Route
          path="/home"
          element={
            status === 'logged' ? <HomePage /> : <Navigate to="/login" />
          }
        ></Route>
        <Route path="*" element={<Navigate to="/login" />}></Route>
      </Routes>
    </Suspense>
  );
}
