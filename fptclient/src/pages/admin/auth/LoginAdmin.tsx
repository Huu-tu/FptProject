import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

import { PUBLIC_ROUTERS } from 'config/constants';

import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { AppAuthentication } from 'components/Layout/Auth/AppAuthentication';
import classes from 'components/Layout/Auth/AppAuthentication/AppAuthentication.module.scss';
import { TFunction } from 'i18next';
import { useLoginAdmin, useValidation } from 'libs/hooks';
import { useTranslation } from 'react-i18next';
import { IFormBoxItem } from 'types/components';
import { z } from 'zod';

const schema = (t: TFunction) =>
  z.object({
    email: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('auth.email') }) })
      .email(t('error_message.field_invalid', { field: t('auth.email') })),
    password: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('auth.password') }) })
      .min(6, t('error_message.min_length_field', { field: t('auth.password'), length: 6 })),
  });

type FormSchema = z.infer<ReturnType<typeof schema>>;

export const LoginAdminPage = () => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(schema(t));

  const { mutateAsync: login, isPending } = useLoginAdmin();

  const handleSubmitForm = (values: FormSchema) => {
    login({
      email: values.email.trim(),
      password: values.password.trim(),
    });
  };

  const formListItems: IFormBoxItem<FormSchema>[] = [
    {
      name: 'email',
      label: t('auth.email'),
      children: <Input placeholder="yourname@company.com" defaultValue={'admin@gmail.com'} />,
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
            to={PUBLIC_ROUTERS.ADMIN_FORGOT_PASSWORD}
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
        className={classes['authentication_form']}
        initialValues={{
          email: 'admin@gmail.com',
          password: '123456',
        }}
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
        </div>
      </Form>
    </AppAuthentication>
  );
};
