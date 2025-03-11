import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import { t } from 'i18next';
import type { BaseResponse, BulkDeleteBody } from 'types';
import type { QueryParamsType, Support, SupportReq, UpdateSupportReq } from 'types/SwaggerTypeUser';

const baseUrl = 'v1/support/';
const url = {
  get: baseUrl + 'get-support',
  getDetailSupport: baseUrl + 'detail-support',
  create: baseUrl + 'create-support',
  update: baseUrl + 'update-support',
  delete: baseUrl + 'delete-support',
} as const;

const useGetCompanySupports = (params: QueryParamsType) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_SUPPORTS, params],
    queryFn: () =>
      fetcher<BaseResponse<Support[]>>({
        method: HTTPMethod.GET,
        url: url.get,
        params: params,
      }),
  });
};

const useGetDetailCompanySupport = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_SUPPORT, id],
    queryFn: () =>
      fetcher<BaseResponse<Support>>({
        method: HTTPMethod.GET,
        url: url.getDetailSupport,
        params: {
          supportId: id,
        },
      }),
    enabled: !!id,
  });
};
const useCreateCompanySupport = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: SupportReq): Promise<BaseResponse<Support>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.create,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.create_successfully', { field: t('support') }));
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_SUPPORTS] });
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_SUPPORT] });
    },
  });
};

const useUpdateCompanySupport = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateSupportReq): Promise<BaseResponse<Support>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.update,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('support') }));
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_SUPPORTS] });
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_SUPPORT] });
    },
  });
};

const useBulkDeleteCompanySupport = () => {
  const q = useQueryClient();

  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<BaseResponse<number[]>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.delete,
        data: body,
      });
    },
    onSuccess: () => {
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_SUPPORTS] });
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_SUPPORT] });
      notifySuccess(t('notification.delete_successfully', { field: t('support') }));
    },
  });
};

export {
  useBulkDeleteCompanySupport,
  useCreateCompanySupport,
  useGetCompanySupports,
  useGetDetailCompanySupport,
  useUpdateCompanySupport,
};
