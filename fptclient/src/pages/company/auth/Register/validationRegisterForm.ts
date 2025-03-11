import { REGEX } from 'config/constants';
import { TFunction } from 'i18next';
import { z } from 'zod';

export const registerProviderSchema = (t: TFunction) =>
  z
    .object({
      logoId: z.number().optional(),
      nameBusiness: z.string().optional(),
      taxCode: z
        .string({ required_error: t('error_message.please_enter_field', { field: t('auth.tax_code') }) })
        .min(1, t('error_message.please_enter_field', { field: t('auth.tax_code') })),
      name: z
        .string({ required_error: t('error_message.please_enter_field', { field: t('auth.account_name') }) })
        .min(1, t('error_message.please_enter_field', { field: t('auth.account_name') })),
      address: z.string().optional(),
      phone: z
        .string({ required_error: t('error_message.please_enter_field', { field: t('auth.phone') }) })
        .regex(REGEX.PHONE, t('error_message.field_invalid', { field: t('auth.phone') })),
      email: z
        .string({ required_error: t('error_message.please_enter_field', { field: t('auth.email') }) })
        .email(t('error_message.field_invalid', { field: t('auth.email') })),
      agencyId: z.number().optional(),
      password: z
        .string({ required_error: t('error_message.please_enter_field', { field: t('auth.password') }) })
        .min(6, t('error_message.min_length_field', { field: t('auth.password'), length: 6 })),
      confirmPassword: z
        .string({ required_error: t('error_message.please_enter_field', { field: t('auth.password') }) })
        .min(6, t('error_message.min_length_field', { field: t('auth.password'), length: 6 })),
      codeId: z.number().optional(),
      code: z
        .string({ required_error: t('error_message.please_enter_field', { field: t('auth.code') }) })
        .min(1, t('error_message.please_enter_field', { field: t('auth.code') })),
    })
    .refine((data) => data.password !== data.confirmPassword, {
      message: t('error_message.field_not_match', { field: t('password') }),
      path: ['confirmPassword'],
    });

export type FormRegisterProviderSchema = z.infer<ReturnType<typeof registerProviderSchema>>;
