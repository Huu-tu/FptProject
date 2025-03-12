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
    INFO: {
      INDEX: '/info-event',
      INTRO_VIETTEL: '/intro-viettel',
    },
    PRODUCT: '/products',
    SUPPORT: {
      INDEX: '/support_customer',
      SUPPORT_ONLINE: '/support/support-online',
      SUPPORT_CALL: '/support/support-call',
      SUPPORT_QUESTION: '/support/support-question',
    },
  },
} as const;