import { useInfiniteQuery } from '@tanstack/react-query';
import { fetcher, HTTPMethod } from 'config/api';
import { PAGE_SIZE_TABLE } from 'config/constants';
import { useMemo } from 'react';
import { BaseResponse } from 'types';

export const useInfiniteQueryScroll = <T>({ queryKey, url }: { queryKey: string[]; url: string }) => {
  const { data, ...props } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }): Promise<BaseResponse<T[]>> => {
      return fetcher({
        method: HTTPMethod.GET,
        url,
        params: {
          page: pageParam,
        },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length * lastPage.current_page < lastPage.total_record / PAGE_SIZE_TABLE
        ? lastPage.current_page + 1
        : undefined;
    },
  });
  const flatData = useMemo(() => data?.pages.flatMap((d) => d.data) ?? [], [data]);

  return { data: flatData, ...props };
};
