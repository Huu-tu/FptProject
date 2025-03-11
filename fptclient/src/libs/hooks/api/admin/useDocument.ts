import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import type { BaseResponse, BulkDeleteBody } from 'types';
import { QueryParamsType, Document, UpdateDocumentReq, AddDocumentReq } from 'types/SwaggerTypeAdmin';
import { notifySuccess } from 'components/custom/Notification.ts';
import { t } from 'i18next';

const baseUrl = 'admin/v1/document';
const url = {
  get: baseUrl + '/get-documents',
  detail: baseUrl + '/detail-document',
  add: baseUrl + '/add-document',
  update: baseUrl + '/update-document',
  delete: baseUrl + '/delete-document',
} as const;

const useGetDocuments = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_DOCUMENTS, params],
    queryFn: () =>
      fetcher<BaseResponse<Document[]>>({
        method: HTTPMethod.GET,
        url: url.get,
        params: params,
      }),
  });

const useGetDetailDocument = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_DETAIL_DOCUMENT, params],
    queryFn: () =>
      fetcher<BaseResponse<Document>>({
        method: HTTPMethod.GET,
        url: url.detail,
        params: params,
      }),
  });

const useCreateDocument = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<AddDocumentReq>): Promise<Document> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.add,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.create_successfully', { field: t('document') }));
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_DOCUMENTS] });
    },
  });
};

const useUpdateDocument = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateDocumentReq>): Promise<Document> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.update,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('document') }));
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_DOCUMENTS] });
    },
  });
};

const useBulkDeleteDocuments = () => {
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
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_DOCUMENTS] });
      notifySuccess(t('notification.delete_successfully', { field: t('document') }));
    },
  });
};

export { useGetDocuments, useGetDetailDocument, useUpdateDocument, useCreateDocument, useBulkDeleteDocuments };
