import type { FC } from 'react';

import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { FOOTER_CONTENT } from 'config/constants';

import AppHeader from './AppHeader';
import classes from './Dashboard.module.scss';

const DashboardLayout: FC = () => {
  return (
    <Layout className={`h-screen ${classes.dashboard}`}>
      <Layout.Header>
        <AppHeader />
      </Layout.Header>

      <Layout>
        <Layout className={classes['layout-collapsed']}>
          <Layout.Content className="bg-wohite px-4 pb-2 pt-2">
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>

      <Layout.Footer className="bg-primary p-0">
        <div className="flex items-center justify-start text-xs font-bold text-white">
          <FontAwesomeIcon icon={faCopyright} className="mr-2 flex items-center rounded-full" /> {FOOTER_CONTENT}
        </div>
      </Layout.Footer>
    </Layout>
  );
};

export default DashboardLayout;
