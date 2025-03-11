import { useQuery } from '@tanstack/react-query';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import { BaseResponse } from 'types';
import type { AuthLogAdminResponse, QueryParamsType } from 'types/SwaggerTypeAdmin';

const baseUrl = 'admin/v1/statistic/auth-log';

const useGetAdminLogs = (params: QueryParamsType) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LOGS, params],
    queryFn: () => {
      return fetcher<BaseResponse<AuthLogAdminResponse[]>>({
        method: HTTPMethod.GET,
        url: baseUrl,
        params: params,
      });
    },
  });
};

export { useGetAdminLogs };
