/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UpdateUserByAdminReq {
  /** @format int32 */
  userId: number;
  /** @format int32 */
  avatarId?: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format date-time */
  birthday?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  /** @format int32 */
  roleId?: number;
}

export interface BaseResponseUser {
  /** @format int32 */
  code?: number;
  data?: User;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface User {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  deleted?: boolean;
  code?: string;
  phone?: string;
  email?: string;
  name?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  companyId?: number;
  /** @format int32 */
  roleId?: number;
  /** @format int32 */
  avatarId?: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface IdsRequest {
  /**
   * @maxItems 2147483647
   * @minItems 1
   */
  ids: number[];
}

export interface BaseResponseListInteger {
  /** @format int32 */
  code?: number;
  data?: number[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface AddUserReq {
  name: string;
  phone?: string;
  email: string;
  password: string;
  confirmPassword: string;
  /** @format int32 */
  roleId: number;
  /** @format int32 */
  companyId?: number;
  valid?: boolean;
}

export interface UpdateAdminReq {
  /** @format int32 */
  id: number;
  /** @format int32 */
  roleId?: number;
  /**
   * Trạng thái của tài khoản admin: 0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  email?: string;
  phone?: string;
  name?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  avatarId?: number;
}

export interface Admin {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  code?: string;
  email?: string;
  phone?: string;
  name?: string;
  address?: string;
  /** @format int32 */
  roleId?: number;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  agencyId?: number;
  /** @format int32 */
  avatarId?: number;
  /**
   * Trạng thái của tài khoản admin: 0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface BaseResponseAdmin {
  /** @format int32 */
  code?: number;
  data?: Admin;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface UpdateSupportReq {
  name?: string;
  content?: string;
  /** @format int32 */
  supportId?: number;
  status?: "0" | "1" | "2";
}

export interface BaseResponseSupport {
  /** @format int32 */
  code?: number;
  data?: Support;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface Support {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  deleted?: boolean;
  code?: string;
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  companyId?: number;
  name?: string;
  content?: string;
  status?: "0" | "1" | "2";
}

export interface Permission {
  /** @format int32 */
  id: number;
  isView?: boolean;
  isWrite?: boolean;
  isApproval?: boolean;
  isDecision?: boolean;
}

export interface UpdateRoleReq {
  name: string;
  note?: string;
  /**
   * Loại quyền hạn của người dùng: 0 - ADMIN, 1 - AGENCY, 2 -SERVICE_PROVIDER
   * @format int32
   */
  type: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
  /**
   * @maxItems 2147483647
   * @minItems 1
   */
  permissions: Permission[];
  /** @format int32 */
  id: number;
}

export interface BaseResponseObject {
  /** @format int32 */
  code?: number;
  data?: object;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface AddRoleReq {
  name: string;
  note?: string;
  /**
   * Loại quyền hạn của người dùng: 0 - ADMIN, 1 - AGENCY, 2 -SERVICE_PROVIDER
   * @format int32
   */
  type: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
  /**
   * @maxItems 2147483647
   * @minItems 1
   */
  permissions: Permission[];
}

export interface UpdateLicenseReq {
  name?: string;
  whitelistIp?: string;
  redirectUri?: string;
  /** @format date-time */
  expireAt?: string;
  /**
   * @maxItems 2147483647
   * @minItems 1
   */
  scope: string[];
  status?: "0" | "1";
  /** @format int32 */
  id: number;
}

export interface BaseResponseLicense {
  /** @format int32 */
  code?: number;
  data?: License;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface License {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  deleted?: boolean;
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  companyId?: number;
  name?: string;
  licenseCode?: string;
  secretCode?: string;
  whitelistIp?: string;
  redirectUri?: string;
  scope?: string[];
  /** @format date-time */
  expireAt?: string;
  status?: "0" | "1";
}

export interface AddLicenseByAdminReq {
  name?: string;
  whitelistIp?: string;
  redirectUri?: string;
  /** @format date-time */
  expireAt?: string;
  /**
   * @maxItems 2147483647
   * @minItems 1
   */
  scope: string[];
  status?: "0" | "1";
  /** @format int32 */
  companyId?: number;
}

export interface EditProfile {
  name: string;
  /**
   * Trạng thái của tài khoản admin: 0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  phone?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  avatarId?: number;
}

export interface UpdateDocumentReq {
  name?: string;
  description?: string;
  content?: string;
  /** @format int32 */
  imageId?: number;
  /** Ngôn ngữ sử dụng: 0 - vi, 1 - en, 2 - de */
  language?: "0" | "1" | "2";
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  /** @format int32 */
  documentId?: number;
}

export interface AddDocumentReq {
  name?: string;
  description?: string;
  content?: string;
  /** @format int32 */
  imageId?: number;
  /** Ngôn ngữ sử dụng: 0 - vi, 1 - en, 2 - de */
  language?: "0" | "1" | "2";
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface UpdateCompanyReq {
  nameBusiness?: string;
  email?: string;
  address?: string;
  /** @format int32 */
  logoId?: number;
  taxCode?: string;
  hotline?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  /** @format int32 */
  companyId: number;
}

export interface BaseResponseCompany {
  /** @format int32 */
  code?: number;
  data?: Company;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface Company {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  code?: string;
  /** @format int32 */
  agencyId?: number;
  name?: string;
  email?: string;
  address?: string;
  /** @format int32 */
  logoId?: number;
  taxCode?: string;
  hotline?: string;
  description?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface AddCompanyReq {
  /** @format int32 */
  logoId?: number;
  nameBusiness: string;
  taxCode?: string;
  address?: string;
  /** @format int32 */
  agencyId?: number;
  name: string;
  phone?: string;
  email: string;
  password: string;
  confirmPassword: string;
  valid?: boolean;
}

export interface ChangePasswordReq {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  valid?: boolean;
}

export interface BaseResponseString {
  /** @format int32 */
  code?: number;
  data?: string;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface ChangePasswordEmployeeReq {
  /** @format int32 */
  adminId: number;
  newPassword: string;
  confirmPassword: string;
  valid?: boolean;
}

export interface SendOtpReq {
  phone?: string;
  email?: string;
  /** Hình thức gửi tin: 0 - ZNS, 1 - EMAIL, 2 - SMS */
  type: "0" | "1" | "2";
  /**
   * Mục đích gửi OTP: 0 - PASSWORD_RESET, 1 - REGISTRATION
   * @format int32
   */
  purpose: number;
  valid?: boolean;
}

export interface BaseResponseSendOtp {
  /** @format int32 */
  code?: number;
  data?: SendOtp;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface SendOtp {
  /** @format int32 */
  id?: number;
  email?: string;
  phone?: string;
  otp?: string;
}

export interface AdminLoginReq {
  email: string;
  password: string;
}

export interface AdminLoginRes {
  /** @format int32 */
  id?: number;
  code?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: RoleDetail;
  accessToken?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  agencyId?: number;
  agencyName?: string;
  avatar?: UploadFile;
  permissions?: PermissionRes[];
}

export interface BaseResponseAdminLoginRes {
  /** @format int32 */
  code?: number;
  data?: AdminLoginRes;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface PermissionRes {
  /** @format int32 */
  id?: number;
  title?: string;
  permission?:
    | "ADMIN_DASHBOARD"
    | "ADMIN_AGENCY"
    | "ADMIN_BUSINESS"
    | "ADMIN_HELP"
    | "ADMIN_ROLE"
    | "ADMIN_ACCOUNT"
    | "ADMIN_DOCUMENT"
    | "USER_DASHBOARD"
    | "USER_LOG"
    | "USER_CONVERSION_METRIC"
    | "USER_BUSINESS"
    | "USER_CONFIG_SERVICE"
    | "USER_ROLE"
    | "USER_ACCOUNT";
  parentPermission?: "STATISTIC" | "AGENCY" | "BUSINESS" | "UTILITIES" | "ACCOUNT";
  isView?: boolean;
  isWrite?: boolean;
  isApproval?: boolean;
  isDecision?: boolean;
}

export interface RoleDetail {
  /** @format int32 */
  roleId?: number;
  roleName?: string;
}

export interface UploadFile {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  deleted?: boolean;
  originFilePath?: string;
  thumbFilePath?: string;
  originUrl?: string;
  thumbUrl?: string;
  /**
   * Kiểu file upload: 0 - IMAGE, 1 - VIDEO_YOUTUBE, 2 - PDF
   * @format int32
   */
  type?: number;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  height?: number;
  /** @format int32 */
  duration?: number;
  /** @format int64 */
  size?: number;
}

export interface ForgotPasswordReq {
  /** @format int32 */
  codeId: number;
  code: string;
  newPassword: string;
  confirmNewPassword: string;
  valid?: boolean;
}

export interface UpdateAgencyReq {
  /** @format int32 */
  id: number;
  name?: string;
  phone?: string;
  email: string;
  address?: string;
  /**
   * @minLength 0
   * @maxLength 20
   */
  taxCode?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
}

export interface Agency {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  deleted?: boolean;
  code?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface BaseResponseAgency {
  /** @format int32 */
  code?: number;
  data?: Agency;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface AddAgencyReq {
  name: string;
  taxCode?: string;
  phone?: string;
  address?: string;
  accountName: string;
  email: string;
  password: string;
  confirmPassword: string;
  valid?: boolean;
}

export interface AddAdminReq {
  email: string;
  name: string;
  password: string;
  /** @format int32 */
  agencyId?: number;
  /** @format int32 */
  roleId: number;
  /**
   * Trạng thái của tài khoản admin: 0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
}

export interface BaseResponseListUserRes {
  /** @format int32 */
  code?: number;
  data?: UserRes[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface UserRes {
  /** @format int32 */
  id?: number;
  code?: string;
  name?: string;
  email?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  role?: RoleDetail;
}

export interface BaseResponseUserDetailRes {
  /** @format int32 */
  code?: number;
  data?: UserDetailRes;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface UserDetailRes {
  /** @format int32 */
  id?: number;
  code?: string;
  phone?: string;
  name?: string;
  email?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  avatarId?: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  role?: RoleDetail;
}

export interface BaseResponseUserDetailByAdminRes {
  /** @format int32 */
  code?: number;
  data?: UserDetailByAdminRes;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface UserDetailByAdminRes {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  avatarId?: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format date-time */
  birthday?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  role?: RoleDetail;
}

export interface BaseResponseListSupport {
  /** @format int32 */
  code?: number;
  data?: Support[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface BaseResponseOverviewSummaryResponse {
  /** @format int32 */
  code?: number;
  data?: OverviewSummaryResponse;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface OverviewSummaryResponse {
  /** @format int64 */
  totalCompanies?: number;
  /** @format int64 */
  totalAgencies?: number;
  /** @format int64 */
  totalRevenue?: number;
  /** @format int64 */
  totalAuthentications?: number;
}

export interface BaseResponseListRevenueLineChartResponse {
  /** @format int32 */
  code?: number;
  data?: RevenueLineChartResponse[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface ChartResponse {
  name?: string;
  /** @format int64 */
  value?: number;
}

export interface RevenueLineChartResponse {
  name?: string;
  data?: ChartResponse[];
}

export interface BaseResponseListMultiLineChartResponse {
  /** @format int32 */
  code?: number;
  data?: MultiLineChartResponse[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface MultiLineChartResponse {
  telco?: string;
  data?: ChartResponse[];
}

export interface AuthLogAdminResponse {
  /** @format int32 */
  id?: number;
  code?: string;
  /** @format int32 */
  licenseId?: number;
  /**
   * Nhà mạng: 0 - VIETTEL, 1 - MOBIFONE, 2 -VINAPHONE
   * @format int32
   */
  telcoType?: number;
  telcoCode?: string;
  msisdn?: string;
  state?: string;
  scope?: string;
  redirectUri?: string;
  ip?: string;
  verified?: boolean;
  /** @format int32 */
  type?: number;
  note?: string;
  /** Trạng thái log:  0 - INIT, 1 - INIT_SUCCESS, 2 - INIT_FAIL, 3 - VERIFY_CODE_SUCCESS, 4 - VERIFY_CODE_FAIL */
  status?: "0" | "1" | "2" | "3" | "4";
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  licenseName?: string;
  businessName?: string;
}

export interface BaseResponseListAuthLogAdminResponse {
  /** @format int32 */
  code?: number;
  data?: AuthLogAdminResponse[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface BaseResponseListRoleRes {
  /** @format int32 */
  code?: number;
  data?: RoleRes[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface RoleRes {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  objectId?: number;
  name?: string;
  note?: string;
  /**
   * Loại quyền hạn của người dùng: 0 - ADMIN, 1 - AGENCY, 2 -SERVICE_PROVIDER
   * @format int32
   */
  type?: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  permissions?: PermissionRes[];
}

export interface BaseResponseListPermissionRes {
  /** @format int32 */
  code?: number;
  data?: PermissionRes[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface BaseResponseRoleRes {
  /** @format int32 */
  code?: number;
  data?: RoleRes;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface BaseResponseListLicense {
  /** @format int32 */
  code?: number;
  data?: License[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface AdminDetailRes {
  /** @format int32 */
  id?: number;
  code?: string;
  email?: string;
  phone?: string;
  name?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  agencyId?: number;
  /**
   * Trạng thái của tài khoản admin: 0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  role?: RoleDetail;
}

export interface BaseResponseAdminDetailRes {
  /** @format int32 */
  code?: number;
  data?: AdminDetailRes;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface AdminRes {
  /** @format int32 */
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  /**
   * Trạng thái của tài khoản admin: 0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format date-time */
  birthday?: string;
  address?: string;
  role?: RoleDetail;
}

export interface BaseResponseListAdminRes {
  /** @format int32 */
  code?: number;
  data?: AdminRes[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface BaseResponseListDocument {
  /** @format int32 */
  code?: number;
  data?: Document[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface Document {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  deleted?: boolean;
  code?: string;
  name?: string;
  description?: string;
  content?: string;
  /** @format int32 */
  imageId?: number;
  /** Ngôn ngữ sử dụng: 0 - vi, 1 - en, 2 - de */
  language?: "0" | "1" | "2";
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface BaseResponseDocument {
  /** @format int32 */
  code?: number;
  data?: Document;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface BaseResponseListCompanyRes {
  /** @format int32 */
  code?: number;
  data?: CompanyRes[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface CompanyRes {
  /** @format int32 */
  id?: number;
  code?: string;
  /** @format int32 */
  agencyId?: number;
  nameBusiness?: string;
  email?: string;
  address?: string;
  /** @format int32 */
  logoId?: number;
  taxCode?: string;
  hotline?: string;
  description?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface AgencyRes {
  /** @format int32 */
  id?: number;
  code?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  /** @format date-time */
  createAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface BaseResponseAgencyRes {
  /** @format int32 */
  code?: number;
  data?: AgencyRes;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface BaseResponseListAgencyRes {
  /** @format int32 */
  code?: number;
  data?: AgencyRes[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://210.211.97.224:8082" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title API MYID GATEWAY
 * @version 1.0
 * @license License of API (https://interits.com/)
 * @baseUrl http://210.211.97.224:8082
 * @contact ITS <info@its.com> (https://interits.com/)
 *
 * Api mobile_id gateway
 */
export class SwaggerTypeAdmin<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  api = {
    /**
     * No description
     *
     * @tags user-controller
     * @name UpdateUserByAdmin
     * @summary Admin update profile for user
     * @request POST:/api/admin/v1/user/update-user
     * @secure
     * @response `200` `BaseResponseUser` OK
     */
    updateUserByAdmin: (data: UpdateUserByAdminReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseUser, any>({
        path: `/api/admin/v1/user/update-user`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name DeleteUsersByAdmin
     * @summary Admin delete account business
     * @request POST:/api/admin/v1/user/delete-users
     * @secure
     * @response `200` `BaseResponseListInteger` OK
     */
    deleteUsersByAdmin: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseListInteger, any>({
        path: `/api/admin/v1/user/delete-users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name AddUserForAdmin
     * @summary Admin add new account for business
     * @request POST:/api/admin/v1/user/add-user
     * @secure
     * @response `200` `BaseResponseUser` OK
     */
    addUserForAdmin: (data: AddUserReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseUser, any>({
        path: `/api/admin/v1/user/add-user`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name UpdateAdmin
     * @summary Update account information
     * @request POST:/api/admin/v1/update-admin
     * @secure
     * @response `200` `BaseResponseAdmin` OK
     */
    updateAdmin: (data: UpdateAdminReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseAdmin, any>({
        path: `/api/admin/v1/update-admin`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags support-controller
     * @name UpdateSupportByAdmin
     * @summary Admin update status request support
     * @request POST:/api/admin/v1/support/update-support
     * @secure
     * @response `200` `BaseResponseSupport` OK
     */
    updateSupportByAdmin: (data: UpdateSupportReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseSupport, any>({
        path: `/api/admin/v1/support/update-support`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name UpdateRoleForAdmin
     * @summary Update role for Admin
     * @request POST:/api/admin/v1/role/update-role
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    updateRoleForAdmin: (data: UpdateRoleReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/admin/v1/role/update-role`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name DeleteRolesForAdmin
     * @summary Delete roles in the Admin
     * @request POST:/api/admin/v1/role/delete-roles
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    deleteRolesForAdmin: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/admin/v1/role/delete-roles`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name AddRoleForAdmin
     * @summary Add role for Admin
     * @request POST:/api/admin/v1/role/add-role
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    addRoleForAdmin: (data: AddRoleReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/admin/v1/role/add-role`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags license-controller
     * @name UpdateLicenseByAdmin
     * @summary Admin update license for business
     * @request POST:/api/admin/v1/license/update-license
     * @secure
     * @response `200` `BaseResponseLicense` OK
     */
    updateLicenseByAdmin: (data: UpdateLicenseReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseLicense, any>({
        path: `/api/admin/v1/license/update-license`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags license-controller
     * @name DeleteLicenseByAdmin
     * @summary Admin delete licenses for business
     * @request POST:/api/admin/v1/license/delete-licenses
     * @secure
     * @response `200` `BaseResponseListInteger` OK
     */
    deleteLicenseByAdmin: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseListInteger, any>({
        path: `/api/admin/v1/license/delete-licenses`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags license-controller
     * @name AddLicenseByAdmin
     * @summary Admin add new license for business
     * @request POST:/api/admin/v1/license/add-license
     * @secure
     * @response `200` `BaseResponseLicense` OK
     */
    addLicenseByAdmin: (data: AddLicenseByAdminReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseLicense, any>({
        path: `/api/admin/v1/license/add-license`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name ChangePassWord
     * @summary Edit account profile
     * @request POST:/api/admin/v1/edit-profile
     * @secure
     * @response `200` `BaseResponseAdmin` OK
     */
    changePassWord: (data: EditProfile, params: RequestParams = {}) =>
      this.http.request<BaseResponseAdmin, any>({
        path: `/api/admin/v1/edit-profile`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags document-controller
     * @name UpdateDocument
     * @summary Update document by Admin
     * @request POST:/api/admin/v1/document/update-document
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    updateDocument: (data: UpdateDocumentReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/admin/v1/document/update-document`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags document-controller
     * @name DeleteDocument
     * @summary Delete document by Admin
     * @request POST:/api/admin/v1/document/delete-document
     * @secure
     * @response `200` `BaseResponseListInteger` OK
     */
    deleteDocument: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseListInteger, any>({
        path: `/api/admin/v1/document/delete-document`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags document-controller
     * @name AddDocument
     * @summary Add new document by Admin
     * @request POST:/api/admin/v1/document/add-document
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    addDocument: (data: AddDocumentReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/admin/v1/document/add-document`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name DeleteAdmins
     * @summary Delete account admins
     * @request POST:/api/admin/v1/delete-admins
     * @secure
     * @response `200` `BaseResponseListInteger` OK
     */
    deleteAdmins: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseListInteger, any>({
        path: `/api/admin/v1/delete-admins`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags company-controller
     * @name UpdateCompany
     * @summary Update company
     * @request POST:/api/admin/v1/company/update-company
     * @secure
     * @response `200` `BaseResponseCompany` OK
     */
    updateCompany: (data: UpdateCompanyReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseCompany, any>({
        path: `/api/admin/v1/company/update-company`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags company-controller
     * @name DeleteCompany
     * @summary Delete company
     * @request POST:/api/admin/v1/company/delete-company
     * @secure
     * @response `200` `BaseResponseListInteger` OK
     */
    deleteCompany: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseListInteger, any>({
        path: `/api/admin/v1/company/delete-company`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags company-controller
     * @name AddUser
     * @summary Admin add new business
     * @request POST:/api/admin/v1/company/add-company
     * @secure
     * @response `200` `BaseResponseCompany` OK
     */
    addUser: (data: AddCompanyReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseCompany, any>({
        path: `/api/admin/v1/company/add-company`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name ChangePasswordAdmin
     * @summary Change password for myself
     * @request POST:/api/admin/v1/change-password
     * @secure
     * @response `200` `BaseResponseString` OK
     */
    changePasswordAdmin: (data: ChangePasswordReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseString, any>({
        path: `/api/admin/v1/change-password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name ChangePassword
     * @summary Change password for employee
     * @request POST:/api/admin/v1/change-password-employee
     * @secure
     * @response `200` `BaseResponseString` OK
     */
    changePassword: (data: ChangePasswordEmployeeReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseString, any>({
        path: `/api/admin/v1/change-password-employee`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name SendOtpAdmin
     * @summary Send OTP forgot password Admin
     * @request POST:/api/admin/v1/auth/send-otp
     * @secure
     * @response `200` `BaseResponseSendOtp` OK
     */
    sendOtpAdmin: (data: SendOtpReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseSendOtp, any>({
        path: `/api/admin/v1/auth/send-otp`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name LoginAdmin
     * @summary Admin login
     * @request POST:/api/admin/v1/auth/login
     * @secure
     * @response `200` `BaseResponseAdminLoginRes` OK
     */
    loginAdmin: (data: AdminLoginReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseAdminLoginRes, any>({
        path: `/api/admin/v1/auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name ForgotPasswordAdmin
     * @summary Admin forgot password
     * @request POST:/api/admin/v1/auth/forgot-password
     * @secure
     * @response `200` `BaseResponseString` OK
     */
    forgotPasswordAdmin: (data: ForgotPasswordReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseString, any>({
        path: `/api/admin/v1/auth/forgot-password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags agency-controller
     * @name UpdateAgency
     * @summary Update Agency
     * @request POST:/api/admin/v1/agency/update-agency
     * @secure
     * @response `200` `BaseResponseAgency` OK
     */
    updateAgency: (data: UpdateAgencyReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseAgency, any>({
        path: `/api/admin/v1/agency/update-agency`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags agency-controller
     * @name DeleteAgencies
     * @summary Delete agencies
     * @request POST:/api/admin/v1/agency/delete-agencies
     * @secure
     * @response `200` `BaseResponseListInteger` OK
     */
    deleteAgencies: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseListInteger, any>({
        path: `/api/admin/v1/agency/delete-agencies`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags agency-controller
     * @name AddAgency
     * @summary Add new Agency
     * @request POST:/api/admin/v1/agency/add-agency
     * @secure
     * @response `200` `BaseResponseAgency` OK
     */
    addAgency: (data: AddAgencyReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseAgency, any>({
        path: `/api/admin/v1/agency/add-agency`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name AddAdmin
     * @summary Add admin member
     * @request POST:/api/admin/v1/add-admin
     * @secure
     * @response `200` `BaseResponseAdmin` OK
     */
    addAdmin: (data: AddAdminReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseAdmin, any>({
        path: `/api/admin/v1/add-admin`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name GetUsersByAdmin
     * @summary Admin get list account business
     * @request GET:/api/admin/v1/user/get-users
     * @secure
     * @response `200` `BaseResponseListUserRes` OK
     */
    getUsersByAdmin: (
      query: {
        /** @format int32 */
        page: number;
        /** @format int32 */
        companyId: number;
        /**
         * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
         * @format int32
         */
        status?: number;
        /** [name, email] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListUserRes, any>({
        path: `/api/admin/v1/user/get-users`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name GetProfileUserByAdmin
     * @summary Get profile account user by admin
     * @request GET:/api/admin/v1/user/get-profile
     * @secure
     * @response `200` `BaseResponseUserDetailRes` OK
     */
    getProfileUserByAdmin: (
      query: {
        /** @format int32 */
        accountId: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseUserDetailRes, any>({
        path: `/api/admin/v1/user/get-profile`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name GetDetailUserByAdmin
     * @summary Admin get detail user of business
     * @request GET:/api/admin/v1/user/get-detail-user
     * @secure
     * @response `200` `BaseResponseUserDetailByAdminRes` OK
     */
    getDetailUserByAdmin: (
      query: {
        /** @format int32 */
        userId: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseUserDetailByAdminRes, any>({
        path: `/api/admin/v1/user/get-detail-user`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags support-controller
     * @name GetSupportsByAdmin
     * @summary Get list support request by Admin
     * @request GET:/api/admin/v1/support/get-support
     * @secure
     * @response `200` `BaseResponseListSupport` OK
     */
    getSupportsByAdmin: (
      query: {
        /** @format int32 */
        page: number;
        /** @format int32 */
        companyId?: number;
        status?: "0" | "1" | "2";
        /** [name, code, content] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListSupport, any>({
        path: `/api/admin/v1/support/get-support`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags support-controller
     * @name GetDetailSupportByAdmin
     * @summary Get detail support request by admin
     * @request GET:/api/admin/v1/support/detail-support
     * @secure
     * @response `200` `BaseResponseSupport` OK
     */
    getDetailSupportByAdmin: (
      query: {
        /** @format int32 */
        supportId: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseSupport, any>({
        path: `/api/admin/v1/support/detail-support`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags statistics-controller
     * @name GetOverviewSummaryAdmin
     * @summary Overview summary (Admin)
     * @request GET:/api/admin/v1/statistic/overview-summary
     * @secure
     * @response `200` `BaseResponseOverviewSummaryResponse` OK
     */
    getOverviewSummaryAdmin: (params: RequestParams = {}) =>
      this.http.request<BaseResponseOverviewSummaryResponse, any>({
        path: `/api/admin/v1/statistic/overview-summary`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags statistics-controller
     * @name GetAuthRevenueAdmin
     * @summary Revenue validation chart (Admin)
     * @request GET:/api/admin/v1/statistic/get-chart-revenue
     * @secure
     * @response `200` `BaseResponseListRevenueLineChartResponse` OK
     */
    getAuthRevenueAdmin: (
      query?: {
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListRevenueLineChartResponse, any>({
        path: `/api/admin/v1/statistic/get-chart-revenue`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags statistics-controller
     * @name GetAuthTelecomAdmin
     * @summary Authentication Diagram with Telecom Carriers (Admin)
     * @request GET:/api/admin/v1/statistic/get-chart-auth
     * @secure
     * @response `200` `BaseResponseListMultiLineChartResponse` OK
     */
    getAuthTelecomAdmin: (
      query?: {
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListMultiLineChartResponse, any>({
        path: `/api/admin/v1/statistic/get-chart-auth`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags statistics-controller
     * @name AuthLogsAdmin
     * @summary Authentication history list by admin
     * @request GET:/api/admin/v1/statistic/auth-log
     * @secure
     * @response `200` `BaseResponseListAuthLogAdminResponse` OK
     */
    authLogsAdmin: (
      query: {
        /** @format int32 */
        page: number;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        /**
         * Nhà mạng: 0 - VIETTEL, 1 - MOBIFONE, 2 -VINAPHONE
         * @format int32
         */
        telcoType?: number;
        /** @format int32 */
        companyId?: number;
        /** [code, license, msisdn, state] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListAuthLogAdminResponse, any>({
        path: `/api/admin/v1/statistic/auth-log`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name GetRolesForAdmin
     * @summary Get role
     * @request GET:/api/admin/v1/role/get-roles
     * @secure
     * @response `200` `BaseResponseListRoleRes` OK
     */
    getRolesForAdmin: (
      query: {
        /** @format int32 */
        page: number;
        /**
         * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
         * @format int32
         */
        status?: number;
        /** [name] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListRoleRes, any>({
        path: `/api/admin/v1/role/get-roles`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name GetPermissionsForAdmin
     * @summary Get permissions
     * @request GET:/api/admin/v1/role/get-permissions
     * @secure
     * @response `200` `BaseResponseListPermissionRes` OK
     */
    getPermissionsForAdmin: (params: RequestParams = {}) =>
      this.http.request<BaseResponseListPermissionRes, any>({
        path: `/api/admin/v1/role/get-permissions`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name GetDetailRoleForAdmin
     * @summary Get detail role
     * @request GET:/api/admin/v1/role/get-detail-role
     * @secure
     * @response `200` `BaseResponseRoleRes` OK
     */
    getDetailRoleForAdmin: (
      query: {
        /** @format int32 */
        role_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseRoleRes, any>({
        path: `/api/admin/v1/role/get-detail-role`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags license-controller
     * @name SearchLicenseByAdmin
     * @summary Admin search licenses of business
     * @request GET:/api/admin/v1/license/get-licenses
     * @secure
     * @response `200` `BaseResponseListLicense` OK
     */
    searchLicenseByAdmin: (
      query: {
        /** @format int32 */
        page: number;
        /** @format int32 */
        companyId?: number;
        status?: "0" | "1";
        /** [name, licenseCode] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListLicense, any>({
        path: `/api/admin/v1/license/get-licenses`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name GetMyProfile
     * @summary Get my profile
     * @request GET:/api/admin/v1/get-my-profile
     * @secure
     * @response `200` `BaseResponseAdminLoginRes` OK
     */
    getMyProfile: (params: RequestParams = {}) =>
      this.http.request<BaseResponseAdminLoginRes, any>({
        path: `/api/admin/v1/get-my-profile`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name GetDetailAdmin
     * @summary Get detail admin
     * @request GET:/api/admin/v1/get-detail-admin
     * @secure
     * @response `200` `BaseResponseAdminDetailRes` OK
     */
    getDetailAdmin: (
      query: {
        /** @format int32 */
        adminId: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseAdminDetailRes, any>({
        path: `/api/admin/v1/get-detail-admin`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name GetAdmin
     * @summary Get admin list
     * @request GET:/api/admin/v1/get-admins
     * @secure
     * @response `200` `BaseResponseListAdminRes` OK
     */
    getAdmin: (
      query: {
        /** @format int32 */
        page: number;
        /** @format int32 */
        agencyId?: number;
        /**
         * Trạng thái của tài khoản admin: 0 - INACTIVE, 1 - ACTIVE
         * @format int32
         */
        status?: number;
        /** @format int32 */
        roleId?: number;
        /** [name, email] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListAdminRes, any>({
        path: `/api/admin/v1/get-admins`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags document-controller
     * @name GetDocumentsByAdmin
     * @summary Admin get list document
     * @request GET:/api/admin/v1/document/get-documents
     * @secure
     * @response `200` `BaseResponseListDocument` OK
     */
    getDocumentsByAdmin: (
      query: {
        /** @format int32 */
        page: number;
        /**
         * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
         * @format int32
         */
        status?: number;
        /** [code, name] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListDocument, any>({
        path: `/api/admin/v1/document/get-documents`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags document-controller
     * @name GetDetailDocumentsByAdmin
     * @summary Get detail document by admin
     * @request GET:/api/admin/v1/document/detail-document
     * @secure
     * @response `200` `BaseResponseDocument` OK
     */
    getDetailDocumentsByAdmin: (
      query: {
        /** @format int32 */
        documentId: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseDocument, any>({
        path: `/api/admin/v1/document/detail-document`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags company-controller
     * @name GetDetailCompany
     * @summary Get detail company
     * @request GET:/api/admin/v1/company/get-detail-company
     * @secure
     * @response `200` `BaseResponseCompany` OK
     */
    getDetailCompany: (
      query: {
        /** @format int32 */
        companyId: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseCompany, any>({
        path: `/api/admin/v1/company/get-detail-company`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags company-controller
     * @name GetCompanyList
     * @summary Get company with filter
     * @request GET:/api/admin/v1/company/get-companies
     * @secure
     * @response `200` `BaseResponseListCompanyRes` OK
     */
    getCompanyList: (
      query: {
        /** @format int32 */
        page: number;
        /** [name, email, code, hotline] */
        searchKeyword?: string;
        /**
         * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
         * @format int32
         */
        status?: number;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListCompanyRes, any>({
        path: `/api/admin/v1/company/get-companies`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags agency-controller
     * @name GetAgencyDetail
     * @summary Get detail agency
     * @request GET:/api/admin/v1/agency/get-detail-agency
     * @secure
     * @response `200` `BaseResponseAgencyRes` OK
     */
    getAgencyDetail: (
      query: {
        /** @format int32 */
        agencyId: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseAgencyRes, any>({
        path: `/api/admin/v1/agency/get-detail-agency`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags agency-controller
     * @name GetAgencyList
     * @summary Get agency list
     * @request GET:/api/admin/v1/agency/get-agencies
     * @secure
     * @response `200` `BaseResponseListAgencyRes` OK
     */
    getAgencyList: (
      query: {
        /** @format int32 */
        page: number;
        /**
         * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
         * @format int32
         */
        status?: number;
        /** [name, email, code, taxCode] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListAgencyRes, any>({
        path: `/api/admin/v1/agency/get-agencies`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
}
