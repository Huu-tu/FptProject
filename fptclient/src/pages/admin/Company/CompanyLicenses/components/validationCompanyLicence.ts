import { TFunction } from 'i18next';
import { z } from 'zod';

export const companyLicenseSchema = (t: TFunction) =>
  z.object({
    name: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('license_name') }) })
      .min(1, t('error_message.please_enter_field', { field: t('license_name') })),
    whitelistIp: z.string().optional(),
    redirectUri: z.string().optional(),
    expireAt: z.any().optional(),
    companyId: z.string().optional(),
    secretCode: z.string().optional(),
    scope: z.array(z.string()).optional(),
    status: z.any().optional(),
  });

export type FormRegisterProviderSchema = z.infer<ReturnType<typeof companyLicenseSchema>>;
