import { REGEX } from 'config/constants';
import { TFunction } from 'i18next';
import { z } from 'zod';

export const validationAddUpdateAccountForm = (t: TFunction, isUpdate: boolean) =>
  z
    .object({
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
      birthday: z.any().optional(),
      gender: z.number().optional(),
      status: z.number().optional(),
      password: isUpdate
        ? z.any().optional()
        : z
            .string({
              required_error: t('error_message.please_enter_field', { field: t('auth.password') }),
            })
            .min(6, t('error_message.please_enter_field', { field: t('auth.password') })),
      confirmPassword: isUpdate
        ? z.any().optional()
        : z
            .string({
              required_error: t('error_message.please_enter_field', { field: t('auth.password') }),
            })
            .min(6, t('error_message.please_enter_field', { field: t('auth.password') })),
      roleId: z.number().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('error_message.field_not_match', { field: t('password') }),
      path: ['confirmPassword'],
    });

export type FormAddUpdateAccountSchema = z.infer<ReturnType<typeof validationAddUpdateAccountForm>>;
