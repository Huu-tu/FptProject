import { type FC } from 'react';

import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

import { PUBLIC_ROUTERS, REGEX } from 'config/constants';

import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { AppAuthentication } from 'components/Layout/Auth/AppAuthentication';
import classes from 'components/Layout/Auth/AppAuthentication/AppAuthentication.module.scss';
import type { TFunction } from 'i18next';
import { useLoginProvider, useValidation } from 'libs/hooks';
import { useTranslation } from 'react-i18next';
import { IFormBoxItem } from 'types/components';
import { z } from 'zod';

const schema = (t: TFunction) =>
  z.object({
    phone: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('auth.phone') }),
      })
      .regex(REGEX.PHONE, t('error_message.field_invalid', { field: t('auth.phone') })),
    password: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('auth.password') }) })
      .min(6, t('error_message.min_length_field', { field: t('auth.password'), length: 6 })),
  });

type FormSchema = z.infer<ReturnType<typeof schema>>;

export const LoginPage: FC = () => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(schema(t));

  const { mutateAsync: login, isPending } = useLoginProvider();

  const handleSubmitForm = (values: FormSchema): void => {
    login({
      phone: values.phone.trim(),
      password: values.password.trim(),
    });
  };

  const formListItems: IFormBoxItem<FormSchema>[] = [
    {
      name: 'phone',
      label: t('auth.phone'),
      children: (
        <Input placeholder={t('placeholder.enter_field', { field: t('auth.phone') })} defaultValue={'0365517544'} />
      ),
    },
    {
      name: 'password',
      label: t('auth.password'),
      children: (
        <div className="relative">
          <Input.Password
            placeholder={t('placeholder.enter_field', { field: t('auth.password') })}
            defaultValue={'123456'}
          />
          <Link
            to={PUBLIC_ROUTERS.FORGOT_PASSWORD}
            className="absolute right-0 top-[-28px] text-sm text-primary no-underline"
          >
            <span>{t('auth.forgot_password')}</span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <AppAuthentication title={t('auth.login')} description={t('auth.paragraph.login_description')}>
      <Form
        layout="vertical"
        form={form}
        autoComplete="off"
        onFinish={handleSubmitForm}
        initialValues={{
          phone: '0365517544',
          password: '123456',
        }}
        className={classes['authentication_form']}
      >
        <FormBoxItem listItems={formListItems} defaultSpan={24} columnGap={[20, 5]} rule={rule} />
        <div className={classes['login_button']}>
          <Button
            htmlType="submit"
            type="primary"
            block
            loading={isPending}
            className="mt-10 flex items-center justify-center font-semibold"
          >
            {t('auth.login')}
          </Button>

          <div className="mt-4 text-center italic">
            {t('auth.not_account')}.
            <Link to={PUBLIC_ROUTERS.REGISTER} className="ml-2 cursor-pointer font-semibold text-primary">
              {t('auth.register')}
            </Link>
          </div>
        </div>
      </Form>
    </AppAuthentication>
  );
};
