import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import { t } from 'i18next';
import type { Key } from 'react';
import { BaseResponse } from 'types';
import type { AddAgencyReq, UpdateAgencyReq } from 'types/api/agent';
import { AgencyRes, QueryParamsType } from 'types/SwaggerTypeAdmin';
import { useInfiniteQueryScroll } from '../useInfiniteQueryScroll';

const url = {
  getAgent: `admin/v1/agency/get-detail-agency`,
  getAgents: `admin/v1/agency/get-agencies`,
  createAgent: 'admin/v1/agency/add-agency',
  updateAgent: 'admin/v1/agency/update-agency',
  deleteAgent: 'admin/v1/agency/delete-agencies',
};

const useGetAgents = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_AGENTS, params],
    queryFn: () => {
      return fetcher<BaseResponse<AgencyRes[]>>({
        method: HTTPMethod.GET,
        url: url.getAgents,
        params: params,
      });
    },
  });

const useGetAgent = (params: { agencyId: number }) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_AGENT, params],
    queryFn: () => {
      return fetcher<BaseResponse<AgencyRes>>(
        {
          method: HTTPMethod.GET,
          url: url.getAgent,
          params: params,
        },
        { hiddenError: true },
      );
    },
    enabled: !!params.agencyId,
  });
};

const useCreateAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<AddAgencyReq>): Promise<AgencyRes> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.createAgent,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_AGENTS] });
      notifySuccess(t('notification.create_successfully', { field: t('agent') }));
    },
  });
};

const useUpdateAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<UpdateAgencyReq>): Promise<AgencyRes> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateAgent,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_AGENTS] });
      notifySuccess(t('notification.update_successfully', { field: t('agent') }));
    },
  });
};

const useDeleteAgents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { ids: Key[] }): Promise<AgencyRes> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.deleteAgent,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_AGENTS] });
      notifySuccess(t('notification.delete_successfully', { field: t('agent') }));
    },
  });
};

const useInfiniteAgents = () => {
  return useInfiniteQueryScroll<AgencyRes>({
    queryKey: [QUERY_KEY.GET_INFINITE_AGENTS],
    url: url.getAgents,
  });
};

export { useCreateAgent, useDeleteAgents, useGetAgent, useGetAgents, useInfiniteAgents, useUpdateAgent };
