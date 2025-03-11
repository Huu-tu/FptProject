import { useQuery } from '@tanstack/react-query';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import { BaseResponse } from 'types';
import type { QueryParamsType } from 'types/SwaggerTypeAdmin';
import { AuthLogResponse } from 'types/SwaggerTypeUser';

const baseUrl = 'v1/statistic/auth-log';

const useGetCompanyLogs = (params: QueryParamsType) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_LOGS, params],
    queryFn: () => {
      return fetcher<BaseResponse<AuthLogResponse[]>>({
        method: HTTPMethod.GET,
        url: baseUrl,
        params: params,
      });
    },
  });
};

export { useGetCompanyLogs };
