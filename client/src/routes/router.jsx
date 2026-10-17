import { createBrowserRouter } from 'react-router-dom';
import publicRoutes from './publicRoutes';
import authRoutes from './authRoutes';
import appRoutes from './appRoutes';

const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
  ...appRoutes,
]);

export default router;
