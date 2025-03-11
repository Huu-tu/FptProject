import { REGEX } from 'config/constants';
import { TFunction } from 'i18next';
import { z } from 'zod';

export const validationAgentAccount = (t: TFunction, isUpdate: boolean) =>
  z.object({
    name: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('name_account') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('name_account') })),
    permission: z.string().optional(),
    address: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('address') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('address') })),
    phone: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('phone') }),
      })
      .regex(REGEX.PHONE, t('error_message.field_invalid', { field: t('phone') })),
    email: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('auth.email') }),
      })
      .email(t('error_message.field_invalid', { field: t('auth.email') })),
    password: isUpdate
      ? z.string().optional()
      : z
          .string({
            required_error: t('error_message.please_enter_field', { field: t('auth.password') }),
          })
          .min(6, t('error_message.please_enter_field', { field: t('auth.password') })),
    confirmPassword: isUpdate
      ? z.string().optional()
      : z
          .string({
            required_error: t('error_message.please_enter_field', { field: t('auth.password') }),
          })
          .min(6, t('error_message.please_enter_field', { field: t('auth.password') })),

    status: z.number().optional(),
    roleId: z.number({ required_error: t('error_message.please_enter_field', { field: t('role') }) }),
    gender: z.any().optional(),
    birthday: z.any().optional(),
  });

export type FormAgentAccountSchema = z.infer<ReturnType<typeof validationAgentAccount>>;
