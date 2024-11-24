import React from 'react';
import LoginForm from '../components/Login/LoginForm';
import { Helmet } from 'react-helmet';

const LoginPage = () => {
  return (
    <div>
      <Helmet>
        <title>EduConnect - Login</title>
      </Helmet>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
