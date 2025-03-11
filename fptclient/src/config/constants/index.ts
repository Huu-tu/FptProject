import type { TablePaginationConfig } from 'antd';
export { QUERY_KEY } from './queryKey';

export * from '../../routes/router';

export const FOOTER_CONTENT = '2024 MyID';
export const COLOR_PRIMARY = 'rgba(0, 145, 140, 255)';

export enum APP {
  ADMIN,
  PROVIDER,
}

export const KEY_ACCESS_TOKEN = 'S0VZX0FDQ0VTU19UT0VLTg==';
export const KEY_AUTH = {
  [APP.ADMIN]: 'S0VZX0FVVEhfSU5GT01BVElPTga==',
  [APP.PROVIDER]: 'S0VZX0FVVEhfSU5GT01BVElPTgP==',
} as const;

export const KEY_SEED_PHRASE = 'InterITS.com';
export const KEY_LANGUAGE = 'S0VZX0xBTkdVQUdF';

export const LANGUAGE_VI = 'vi';
export const LANGUAGE_EN = 'en';
export const KEY_FORM_IMAGE = 'image';

export const FORMAT_DATE = {
  ASIA_HO_CHI_MINH: 'DD/MM/YYYY',
  ASIA_HO_CHI_MINH_01: 'DD/MM',
  TIME_ASIA_HO_CHI_MINH_01: 'DD/MM/YYYY HH:mm:ss',
  TIME_ASIA_HO_CHI_MINH_02: 'HH:mm:ss DD/MM/YYYY',
  TIME_ASIA_HO_CHI_MINH_03: 'DD/MM/YYYY HH:mm',
  TIME_ASIA_HO_CHI_MINH_04: 'YYYY-MM-DD HH:mm:ss',
  TIME_ASIA_HO_CHI_MINH_05: 'YYYY_MM_DD_HHmmss',
  TYPE_FORMAT_TIME_ASIA_HO_CHI_MINH: 'HH:mm:ss',
  TYPE_FORMAT_TIME_ASIA_HO_CHI_MINH_01: 'HH:mm',
  SEND_REQUEST_SERVER: 'YYYY-MM-DD',
  SEND_REQUEST_SERVER_01: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  SEND_REQUEST_SERVER_02: 'YYYY-MM-DD HH:mm:ss',
  SEND_REQUEST_SERVER_03: 'YYYY-MM-DDTHH:mm:ss',
} as const;

// export const REGEX_PHONE = /^(((\+|)84)|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
export const TYPE_FORMAT_HOUR_ASIA_HO_CHI_MINH = 'HH';
export const TYPE_FORMAT_MINUTE_ASIA_HO_CHI_MINH = 'mm';

export const REGEX = {
  // eslint-disable-next-line no-useless-escape
  PHONE: /^[\+\d]{0,1}\d{7,15}$/gm,
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()]).{8,}$/,
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NO_ALL_SPACE: /[^\s]+/g,
} as const;

export const PAGE_SIZE_TABLE = 20;

export const TYPE_FILE_EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || '';

export const PAGINATION_TABLE_CONFIG: TablePaginationConfig = {
  pageSize: PAGE_SIZE_TABLE,
  showLessItems: true,
  showSizeChanger: false,
};

export const KEY_ACTIVE_LICENSE_FROALA_EDITOR = import.meta.env.VITE_KEY_ACTIVE_LICENSE_FROALA_EDITOR;

export const NETWORK_CONFIG = {
  TIMEOUT: 30000,
  USE_TOKEN: true,
  WITH_CREDENTIALS: import.meta.env.VITE_WITH_CREDENTIALS === 'true',
} as const;
