import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import { t } from 'i18next';
import { BaseResponse, BulkDeleteBody } from 'types';
import {
  AddAdminReq,
  Admin,
  AdminLoginRes,
  AdminRes,
  BaseResponseListAdminRes,
  BaseResponseString,
  ChangePasswordEmployeeReq,
  ChangePasswordReq,
  QueryParamsType,
  UpdateAdminReq,
} from 'types/SwaggerTypeAdmin';

const url = {
  getAdmins: 'admin/v1/get-admins',
  getMyProfile: 'admin/v1/get-my-profile',
  updateProfile: 'admin/v1/edit-profile',
  addAdmin: 'admin/v1/add-admin',
  updatePassword: 'admin/v1/change-password',
  updatePasswordAnotherAdmin: 'admin/v1/change-password-employee',
  uploadImage: 'admin/v1/upload-image',
  updateAdmin: 'admin/v1/update-admin',
  deleteAdmin: 'admin/v1/delete-admins',
};

const useGetAdminAccounts = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_ACCOUNTS, params],
    queryFn: () => {
      return fetcher<BaseResponse<AdminRes[]>>({
        method: HTTPMethod.GET,
        url: url.getAdmins,
        params: params,
      });
    },
  });

const useGetMyProfile = () =>
  useQuery({
    queryKey: [QUERY_KEY.GET_MY_PROFILE],
    queryFn: () => {
      return fetcher<BaseResponse<AdminLoginRes>>({
        method: HTTPMethod.GET,
        url: url.getMyProfile,
      });
    },
  });

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

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Admin) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateProfile,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('personal_information') }));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_MY_PROFILE] });
    },
  });
};

const useUpdateAdminAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<UpdateAdminReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateAdmin,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('auth.account') }));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ACCOUNTS] });
    },
  });
};

const useSelfUpdatePassword = () => {
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

const useUpdateOtherAdminPassword = () => {
  return useMutation({
    mutationFn: (body: Partial<ChangePasswordEmployeeReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updatePasswordAnotherAdmin,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('password') }));
    },
  });
};

const useCreateAdminAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<AddAdminReq>): Promise<BaseResponseListAdminRes> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.addAdmin,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.create_successfully', { field: t('auth.account') }));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ACCOUNTS] });
    },
  });
};

const useDeleteUserAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<BaseResponseString> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.deleteAdmin,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ACCOUNTS] });
    },
  });
};

export {
  useCreateAdminAccount,
  useDeleteUserAccount,
  useGetAdminAccounts,
  useGetMyProfile,
  useSelfUpdatePassword,
  useUpdateAdminAccount,
  useUpdateOtherAdminPassword,
  useUpdateProfile,
  useUploadImage,
};
