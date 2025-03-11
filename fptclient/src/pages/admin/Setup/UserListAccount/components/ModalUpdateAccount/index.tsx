import { DatePicker, Form, Input } from 'antd';
import SelectRole from 'components/atomic/admin/company/SelectRole';
import { SelectGender } from 'components/atomic/common/Gender.tsx';
import { SelectRoleType } from 'components/atomic/common/RoleType';
import { SelectStatus } from 'components/atomic/common/Status.tsx';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem.tsx';
import { FORMAT_DATE } from 'config/constants';
import dayjs from 'dayjs';
import { useUpdateAdminAccount, useValidation } from 'libs/hooks';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';
import { AdminRes } from 'types/SwaggerTypeAdmin.ts';
import { FormUpdateAccountSchema, validationUpdateAccountForm } from './validationUpdateAccountForm';

export const ModalUpdateAccount = ({ admin, screen }: { admin: AdminRes; screen: ScreenType }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationUpdateAccountForm(t));

  const { mutate: updateUserAccount } = useUpdateAdminAccount();

  const formItems: IFormBoxItem<FormUpdateAccountSchema>[] = [
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
      name: 'gender',
      label: t('gender'),
      required: true,
      children: <SelectGender />,
    },
    {
      name: 'birthday',
      label: t('birthday'),
      required: true,
      children: (
        <DatePicker className={'w-full'} format={FORMAT_DATE.ASIA_HO_CHI_MINH} disabledDate={(d) => d > dayjs()} />
      ),
    },
    {
      name: 'status',
      label: t('status'),
      required: true,
      children: <SelectStatus screen={screen} />,
    },
    {
      span: 24,
      isFormItem: false,
      children: <ButtonGlobal.Footer isUpdate screen={screen} />,
    },
  ];

  const handleUpdateAccount = (values: FormUpdateAccountSchema) => {
    updateUserAccount(
      {
        ...values,
        id: admin.id,
        birthday: values.birthday && dayjs(values.birthday).format(FORMAT_DATE.SEND_REQUEST_SERVER),
      },
      {
        onSuccess: () => {
          removeModal();
        },
      },
    );
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ ...admin, birthday: admin.birthday ? dayjs(admin.birthday) : '' }}
        onFinish={handleUpdateAccount}
        autoComplete="off"
      >
        <FormBoxItem listItems={formItems} columnGap={[20, 5]} rule={rule} />
      </Form>
    </div>
  );
};
