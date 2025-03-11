import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import { t } from 'i18next';
import { BaseResponse, BulkDeleteBody } from 'types';
import {
  AddUserBaseReq,
  BaseResponseUser,
  BaseResponseUserLoginRes,
  ChangePasswordReq,
  ChangePasswordUserReq,
  QueryParamsType,
  UpdateUserReq,
  EditMyProfileReq,
  UserRes,
} from 'types/SwaggerTypeUser';

const url = {
  getAdmins: 'v1/get-admins',
  getUsers: 'v1/user/get-users',
  getProfile: 'v1/user/get-profile',
  getMyProfile: 'v1/user/get-my-profile',
  addUser: 'v1/user/add-user',
  updateProfileUser: 'v1/user/update-profile',
  updateProfile: 'v1/user/edit-my-profile',
  updatePassword: 'v1/user/change-password',
  updatePasswordAnotherCompany: 'v1/user/change-password-employee',
  uploadImage: 'v1/media/upload-image',
  deleteUsers: 'v1/user/delete-users',
};

const useGetMyProfile = () =>
  useQuery({
    queryKey: [QUERY_KEY.GET_MY_PROFILE],
    queryFn: () => {
      return fetcher<BaseResponseUserLoginRes>({
        method: HTTPMethod.GET,
        url: url.getMyProfile,
      });
    },
  });

const useGetCompanyUsers = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_USERS, params],
    queryFn: () => {
      return fetcher<BaseResponse<UserRes[]>>({
        method: HTTPMethod.GET,
        url: url.getUsers,
        params: params,
      });
    },
  });

const useGetProfile = (params: QueryParamsType, options = {}) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_USERS, params],
    queryFn: () => {
      return fetcher<BaseResponseUserLoginRes>({
        method: HTTPMethod.GET,
        url: url.getProfile,
        params: params,
      });
    },
    ...options,
  });

const useCreateCompanyUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<AddUserBaseReq>): Promise<BaseResponseUser> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.addUser,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_USERS] });
      notifySuccess(t('notification.field_successfully', { field: t('create_account') }));
    },
  });
};

const useUploadImage = () => {
  return useMutation({
    mutationFn: (body: { file: File }) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.uploadImage,
        data: body,
      });
    },
  });
};

const useSelfUpdateCompanyPassword = () => {
  return useMutation({
    mutationFn: (body: Partial<ChangePasswordReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updatePassword,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('password') }));
    },
  });
};

const useUpdateCompanyUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<UpdateUserReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateProfileUser,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('auth.account') }));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_USERS] });
    },
  });
};

const useSelfUpdateCompanyProfile = () => {
  return useMutation({
    mutationFn: (body: Partial<EditMyProfileReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateProfile,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('personal_information') }));
    },
  });
};

const useUpdateOtherAdminPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<UpdateUserReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateProfileUser,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('auth.account') }));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_USERS] });
    },
  });
};

const useUpdateOtherCompanyPassword = () => {
  return useMutation({
    mutationFn: (body: Partial<ChangePasswordUserReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updatePasswordAnotherCompany,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('password') }));
    },
  });
};

const useBulkDeleteCompanyUsers = () => {
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
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_USERS] });
      notifySuccess(t('notification.delete_successfully', { field: t('auth.account') }));
    },
  });
};

export {
  useGetMyProfile,
  useGetCompanyUsers,
  useCreateCompanyUser,
  useSelfUpdateCompanyPassword,
  useUpdateOtherCompanyPassword,
  useSelfUpdateCompanyProfile,
  useUpdateOtherAdminPassword,
  useUploadImage,
  useGetProfile,
  useBulkDeleteCompanyUsers,
  useUpdateCompanyUser,
};
