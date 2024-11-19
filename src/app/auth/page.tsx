'use client';

import React, { useContext } from 'react';
import { WeatherDataContext } from '@/context/WeatherDataContext';
import AuthForm from '@/components/AuthForm';

const AuthPage = () => {
  const { weatherData } = useContext(WeatherDataContext);

  const locationName = weatherData?.location?.name;

  return (
    <div className="container mx-auto px-4">
      <p className="text-3xl text-center my-8">
      Weather can be unpredictable, but we have your back.
      </p>
      <p className="text-xl text-center my-8">
        {locationName 
          ? `Sign in to stay updated in ${locationName}!`
          : 'Sign in to stay updated in your area!'}
      </p>
      <AuthForm />
    </div>
  );
};

export default AuthPage;