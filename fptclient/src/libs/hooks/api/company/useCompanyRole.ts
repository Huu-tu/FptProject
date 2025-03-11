import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'config/constants';
import { fetcher, HTTPMethod } from 'config/api';
import { useInfiniteQueryScroll } from '../useInfiniteQueryScroll.ts';
import type { RoleRes } from 'types/SwaggerTypeAdmin.ts';
import type { BaseResponse } from 'types';

const baseUrl = 'v1/role';
const url = {
  get: baseUrl + '/get-roles',
  getDetailRole: baseUrl + '/get-detail-role',
};

const useGetDetailProviderRole = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ROLE, id],
    queryFn: () =>
      fetcher<BaseResponse<RoleRes>>(
        {
          method: HTTPMethod.GET,
          url: url.getDetailRole,
          params: {
            role_id: id,
          },
        },
        { hiddenError: true },
      ),
    enabled: !!id,
  });
};

const useInfiniteRoles = () => {
  return useInfiniteQueryScroll<RoleRes>({
    queryKey: [QUERY_KEY.GET_INFINITE_ROLES],
    url: url.get,
  });
};

export { useGetDetailProviderRole, useInfiniteRoles };
