import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import { t } from 'i18next';
import type { BaseResponse, BulkDeleteBody } from 'types';
import type { AddCompanyReq, Company, QueryParamsType, UpdateCompanyReq } from 'types/SwaggerTypeAdmin';

const baseUrl = 'admin/v1/company';
const url = {
  get: baseUrl + '/get-companies',
  getOne: baseUrl + '/get-detail-company',
  add: baseUrl + '/add-company',
  update: baseUrl + '/update-company',
  delete: baseUrl + '/delete-company',
} as const;

const useGetCompanies = (params: QueryParamsType) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_COMPANIES, params],
    queryFn: () =>
      fetcher<BaseResponse<Company[]>>({
        method: HTTPMethod.GET,
        url: url.get,
        params: params,
      }),
  });
};

const useGetCompany = (params: { companyId: number }) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY, params],
    queryFn: () =>
      fetcher<BaseResponse<Company>>({
        method: HTTPMethod.GET,
        url: url.getOne,
        params: params,
      }),
    enabled: !!params.companyId,
  });
};

const useCreateCompany = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<AddCompanyReq>): Promise<Company> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.add,
        data: body,
      });
    },
    onSuccess: () => {
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANIES] });
    },
  });
};

const useUpdateCompany = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateCompanyReq>): Promise<Company> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.update,
        data: body,
      });
    },
    onSuccess: () => {
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANIES] });
    },
  });
};

const useBulkDeleteCompanies = () => {
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
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANIES] });
      notifySuccess(t('notification.delete_successfully', { field: t('company') }));
    },
  });
};

export { useBulkDeleteCompanies, useCreateCompany, useGetCompanies, useGetCompany, useUpdateCompany };
