import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import { t } from 'i18next';
import type { BaseResponse, BulkDeleteBody } from 'types';
import type { PermissionRes, QueryParamsType, RoleRes } from 'types/SwaggerTypeAdmin';
import { useInfiniteQueryScroll } from '../useInfiniteQueryScroll';

export type UpdatePermissionBody = {
  name: string;
  note?: string;
  type: number;
  permissions?: PermissionRes[];
  id?: number;
  status?: number;
};

const baseUrl = 'admin/v1/role';
const url = {
  get: baseUrl + '/get-roles',
  getPermissions: baseUrl + '/get-permissions',
  getDetailRole: baseUrl + '/get-detail-role',
  add: baseUrl + '/add-role',
  update: baseUrl + '/update-role',
  delete: baseUrl + '/delete-roles',
} as const;

const useGetAdminRoles = (params: QueryParamsType) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ROLES, params],
    queryFn: () =>
      fetcher<BaseResponse<RoleRes[]>>({
        method: HTTPMethod.GET,
        url: url.get,
        params: params,
      }),
  });
};

const useGetAdminPermissions = (id?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ROLES],
    queryFn: () =>
      fetcher<BaseResponse<PermissionRes[]>>({
        method: HTTPMethod.GET,
        url: url.getPermissions,
      }),
    enabled: !id, // only call when create role
  });
};

const useGetDetailAdminRole = (id: number) => {
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

const useCreateAdminRole = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdatePermissionBody): Promise<BaseResponse<RoleRes>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.add,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.create_successfully', { field: t('role') }));
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_ROLES] });
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_ROLE] });
    },
  });
};

const useUpdateAdminRole = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdatePermissionBody): Promise<BaseResponse<RoleRes>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.update,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('role') }));
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_ROLES] });
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_ROLE] });
    },
  });
};

const useBulkDeleteAdminRoles = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<unknown> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.delete,
        data: body,
      });
    },
    onSuccess: () => {
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_ROLES] });
      notifySuccess(t('notification.delete_successfully', { field: t('role') }));
    },
  });
};
const useInfiniteRoles = () => {
  return useInfiniteQueryScroll<RoleRes>({
    queryKey: [QUERY_KEY.GET_INFINITE_ROLES],
    url: url.get,
  });
};

export {
  useBulkDeleteAdminRoles,
  useCreateAdminRole,
  useGetAdminPermissions,
  useGetAdminRoles,
  useGetDetailAdminRole,
  useInfiniteRoles,
  useUpdateAdminRole,
};
