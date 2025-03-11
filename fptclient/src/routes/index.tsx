import DashboardLayout from 'components/Layout/Dashboard';
import { FPT_ROUTERS } from 'config/constants';
// import { NotFoundPage } from 'pages/NotFound';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const routers = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      {
        path: '/',
        children: [
          {
            path: FPT_ROUTERS.BASE,
            element: <Navigate to={FPT_ROUTERS.BASE} />,
          },
          {
            path: '*',
            element: <Navigate to={FPT_ROUTERS.BASE} />,
          },
        ],
      },
    ],
    // errorElement: <NotFoundPage />,
  },
]);
