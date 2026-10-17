import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedLayout from '../layouts/ProtectedLayout';
import DashboardPage from '../pages/app/DashboardPage';
import SignToTextPage from '../pages/app/SignToTextPage';
import SpeechToSignPage from '../pages/app/SpeechToSignPage';
import AacBoardPage from '../pages/app/AacBoardPage';
import TwoWayTranslationPage from '../pages/app/TwoWayTranslationPage';

const appRoutes = [
  {
    path: '/app',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'sign-to-text',
        element: <SignToTextPage />,
      },
      {
        path: 'speech-to-sign',
        element: <SpeechToSignPage />,
      },
      {
        path: 'aac-board',
        element: <AacBoardPage />,
      },
      {
        path: 'multilingual-translator',
        element: <TwoWayTranslationPage />,
      },
      {
        path: 'two-way-translation',
        element: <TwoWayTranslationPage />,
      },
      {
        path: 'document-simplifier',
        element: <Navigate to="/app/multilingual-translator" replace />,
      },
    ],
  },
];

export default appRoutes;
