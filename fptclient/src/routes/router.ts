export const FPT_ROUTERS = {
  BASE: '/',
  ACCOUNT_MANAGEMENT: '/account-management',
  CONFIGURATION: {
    INDEX: '/configuration',
  },

  LOGS: 'logs',
  LICENSES: 'licenses',

  FPT: {
    BASE: '/',
    INFO: '/info',
    PRODUCT: '/products',
    SUPPORT: {
      INDEX: '/support_customer',
      SERVICE_CONFIG: '/setup/service-config',
      AUTHORIZATION_CONFIG: '/setup/authorization-config',
      ACCESS_ACCOUNT: '/setup/access-account',
      DOCS_MANAGEMENT: '/setup/docs',
    },
  },
} as const;