import { Form, Input } from 'antd';
import SelectRole from 'components/atomic/admin/company/SelectRole.tsx';
import { SelectRoleType } from 'components/atomic/common/RoleType.tsx';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem.tsx';
import { useCreateAdminAccount, useValidation } from 'libs/hooks';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType, Status } from 'types';
import { IFormBoxItem } from 'types/components';
import { FormCreateAccountSchema, validationCreateAccountForm } from './validationCreateAccountForm.ts';

const screen: ScreenType = 'ADMIN_ACCOUNT';

export const ModalCreateAccount = () => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationCreateAccountForm(t));
  const { mutate: createUserAccount } = useCreateAdminAccount();

  const formItems: IFormBoxItem<FormCreateAccountSchema>[] = [
    {
      name: 'name',
      label: t('name_account'),
      required: true,
      children: <Input placeholder={t('name_account')} />,
    },
    {
      name: 'email',
      label: t('email'),
      required: true,
      children: <Input placeholder={t('email')} />,
    },
    {
      name: 'phone',
      label: t('phone'),
      required: true,
      children: <Input placeholder={t('phone')} />,
    },
    {
      name: 'address',
      label: t('address'),
      required: true,
      children: <Input placeholder={t('address')} />,
    },
    {
      label: t('group_permission'),
      required: true,
      children: <SelectRoleType open={false} />,
    },
    {
      name: 'roleId',
      label: t('role'),
      required: true,
      children: <SelectRole />,
    },
    {
      name: 'password',
      label: t('password'),
      required: true,
      children: <Input.Password placeholder={t('password')} />,
    },
    {
      name: 'confirmPassword',
      label: t('confirmPassword'),
      required: true,
      children: <Input.Password placeholder={t('confirmPassword')} />,
    },
    {
      span: 24,
      isFormItem: false,
      children: <ButtonGlobal.Footer isUpdate={false} screen={screen} />,
    },
  ];

  const handleCreateAccountSubmit = (value: FormCreateAccountSchema) => {
    createUserAccount(
      {
        ...value,
        status: Status.ACTIVE,
      },
      {
        onSuccess: () => {
          removeModal();
        },
      },
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleCreateAccountSubmit} autoComplete="off">
      <FormBoxItem listItems={formItems} columnGap={[20, 10]} rule={rule} />
    </Form>
  );
};
