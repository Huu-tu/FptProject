import { REGEX } from 'config/constants';
import { TFunction } from 'i18next';
import { z } from 'zod';

export const validationUpdateAccountForm = (t: TFunction) =>
  z.object({
    id: z.number().optional(),
    avatarId: z.number().optional(),
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
        required_error: t('error_message.please_enter_field', { field: t('email') }),
      })
      .email(t('error_message.field_invalid', { field: t('auth.email') })),
    birthday: z.any().optional(),
    gender: z.number().optional(),
    status: z.number().optional(),
    roleId: z.number().optional(),
  });

export type FormUpdateAccountSchema = z.infer<ReturnType<typeof validationUpdateAccountForm>>;
