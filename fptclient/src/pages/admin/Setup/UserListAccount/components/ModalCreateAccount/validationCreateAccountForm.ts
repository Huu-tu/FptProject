import { REGEX } from 'config/constants';
import { TFunction } from 'i18next';
import { z } from 'zod';

export const validationCreateAccountForm = (t: TFunction) =>
  z
    .object({
      name: z.string({
        required_error: t('error_message.please_enter_field', { field: t('name_account') }),
      }),
      permission: z.string().optional(),
      address: z.string({
        required_error: t('error_message.please_enter_field', { field: t('address') }),
      }),
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
      password: z
        .string({
          required_error: t('error_message.please_enter_field', { field: t('auth.password') }),
        })
        .min(6, t('error_message.please_enter_field', { field: t('auth.password') })),
      confirmPassword: z
        .string({
          required_error: t('error_message.please_enter_field', { field: t('auth.password') }),
        })
        .min(6, t('error_message.please_enter_field', { field: t('auth.password') })),
      status: z.number().optional(),
      roleId: z.number().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('error_message.field_not_match', { field: t('password') }),
      path: ['confirmPassword'],
    });

export type FormCreateAccountSchema = z.infer<ReturnType<typeof validationCreateAccountForm>>;
