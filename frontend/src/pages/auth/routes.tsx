import { LinkedInCallback } from 'react-linkedin-login-oauth2';
// import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import AuthLayout from '../../layout/AuthLayout';
import ForgotPasswordView from './ForgotPasswordView';
import LoginView from './LoginView';
import ResetPasswordView from './ResetPasswordView';
import SignupView from './SignupView';
/*
function LinkedInCallback() {
  const params = useParams();
  const [search] = useSearchParams();
  console.log(params, search.get("code"));
  return (
    <Navigate to="/" />
  );
}
*/
const routes = {
  element: <AuthLayout />,
  children: [
    {
      path: '/login',
      element: <LoginView />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPasswordView />,
    },
    {
      path: '/reset-password',
      element: <ResetPasswordView />,
    },
    {
      path: '/signup',
      element: <SignupView />,
    },
    {
      path: '/linkedin',
      element: <LinkedInCallback />,
    },
  ],
};

export default routes;
