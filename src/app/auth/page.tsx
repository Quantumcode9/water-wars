import React from 'react';
import AuthForm from '@/components/AuthForm';

const AuthPage = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Welcome to WeatherWise</h1>
      <AuthForm />
    </div>
  );
};

export default AuthPage;