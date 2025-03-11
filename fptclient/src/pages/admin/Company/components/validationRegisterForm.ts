import { REGEX } from 'config/constants';
import { TFunction } from 'i18next';
import { z } from 'zod';

export const companySchema = (t: TFunction, isUpdate: boolean) =>
  z
    .object({
      logoId: z.number().optional(),
      nameBusiness: z
        .string({
          required_error: t('error_message.please_enter_field', { field: t('auth.business_name') }),
        })
        .min(1, t('error_message.please_enter_field', { field: t('auth.business_name') })),
      taxCode: z
        .string({ required_error: t('error_message.please_enter_field', { field: t('auth.tax_code') }) })
        .min(1, t('error_message.please_enter_field', { field: t('auth.tax_code') })),
      name: isUpdate
        ? z.any().optional()
        : z
            .string({ required_error: t('error_message.please_enter_field', { field: t('auth.account_name') }) })
            .min(1, t('error_message.please_enter_field', { field: t('auth.account_name') })),
      address: z.string().optional(),
      phone: z
        .string({ required_error: t('error_message.please_enter_field', { field: t('auth.phone') }) })
        .regex(REGEX.PHONE, t('error_message.field_invalid', { field: t('auth.phone') })),
      email: z
        .string()
        .max(0, t('error_message.field_invalid', { field: t('auth.email') }))
        .or(z.string().email(t('error_message.field_invalid', { field: t('auth.email') }))),
      agencyId: z.any().optional(),
      password: isUpdate
        ? z.any().optional()
        : z
            .string({ required_error: t('error_message.please_enter_field', { field: t('auth.password') }) })
            .min(6, t('error_message.please_enter_field', { field: t('auth.password') })),
      confirmPassword: isUpdate
        ? z.any().optional()
        : z
            .string({ required_error: t('error_message.please_enter_field', { field: t('auth.password') }) })
            .min(6, t('error_message.please_enter_field', { field: t('auth.password') })),
      codeId: z.number().optional(),
      status: z.number().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('error_message.field_not_match', { field: t('password') }),
      path: ['confirmPassword'],
    });

export type FormRegisterProviderSchema = z.infer<ReturnType<typeof companySchema>>;
