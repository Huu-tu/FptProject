import type { FC } from 'react';

import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { AppAuthentication } from 'components/Layout/Auth/AppAuthentication';
import classes from 'components/Layout/Auth/AppAuthentication/AppAuthentication.module.scss';
import { TFunction } from 'i18next';
import { useValidation } from 'libs/hooks';
import { useSentOTPAdmin } from 'libs/hooks/api/useAuth';
import { navigateToPublicRoute } from 'routes';
import { openModal } from 'store/slices/modalSlice';
import { EPurposeSendOtpReq, ESendOtpReq } from 'types';
import { z } from 'zod';
import ModalVerifyEmail from './components/ModalVerifyEmail';

const schema = (t: TFunction) =>
  z.object({
    email: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('auth.email') }) })
      .email(t('error_message.field_invalid', { field: t('auth.email') })),
  });
type FormSchema = z.infer<ReturnType<typeof schema>>;

export const ForgotPasswordAdminPage: FC = () => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(schema(t));
  const { mutate: sentOTP, isPending } = useSentOTPAdmin();

  const handleSubmitForm = (values: FormSchema) => {
    sentOTP(
      {
        purpose: EPurposeSendOtpReq.PASSWORD_RESET,
        type: ESendOtpReq.EMAIL,
        email: values.email,
      },
      {
        onSuccess: (res) => {
          openModal({
            content: <ModalVerifyEmail otpRes={res.data} />,
            options: {
              title: t('auth.verify_email'),
              width: 800,
            },
          });
        },
      },
    );
  };

  return (
    <AppAuthentication title={t('auth.forgot_password')}>
      <Form form={form} layout="vertical" onFinish={handleSubmitForm} className={classes['authentication_form']}>
        <div className="relative">
          <Form.Item name="email" label={t('auth.email')} rules={[rule]}>
            <Input placeholder={t('placeholder.enter_field', { field: t('auth.email') })} />
          </Form.Item>
          <div className="absolute right-0 top-0">
            <Link to={navigateToPublicRoute()} className="text-sm text-primary no-underline">
              <span>{t('auth.back_to_login')}</span>
            </Link>
          </div>
        </div>
        <Button
          block
          htmlType="submit"
          loading={isPending}
          type="primary"
          className="flex h-10 items-center justify-center font-semibold"
        >
          {t('auth.continue')}
        </Button>
      </Form>
    </AppAuthentication>
  );
};
