import { Form, Input } from 'antd';
import SelectRole from 'components/atomic/admin/company/SelectRole.tsx';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem.tsx';
import { useCreateUser, useValidation } from 'libs/hooks';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';
import { FormCreateEmployeeSchema, createEmployeeSchema } from './validationCreateEmployee.ts';

const screen: ScreenType = 'ADMIN_BUSINESS';

const ModalCreateEmployee = ({ companyId }: { companyId: number }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(createEmployeeSchema(t));

  const { mutate: createUser, isPending } = useCreateUser();

  const formItems: IFormBoxItem<FormCreateEmployeeSchema>[] = [
    {
      name: 'name',
      label: t('name_account'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('name_account') })} />,
    },
    {
      name: 'email',
      label: t('email'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('email') })} />,
    },
    {
      name: 'phone',
      label: t('phone'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('phone') })} />,
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
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('password') })} />,
    },
    {
      name: 'confirmPassword',
      label: t('confirmPassword'),
      rules: [
        {
          validator(_, value) {
            if (value === form.getFieldValue('password')) {
              return Promise.resolve();
            }
            return Promise.reject(t('error_message.field_not_match', { field: t('password') }));
          },
        },
      ],
      required: true,
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('confirmPassword') })} />,
    },
  ];

  const handleCreateUser = (value: FormCreateEmployeeSchema) => {
    createUser(
      { ...value, companyId: companyId, valid: true },
      {
        onSuccess: () => {
          removeModal();
        },
      },
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleCreateUser}>
      <FormBoxItem listItems={formItems} columnGap={[20, 5]} rule={rule} />

      <ButtonGlobal.Footer isUpdate={false} htmlType="submit" loading={isPending} screen={screen} />
    </Form>
  );
};

export default ModalCreateEmployee;
