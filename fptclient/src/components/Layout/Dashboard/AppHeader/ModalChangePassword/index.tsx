import { Form, Input } from 'antd';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { APP } from 'config/constants';
import { useSelfUpdatePassword, useValidation } from 'libs/hooks';
import { useSelfUpdateCompanyPassword } from 'libs/hooks/api/company/useCompany';
import { useTranslation } from 'react-i18next';
import { app } from 'routes/index';
import { removeModal } from 'store/slices/modalSlice.ts';
import { IFormBoxItem } from 'types/components';
import { ChangePasswordReq } from 'types/SwaggerTypeUser.ts';
import { changePasswordSchema, FormChangePasswordSchema } from './validationChangePassword';

const ModalChangePassword = () => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(changePasswordSchema(t));
  const { mutate: updateAdminPassword } = useSelfUpdatePassword();
  const { mutate: updateCompanyPassword } = useSelfUpdateCompanyPassword();

  const formItems: IFormBoxItem<FormChangePasswordSchema>[] = [
    {
      name: 'oldPassword',
      label: t('old_password'),
      required: true,
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('old_password') })} />,
    },
    {
      name: 'newPassword',
      label: t('auth.new_password'),
      required: true,
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.new_password') })} />,
    },
    {
      name: 'confirmPassword',
      label: t('auth.confirm_new_password'),
      required: true,
      children: (
        <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.confirm_new_password') })} />
      ),
    },
  ];

  const handleSubmitForm = (value: ChangePasswordReq) => {
    app === APP.ADMIN
      ? updateAdminPassword(
          { ...value, valid: true },
          {
            onSuccess: () => {
              removeModal();
            },
          },
        )
      : updateCompanyPassword(
          { ...value },
          {
            onSuccess: () => {
              removeModal();
            },
          },
        );
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
      <FormBoxItem listItems={formItems} defaultSpan={24} columnGap={[20, 5]} rule={rule} />

      <ButtonGlobal.Footer isUpdate />
    </Form>
  );
};

export default ModalChangePassword;
