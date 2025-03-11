import AuthLayout from 'components/Layout/Auth';
import DashboardLayout from 'components/Layout/Dashboard';
import { PrivateRoute } from 'components/Layout/Dashboard/PrivateRoute';
import { APP, KEY_AUTH, PRIVATE_ROUTERS, PUBLIC_ROUTERS } from 'config/constants';
import { NotFoundPage } from 'pages/NotFound';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Permission from 'components/permission';
import AgentPage from 'pages/admin/Agent';
import AgentAccounts from 'pages/admin/Agent/AgentAccounts';
import { ForgotPasswordAdminPage } from 'pages/admin/auth/ForgotPasswordAdmin';
import { LoginAdminPage } from 'pages/admin/auth/LoginAdmin';
import CompanyPage from 'pages/admin/Company';
import CompanyEmployeeList from 'pages/admin/Company/CompanyEmployeeList';
import CompanyLicenses from 'pages/admin/Company/CompanyLicenses';
import LogsPage from 'pages/admin/Company/HistoryLogs';
import OverviewAdminPage from 'pages/admin/Overview';
import DocsManagement from 'pages/admin/Setup/DocsManagement';
import DocumentDetail from 'pages/admin/Setup/DocsManagement/DocumentDetail';
import PermissionConfig from 'pages/admin/Setup/PermissionConfig';
import UserListAccount from 'pages/admin/Setup/UserListAccount';
import SupportPage from 'pages/admin/Support';
import { ForgotPasswordPage } from 'pages/company/auth/ForgotPassword';
import { LoginPage } from 'pages/company/auth/Login';
import { RegisterPage } from 'pages/company/auth/Register';
import ConversionMetrics from 'pages/company/ConversionMetrics';
import HistoryLogsPage from 'pages/company/HistoryLog';
import OverviewPage from 'pages/company/Overview';
import CompanyDocsManagement from 'pages/company/Setup/DocsManagement';
import CompanyDocDetail from 'pages/company/Setup/DocsManagement/DocumentDetail';
import LicensesConfig from 'pages/company/Setup/LicensesConfig';
import CompanyListAccount from 'pages/company/Setup/UserListAccount';
import CompanySupportPage from 'pages/company/Support';
import { useSelector } from 'react-redux';
import { login } from 'store/slices/userSlice';
import { RootState } from 'types/store';
import { UserLoginRes } from 'types/SwaggerTypeUser';

const getApp = () => {
  const location = window.location.pathname;
  if (location.startsWith('/ams')) return APP.ADMIN;
  return APP.PROVIDER;
};

export const app = getApp();

export const navigateToPublicRoute = () => (app === APP.ADMIN ? PUBLIC_ROUTERS.ADMIN_LOGIN : PUBLIC_ROUTERS.LOGIN);
export const navigateToPrivateRoute = () => {
  return app === APP.ADMIN ? PRIVATE_ROUTERS.ADMIN.OVERVIEW : PRIVATE_ROUTERS.BUSINESS.OVERVIEW;
};

export const useCheckLoginUser = () => {
  const user = useSelector((state: RootState) => state.user);
  if (user[app]) return true;

  const userInStorageStr = window.localStorage.getItem(KEY_AUTH[app]);
  if (userInStorageStr === null) return false;

  const userInStorage: UserLoginRes = JSON.parse(userInStorageStr);
  if (userInStorage) {
    login(userInStorage);
    return true;
  }
  return false;
};

