import { TFunction } from 'i18next';
import { z } from 'zod';

export const validationUpdateSupport = (t: TFunction) =>
  z.object({
    name: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('company_name') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('company_name') })),
    content: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('content') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('content') })),
    status: z.any().optional(),
  });

export type FormUpdateSupport = z.infer<ReturnType<typeof validationUpdateSupport>>;
