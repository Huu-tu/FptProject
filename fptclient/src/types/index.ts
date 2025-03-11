import type { Key } from 'react';
import { PermissionRes } from './SwaggerTypeAdmin';

export type BaseResponse<T> = {
  code?: number;
  data: T;
  message?: string;
  errors?: Record<string, object>;
  total_record: number;
  current_page: number;
};

export enum ESendOtpReq {
  ZNS = '0',
  EMAIL = '1',
  SMS = '2',
}

export enum EPurposeSendOtpReq {
  PASSWORD_RESET,
  REGISTRATION,
}

export enum EButtonPattern {
  PRIMARY,
  ADD,
  UPDATE,
  DELETE,
  FOOTER,
  SEARCH,
}

export enum Status {
  INACTIVE,
  ACTIVE,
}

export type BulkDeleteBody = { ids: Key[] };

export type ScreenType = PermissionRes['permission'];
