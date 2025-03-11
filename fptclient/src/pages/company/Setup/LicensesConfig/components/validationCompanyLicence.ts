import { TFunction } from 'i18next';
import { z } from 'zod';

export const companyLicenseSchema = (t: TFunction) =>
  z.object({
    name: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('license_name') }) })
      .min(1, t('error_message.please_enter_field', { field: t('license_name') })),
    whitelistIp: z.any().optional(),
    redirectUri: z.any().optional(),
    expireAt: z.any().optional(),
    companyId: z.any().optional(),
    secretCode: z.any().optional(),
    scope: z.array(z.any()).optional(),
    status: z.any().optional(),
  });

export type FormRegisterProviderSchema = z.infer<ReturnType<typeof companyLicenseSchema>>;
