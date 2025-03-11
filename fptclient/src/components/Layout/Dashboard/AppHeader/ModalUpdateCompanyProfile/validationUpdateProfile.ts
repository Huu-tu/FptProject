import { REGEX } from 'config/constants';
import { TFunction } from 'i18next';
import { z } from 'zod';

export const validationUpdateProfile = (t: TFunction) =>
  z.object({
    avatarId: z.number().optional(),
    name: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('name_account') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('name_account') })),
    address: z.any().optional(),
    phone: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('phone') }),
      })
      .regex(REGEX.PHONE, t('error_message.field_invalid', { field: t('phone') }))
      .optional()
      .nullable(),
    birthday: z.any().optional(),
    gender: z.any().optional(),
  });

export type FormUpdateProfile = z.infer<ReturnType<typeof validationUpdateProfile>>;
