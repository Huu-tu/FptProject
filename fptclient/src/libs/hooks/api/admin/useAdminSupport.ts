import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import { t } from 'i18next';
import type { BaseResponse } from 'types';
import type { QueryParamsType, Support, UpdateSupportReq } from 'types/SwaggerTypeAdmin';

const baseUrl = 'admin/v1/support/';
const url = {
  get: baseUrl + 'get-support',
  getDetailSupport: baseUrl + 'detail-support',
  update: baseUrl + 'update-support',
} as const;

const useGetAdminSupports = (params: QueryParamsType) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_SUPPORTS, params],
    queryFn: () =>
      fetcher<BaseResponse<Support[]>>({
        method: HTTPMethod.GET,
        url: url.get,
        params: params,
      }),
  });
};

const useGetDetailAdminSupport = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_SUPPORT, id],
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

const useUpdateAdminSupport = () => {
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
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_SUPPORTS] });
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_SUPPORT] });
    },
  });
};

export { useGetAdminSupports, useGetDetailAdminSupport, useUpdateAdminSupport };
