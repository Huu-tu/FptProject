import { REGEX } from 'config/constants';
import { TFunction } from 'i18next';
import { z } from 'zod';

export const createEmployeeSchema = (t: TFunction) =>
  z.object({
    name: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('name_account') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('name_account') })),
    email: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('email') }),
      })
      .email(t('error_message.field_invalid', { field: t('email') })),
    phone: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('phone') }),
      })
      .regex(REGEX.PHONE, t('error_message.field_invalid', { field: t('phone') })),
    password: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('password') }) })
      .min(6, t('error_message.please_enter_field', { field: t('password') })),
    confirmPassword: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('password') }) })
      .min(6, t('error_message.please_enter_field', { field: t('password') })),
    roleId: z.number({
      required_error: t('error_message.please_enter_field', { field: t('role') }),
    }),
  });

export type FormCreateEmployeeSchema = z.infer<ReturnType<typeof createEmployeeSchema>>;
