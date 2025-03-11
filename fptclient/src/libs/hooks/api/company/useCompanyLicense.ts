import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import { t } from 'i18next';
import { BaseResponse, BulkDeleteBody } from 'types';
import { AddLicenseReq, License, QueryParamsType, UpdateLicenseReq } from 'types/SwaggerTypeUser';

const baseUrl = 'v1/license/';
const url = {
  getCompanyLicenses: baseUrl + 'get-licenses',
  createCompanyLicense: baseUrl + 'add-license',
  updateCompanyLicense: baseUrl + 'update-license',
  deleteCompanyLicenses: baseUrl + 'delete-licenses',
} as const;

const useGetCompanyLicenses = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_LICENSES, params],
    queryFn: () => {
      return fetcher<BaseResponse<License[]>>({
        method: HTTPMethod.GET,
        url: url.getCompanyLicenses,
        params: params,
      });
    },
  });

const useCreateCompanyLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<AddLicenseReq>): Promise<BaseResponse<License>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.createCompanyLicense,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.create_successfully', { field: t('license') }));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_LICENSES] });
    },
  });
};

const useUpdateCompanyLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<UpdateLicenseReq>): Promise<BaseResponse<License>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateCompanyLicense,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('license') }));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_LICENSES] });
    },
  });
};

const useBulkDeleteCompanyLicenses = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<BaseResponse<number[]>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.deleteCompanyLicenses,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_LICENSES] });
      notifySuccess(t('notification.delete_successfully', { field: t('license') }));
    },
  });
};

export { useBulkDeleteCompanyLicenses, useCreateCompanyLicense, useGetCompanyLicenses, useUpdateCompanyLicense };
