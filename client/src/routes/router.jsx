import { createBrowserRouter } from 'react-router-dom';
import publicRoutes from './publicRoutes';
import authRoutes from './authRoutes';

const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
]);

export default router;
