import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification.ts';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import { t } from 'i18next';
import { BaseResponse, BulkDeleteBody } from 'types';
import { AddUserReq, BaseResponseUser, QueryParamsType, User } from 'types/SwaggerTypeAdmin';

// Company account
const baseUrl = 'admin/v1/user/';
const url = {
  getUsers: baseUrl + 'get-users',
  addUser: baseUrl + 'add-user',
  deleteUsers: baseUrl + 'delete-users',
};

const useGetUsers = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_USERS, params],
    queryFn: () => {
      return fetcher<BaseResponse<User[]>>({
        method: HTTPMethod.GET,
        url: url.getUsers,
        params: params,
      });
    },
    enabled: !!params.companyId,
  });

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: AddUserReq): Promise<BaseResponseUser> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.addUser,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_USERS] });
      notifySuccess(t('notification.field_successfully', { field: t('create_account') }));
    },
  });
};

const useBulkDeleteUsers = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<unknown> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.deleteUsers,
        data: body,
      });
    },
    onSuccess: () => {
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_USERS] });
      notifySuccess(t('notification.delete_successfully', { field: t('auth.account') }));
    },
  });
};

export { useBulkDeleteUsers, useCreateUser, useGetUsers };
