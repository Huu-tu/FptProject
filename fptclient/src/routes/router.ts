export const PUBLIC_ROUTERS = {
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    CHECK_OTP: '/check-otp',
    VERIFY_ACCOUNT: '/verify-account',
    REGISTER: '/register',
    ADMIN_LOGIN: '/ams/login',
    ADMIN_FORGOT_PASSWORD: '/ams/forgot-password',
} as const;

export const PRIVATE_ROUTERS = {
    BASE: '/',
    ACCOUNT_MANAGEMENT: '/account-management',
    CONFIGURATION: {
        INDEX: '/configuration',
    },

    LOGS: 'logs',
    LICENSES: 'licenses',

    ADMIN: {
        BASE: '/ams',
        OVERVIEW: '/ams/overview',
        AGENT: '/ams/agent',
        COMPANY: '/ams/company',
        SUPPORT: '/ams/support',
        SETUP: {
            INDEX: '/ams/setup',
            AUTHORIZATION_CONFIG: '/ams/setup/config-authorization',
            DOC_MANAGEMENT: '/ams/setup/doc-management',
            ACCOUNT_MANAGEMENT: '/ams/setup/account-management',
        },
    },

    BUSINESS: {
        BASE: '/',
        OVERVIEW: '/overview',
        LOGS: '/logs',
        CONVERSION_METRICS: '/conversion-metrics',
        SUPPORT: '/support',
        SETUP: {
            INDEX: '/setup',
            SERVICE_CONFIG: '/setup/service-config',
            AUTHORIZATION_CONFIG: '/setup/authorization-config',
            ACCESS_ACCOUNT: '/setup/access-account',
            DOCS_MANAGEMENT: '/setup/docs',
        },
    },
} as const;
