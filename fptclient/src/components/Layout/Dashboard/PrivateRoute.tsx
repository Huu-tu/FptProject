import { Layout } from 'antd';
import ModalPortal from 'components/Modal/ModalPortal';
import { Navigate, Outlet } from 'react-router-dom';
import { navigateToPublicRoute, useCheckLoginUser } from 'routes';

export const PrivateRoute = () => {
  return useCheckLoginUser() ? (
    <Layout>
      <ModalPortal />
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={navigateToPublicRoute()} />
  );
};
