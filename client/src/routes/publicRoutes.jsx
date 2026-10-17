import React from 'react';
import { Navigate } from 'react-router-dom';
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
      {
        path: 'what-we-offer',
        element: <Navigate to="/#what-we-offer" replace />,
      },
      {
        path: 'offer',
        element: <Navigate to="/#what-we-offer" replace />,
      },
      {
        path: 'offers',
        element: <Navigate to="/#what-we-offer" replace />,
      },
      {
        path: 'whatweoffer',
        element: <Navigate to="/#what-we-offer" replace />,
      },
      {
        path: 'faq',
        element: <Navigate to="/#faq" replace />,
      },
      {
        path: 'faqs',
        element: <Navigate to="/#faq" replace />,
      },
    ],
  },
];

export default publicRoutes;
