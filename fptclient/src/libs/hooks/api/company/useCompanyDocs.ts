import { useQuery } from '@tanstack/react-query';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import type { BaseResponse } from 'types';
import { Document, QueryParamsType } from 'types/SwaggerTypeUser';

const baseUrl = 'v1/document/';
const url = {
  get: baseUrl + 'get-documents',
  detail: baseUrl + 'detail-document',
} as const;

const useGetCompanyDocs = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_DOCUMENTS, params],
    queryFn: () =>
      fetcher<BaseResponse<Document[]>>({
        method: HTTPMethod.GET,
        url: url.get,
        params: params,
      }),
  });

const useGetCompanyDetailDoc = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_DOCUMENT, params],
    queryFn: () =>
      fetcher<BaseResponse<Document>>({
        method: HTTPMethod.GET,
        url: url.detail,
        params: params,
      }),
  });

export { useGetCompanyDetailDoc, useGetCompanyDocs };
