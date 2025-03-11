import type { FC } from 'react';

import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PUBLIC_ROUTERS, REGEX } from 'config/constants';

import { AppAuthentication } from 'components/Layout/Auth/AppAuthentication';
import classes from 'components/Layout/Auth/AppAuthentication/AppAuthentication.module.scss';
import { TFunction } from 'i18next';
import { useSentOTPProvider, useValidation } from 'libs/hooks';
import { openModal } from 'store/slices/modalSlice';
import { EPurposeSendOtpReq, ESendOtpReq } from 'types';
import { z } from 'zod';
import ModalVerifyPhoneNumber from './components/ModalVerifyPhoneNumber';

const schema = (t: TFunction) =>
  z.object({
    phone: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('auth.phone') }) })
      .regex(REGEX.PHONE, t('error_message.field_invalid', { field: t('auth.phone') })),
  });
type FormSchema = z.infer<ReturnType<typeof schema>>;

export const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(schema(t));
  const { mutate: sentOTP, isPending } = useSentOTPProvider();

  const handleSubmitForm = (values: FormSchema) => {
    sentOTP(
      {
        purpose: EPurposeSendOtpReq.PASSWORD_RESET,
        type: ESendOtpReq.ZNS,
        phone: values.phone,
      },
      {
        onSuccess: (res) => {
          openModal({
            content: <ModalVerifyPhoneNumber otpRes={res.data} />,
            options: {
              title: t('auth.verify_phone_number'),
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
          <Form.Item name="phone" label={t('auth.phone')} rules={[rule]}>
            <Input placeholder={t('placeholder.enter_field', { field: t('auth.phone') })} />
          </Form.Item>
          <div className="absolute right-0 top-0">
            <Link to={PUBLIC_ROUTERS.LOGIN} className="text-sm text-primary no-underline">
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
