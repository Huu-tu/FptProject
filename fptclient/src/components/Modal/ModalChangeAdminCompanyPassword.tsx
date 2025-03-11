import { Form, Input } from 'antd';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { TFunction } from 'i18next';
import { useUpdateOtherAdminPassword, useValidation } from 'libs/hooks';
import { useUpdateOtherCompanyPassword } from 'libs/hooks/api/company/useCompany';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { IFormBoxItem } from 'types/components';
import { z } from 'zod';
import { app } from 'routes/index';
import { APP } from 'config/constants';

const changePasswordSchema = (t: TFunction) => {
  return z
    .object({
      newPassword: z
        .string({
          required_error: t('error_message.please_enter_field', { field: t('auth.new_password') }),
        })
        .min(1, t('error_message.please_enter_field', { field: t('auth.new_password') })),
      confirmPassword: z
        .string({
          required_error: t('error_message.please_enter_field', { field: t('auth.new_password') }),
        })
        .min(1, t('error_message.please_enter_field', { field: t('auth.new_password') })),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('error_message.field_not_match', { field: t('password') }),
      path: ['confirmPassword'],
    });
};

type FormChangePasswordSchema = z.infer<ReturnType<typeof changePasswordSchema>>;

const ModalChangeAdminCompanyPassword = ({ id }: { id: number }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(changePasswordSchema(t));
  const { mutate: updateAnotherAdminPassword } = useUpdateOtherAdminPassword();
  const { mutate: updateCompanyPassword } = useUpdateOtherCompanyPassword();

  const formItems: IFormBoxItem<FormChangePasswordSchema>[] = [
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

  const handleSubmitForm = (value: FormChangePasswordSchema) => {
    app === APP.ADMIN
      ? updateAnotherAdminPassword({ ...value, adminId: id }, { onSuccess: () => removeModal() })
      : updateCompanyPassword({ ...value, userId: id }, { onSuccess: () => removeModal() });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
      <FormBoxItem listItems={formItems} defaultSpan={24} columnGap={[20, 5]} rule={rule} />
      <ButtonGlobal.Footer isUpdate />
    </Form>
  );
};

export default ModalChangeAdminCompanyPassword;
