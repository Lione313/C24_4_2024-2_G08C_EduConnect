import React from 'react';
import RegisterForm from '../components/Register/RegisterForm';
import { Helmet } from 'react-helmet';
const LoginPage = () => {
  return (
    <div>
      <Helmet>
        <title>EduConnect - Registro</title>
      </Helmet>
      <RegisterForm />
    </div>
  );
};

export default LoginPage;
