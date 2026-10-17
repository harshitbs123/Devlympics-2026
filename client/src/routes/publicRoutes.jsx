import React from 'react';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/public/HomePage';

const publicRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];

export default publicRoutes;
