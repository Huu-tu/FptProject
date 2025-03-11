import { TFunction } from 'i18next';
import { z } from 'zod';

export const changePasswordSchema = (t: TFunction) =>
  z
    .object({
      oldPassword: z
        .string({ required_error: t('error_message.please_enter_field', { field: t('old_password') }) })
        .min(1, t('error_message.please_enter_field', { field: t('old_password') })),
      newPassword: z
        .string({
          required_error: t('error_message.please_enter_field', { field: t('auth.new_password') }),
        })
        .min(1, t('error_message.please_enter_field', { field: t('auth.new_password') })),
      confirmPassword: z
        .string({
          required_error: t('error_message.please_enter_field', { field: t('auth.new_password') }),
        })
        .min(1, t('error_message.please_enter_field', { field: t('auth.new_password') })),
      valid: z.boolean().optional(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('error_message.field_not_match', { field: t('password') }),
      path: ['confirmPassword'],
    });
export type FormChangePasswordSchema = z.infer<ReturnType<typeof changePasswordSchema>>;
