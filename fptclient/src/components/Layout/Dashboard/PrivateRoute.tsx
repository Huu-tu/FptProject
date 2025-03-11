import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