export const routers = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: PUBLIC_ROUTERS.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PUBLIC_ROUTERS.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: PUBLIC_ROUTERS.REGISTER,
        element: <RegisterPage />,
      },
      {
        path: PUBLIC_ROUTERS.ADMIN_LOGIN,
        element: <LoginAdminPage />,
      },
      {
        path: PUBLIC_ROUTERS.ADMIN_FORGOT_PASSWORD,
        element: <ForgotPasswordAdminPage />,
      },
      {
        path: '*',
        element: <Navigate to={navigateToPublicRoute()} />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: PRIVATE_ROUTERS.ADMIN.BASE,
            children: [
              {
                path: PRIVATE_ROUTERS.ADMIN.BASE,
                element: <Navigate to={PRIVATE_ROUTERS.ADMIN.OVERVIEW} />,
              },
              {
                path: PRIVATE_ROUTERS.ADMIN.OVERVIEW,
                element: (
                  <Permission screen={'ADMIN_DASHBOARD'} noAccess={<NotFoundPage />}>
                    <OverviewAdminPage />
                  </Permission>
                ),
              },
              {
                path: PRIVATE_ROUTERS.ADMIN.AGENT,
                children: [
                  {
                    index: true,
                    element: (
                      <Permission screen={'ADMIN_AGENCY'} noAccess={<NotFoundPage />}>
                        <AgentPage />
                      </Permission>
                    ),
                  },
                  {
                    path: ':agencyId',
                    element: (
                      <Permission screen={'ADMIN_AGENCY'} noAccess={<NotFoundPage />}>
                        <AgentAccounts />
                      </Permission>
                    ),
                  },
                ],
              },
              {
                path: PRIVATE_ROUTERS.ADMIN.COMPANY,
                children: [
                  {
                    index: true,
                    element: (
                      <Permission screen={'ADMIN_BUSINESS'} noAccess={<NotFoundPage />}>
                        <CompanyPage />
                      </Permission>
                    ),
                  },
                  {
                    path: ':id',
                    element: (
                      <Permission screen={'ADMIN_BUSINESS'} noAccess={<NotFoundPage />}>
                        <CompanyEmployeeList />
                      </Permission>
                    ),
                  },
                  {
                    path: PRIVATE_ROUTERS.LICENSES + '/:companyId',
                    element: (
                      <Permission screen={'ADMIN_BUSINESS'} noAccess={<NotFoundPage />}>
                        <CompanyLicenses />
                      </Permission>
                    ),
                  },
                  {
                    path: PRIVATE_ROUTERS.LOGS + '/:companyId',
                    element: (
                      <Permission screen={'ADMIN_BUSINESS'} noAccess={<NotFoundPage />}>
                        <LogsPage />
                      </Permission>
                    ),
                  },
                ],
              },
              {
                path: PRIVATE_ROUTERS.ADMIN.SUPPORT,
                element: (
                  <Permission screen={'ADMIN_HELP'} noAccess={<NotFoundPage />}>
                    <SupportPage />
                  </Permission>
                ),
              },
              {
                path: PRIVATE_ROUTERS.ADMIN.SETUP.AUTHORIZATION_CONFIG,
                element: (
                  <Permission screen={'ADMIN_ROLE'} noAccess={<NotFoundPage />}>
                    <PermissionConfig />
                  </Permission>
                ),
              },
              {
                path: PRIVATE_ROUTERS.ADMIN.SETUP.DOC_MANAGEMENT,
                children: [
                  {
                    index: true,
                    element: (
                      <Permission screen={'ADMIN_DOCUMENT'} noAccess={<NotFoundPage />}>
                        <DocsManagement />
                      </Permission>
                    ),
                  },
                  {
                    path: ':id',
                    element: (
                      <Permission screen={'ADMIN_DOCUMENT'} noAccess={<NotFoundPage />}>
                        <DocumentDetail />
                      </Permission>
                    ),
                  },
                ],
              },
              {
                path: PRIVATE_ROUTERS.ADMIN.SETUP.ACCOUNT_MANAGEMENT,
                element: (
                  <Permission screen={'ADMIN_ACCOUNT'} noAccess={<NotFoundPage />}>
                    <UserListAccount />
                  </Permission>
                ),
              },
              {
                path: '*',
                element: <Navigate to={PRIVATE_ROUTERS.ADMIN.OVERVIEW} />,
              },
            ],
          },
          {
            path: '/',
            children: [
              {
                path: PRIVATE_ROUTERS.BUSINESS.BASE,
                element: <Navigate to={PRIVATE_ROUTERS.BUSINESS.OVERVIEW} />,
              },
              {
                path: PRIVATE_ROUTERS.BUSINESS.OVERVIEW,
                element: (
                  <Permission screen={'USER_DASHBOARD'} noAccess={<NotFoundPage />}>
                    <OverviewPage />
                  </Permission>
                ),
              },
              {
                path: PRIVATE_ROUTERS.BUSINESS.LOGS,
                element: (
                  <Permission screen={'USER_LOG'} noAccess={<NotFoundPage />}>
                    <HistoryLogsPage />
                  </Permission>
                ),
              },

              {
                path: PRIVATE_ROUTERS.BUSINESS.SUPPORT,
                element: (
                  <Permission screen={'USER_BUSINESS'} noAccess={<NotFoundPage />}>
                    <CompanySupportPage />
                  </Permission>
                ),
              },
              {
                path: PRIVATE_ROUTERS.BUSINESS.CONVERSION_METRICS,
                element: (
                  <Permission screen={'USER_CONVERSION_METRIC'} noAccess={<NotFoundPage />}>
                    <ConversionMetrics />
                  </Permission>
                ),
              },
              {
                path: PRIVATE_ROUTERS.BUSINESS.SETUP.SERVICE_CONFIG,
                element: (
                  <Permission screen={'USER_BUSINESS'} noAccess={<NotFoundPage />}>
                    <LicensesConfig />
                  </Permission>
                ),
              },
              {
                path: PRIVATE_ROUTERS.BUSINESS.SETUP.ACCESS_ACCOUNT,
                element: (
                  <Permission screen={'USER_ACCOUNT'} noAccess={<NotFoundPage />}>
                    <CompanyListAccount />
                  </Permission>
                ),
              },
              {
                path: PRIVATE_ROUTERS.BUSINESS.SETUP.AUTHORIZATION_CONFIG,
                element: (
                  <Permission screen={'USER_ROLE'} noAccess={<NotFoundPage />}>
                    <CompanyDocsManagement />
                  </Permission>
                ),
              },
              {
                path: PRIVATE_ROUTERS.BUSINESS.SETUP.DOCS_MANAGEMENT,
                children: [
                  {
                    index: true,
                    element: (
                      <Permission screen={'USER_BUSINESS'} noAccess={<NotFoundPage />}>
                        <CompanyDocsManagement />,
                      </Permission>
                    ),
                  },
                  {
                    path: ':id',
                    element: (
                      <Permission screen={'USER_BUSINESS'} noAccess={<NotFoundPage />}>
                        <CompanyDocDetail />
                      </Permission>
                    ),
                  },
                ],
              },
              {
                path: '*',
                element: <Navigate to={PRIVATE_ROUTERS.BUSINESS.OVERVIEW} />,
              },
            ],
          },
        ],
        errorElement: <NotFoundPage />,
      },
    ],
  },
]);
