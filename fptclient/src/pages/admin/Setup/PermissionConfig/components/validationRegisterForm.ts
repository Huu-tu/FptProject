import { TFunction } from 'i18next';
import { z } from 'zod';

const permissionSchema = (t: TFunction) =>
  z.object({
    id: z.number({ required_error: t('error_message.please_enter_field', { field: t('config_name') }) }),
    view: z.boolean(),
    approval: z.boolean(),
    write: z.boolean(),
    decision: z.boolean(),
  });

export const adminRoleSchema = (t: TFunction) =>
  z.object({
    name: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('config_name') }) })
      .min(1, t('error_message.please_enter_field', { field: t('config_name') })),
    note: z.string().optional(),
    type: z.number({ required_error: t('error_message.please_enter_field', { field: t('type') }) }),
    status: z.boolean().optional(),
    permissions: z.array(permissionSchema(t)).optional(),
  });

export type FormAdminRoleSchemaSchema = z.infer<ReturnType<typeof adminRoleSchema>>;
