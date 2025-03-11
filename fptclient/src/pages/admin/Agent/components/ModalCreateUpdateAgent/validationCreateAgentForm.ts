import { REGEX } from 'config/constants';
import { TFunction } from 'i18next';
import { z } from 'zod';

export const createUpdateAgentSchema = (t: TFunction, isUpdate: boolean) =>
  z.object({
    name: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('auth.agent_name') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('auth.agent_name') })),
    taxCode: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('auth.tax_code') }),
      })
      .optional(),
    address: z.string().optional(),
    phone: z
      .string()
      .regex(REGEX.PHONE, t('error_message.field_invalid', { field: t('auth.phone') }))
      .optional(),
    email: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('auth.email') }),
      })
      .email(t('error_message.field_invalid', { field: t('auth.email') })),
    accountName: isUpdate
      ? z.any().optional()
      : z
          .string({
            required_error: t('error_message.please_enter_field', { field: t('auth.account_name') }),
          })
          .min(6, t('error_message.min_length_field', { field: t('auth.account_name'), length: 6 })),
    status: z.number().optional(),
    password: isUpdate
      ? z.any().optional()
      : z
          .string({
            required_error: t('error_message.please_enter_field', { field: t('auth.password') }),
          })
          .min(6, t('error_message.min_length_field', { field: t('auth.password'), length: 6 })),
    confirmPassword: isUpdate
      ? z.any().optional()
      : z
          .string({
            required_error: t('error_message.please_enter_field', { field: t('auth.password') }),
          })
          .min(6, t('error_message.min_length_field', { field: t('auth.password'), length: 6 })),
  });

export type FormCreateUpdateAgentSchema = z.infer<ReturnType<typeof createUpdateAgentSchema>>;
