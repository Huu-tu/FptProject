import type { FC } from 'react';

import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { AppAuthentication } from 'components/Layout/Auth/AppAuthentication';
import { PUBLIC_ROUTERS } from 'config/constants';
import { useSentOTPProvider, useValidation } from 'libs/hooks';
import { openModal } from 'store/slices/modalSlice';
import { EPurposeSendOtpReq, ESendOtpReq } from 'types';
import { IFormBoxItem } from 'types/components';
import ModalVerifyPhoneNumber from './components/ModalVerifyPhoneNumber';
import { FormRegisterProviderSchema, registerProviderSchema } from './validationRegisterForm';

export const RegisterPage: FC = () => {
  const { t } = useTranslation();

  const [form, rule] = useValidation(registerProviderSchema(t));
  const { mutate: sentOTP, isPending } = useSentOTPProvider();

  const handleSubmitForm = (values: FormRegisterProviderSchema): void => {
    sentOTP(
      {
        purpose: EPurposeSendOtpReq.REGISTRATION,
        type: ESendOtpReq.ZNS,
        email: values.email,
        phone: values.phone,
      },
      {
        onSuccess: (res) => {
          openModal({
            content: <ModalVerifyPhoneNumber registerFormValue={values} otpRes={res.data} />,
            options: {
              title: t('auth.verify_phone_number'),
              width: 800,
            },
          });
        },
      },
    );
  };

  const formItems: IFormBoxItem<FormRegisterProviderSchema>[] = [
    {
      name: 'nameBusiness',
      label: t('auth.business_name'),
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.business_name') })} />,
    },
    {
      name: 'taxCode',
      label: t('auth.tax_code'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.tax_code') })} />,
    },
    {
      name: 'name',
      label: t('auth.account_name'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.account_name') })} />,
    },
    {
      name: 'address',
      label: t('auth.address'),
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.address') })} />,
    },
    {
      name: 'phone',
      label: t('auth.phone'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.phone') })} />,
    },
    {
      name: 'email',
      label: t('auth.email'),
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.email') })} />,
    },
    {
      name: 'password',
      label: t('auth.password'),
      required: true,
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.password') })} />,
    },
    {
      name: 'confirmPassword',
      label: t('auth.confirm_password'),
      rules: [
        rule,
        {
          validator(_, value) {
            // not show err when not typing retype pw
            if (!value || value === form.getFieldValue('password')) {
              return Promise.resolve();
            }
            return Promise.reject(t('error_message.field_not_match', { field: t('auth.password') }));
          },
        },
      ],
      required: true,
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.confirm_password') })} />,
    },
  ];

  return (
    <AppAuthentication title={t('auth.register')}>
      <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
        <FormBoxItem listItems={formItems} columnGap={[20, 5]} rule={rule} />

        <div>
          <Button htmlType="submit" type="primary" loading={isPending} block className="mt-10 font-semibold">
            {t('auth.register')}
          </Button>

          <div className="mt-4 text-center italic">
            {t('auth.have_account')}.
            <Link to={PUBLIC_ROUTERS.LOGIN} className="ml-2 cursor-pointer font-semibold text-primary">
              {t('auth.login')}
            </Link>
          </div>
        </div>
      </Form>
    </AppAuthentication>
  );
};
