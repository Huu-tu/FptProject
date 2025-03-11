import { TFunction } from 'i18next';
import { z } from 'zod';

export const documentSchema = (t: TFunction) =>
  z.object({
    name: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('title') }) })
      .min(1, t('error_message.please_enter_field', { field: t('title') })),
    description: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('description') }) })
      .min(1, t('error_message.please_enter_field', { field: t('description') })),
    content: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('content') }) })
      .min(1, t('error_message.please_enter_field', { field: t('content') })),
  });

export type FormDocumentSchema = z.infer<ReturnType<typeof documentSchema>>;
