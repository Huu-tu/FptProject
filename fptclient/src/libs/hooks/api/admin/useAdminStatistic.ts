import {
  BaseResponseListMultiLineChartResponse,
  BaseResponseListRevenueLineChartResponse,
  BaseResponseOverviewSummaryResponse,
} from 'types/SwaggerTypeAdmin.ts';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'config/constants';
import { fetcher, HTTPMethod } from 'config/api';

const baseUrl = 'admin/v1/statistic';
const url = {
  getSummary: baseUrl + '/overview-summary',
  getRevenue: baseUrl + '/get-chart-revenue',
  getAuth: baseUrl + '/get-chart-auth',
} as const;

const useGetSummary = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_OVERVIEW],
    queryFn: () =>
      fetcher<BaseResponseOverviewSummaryResponse>({
        method: HTTPMethod.GET,
        url: url.getSummary,
      }),
  });
};

const useGetRevenue = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_REVENUE],
    queryFn: () =>
      fetcher<BaseResponseListRevenueLineChartResponse>({
        method: HTTPMethod.GET,
        url: url.getRevenue,
      }),
  });
};

const useGetAuth = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_AUTH],
    queryFn: () =>
      fetcher<BaseResponseListMultiLineChartResponse>({
        method: HTTPMethod.GET,
        url: url.getAuth,
      }),
  });
};

export { useGetSummary, useGetRevenue, useGetAuth };
