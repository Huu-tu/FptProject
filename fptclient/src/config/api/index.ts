import type { AxiosError, AxiosHeaderValue, AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from 'axios';

import { notifyError } from 'components/custom/Notification';
import { NETWORK_CONFIG } from 'config/constants';
import { t } from 'i18next';
import { app } from 'routes';
import store from 'store';
import { logoutUser } from 'store/slices/userSlice';
import { BaseResponse } from 'types';

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTION = 'OPTION',
  TRACE = 'TRACE',
  CONNECT = 'CONNECT',
}

type ConfigOptions = {
  token?: string;
  withToken?: boolean;
  withMetadata?: boolean;
  hiddenError?: boolean;
  isFormData?: boolean;
  headerValueType?: AxiosHeaderValue;
};

const getAuthorization = (defaultOptions: ConfigOptions | undefined) => {
  if (defaultOptions?.withToken === false) return;
  if (defaultOptions?.token) {
    return `Bearer ${defaultOptions?.token}`;
  }
  const state = store.getState();
  const token = state.user?.[app]?.accessToken;
  if (token) {
    return `Bearer ${token}`;
  }
  return undefined;
};

const displayError = (errorMessage: string) => {
  notifyError(t('error_message.something_went_wrong'), errorMessage, 4);
};

export const fetcher = <T>(
  config: AxiosRequestConfig & {
    method: HTTPMethod;
  },
  options?: ConfigOptions,
) => {
  return new Promise<T>((resolve, reject) => {
    axios
      .create({
        baseURL: `${import.meta.env.VITE_BASE_API_URL}/api`,
        headers: {
          Accept: options?.headerValueType ?? (options?.isFormData ? 'multipart/form-data' : 'application/json'),
          Authorization: getAuthorization(options),
        },
        timeout: NETWORK_CONFIG.TIMEOUT,
        withCredentials: NETWORK_CONFIG.WITH_CREDENTIALS,
      })
      .request<T | undefined, AxiosResponse<T>>(config)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        }
      })
      .catch((error: AxiosError<BaseResponse<T>>) => {
        if (error.response?.status && +error.response?.status === 401) {
          displayError(t('token_expire'));
          setTimeout(() => {
            logoutUser();
          }, 1000);
          return;
        }
        if (error.code === 'ERR_NETWORK') {
          displayError('Please check internet connection!');
          reject(error);
          return;
        }
        if (error.response?.data.message && !options?.hiddenError) {
          displayError(error.response?.data.message);
        }
        reject(error);
      });
  });
};
