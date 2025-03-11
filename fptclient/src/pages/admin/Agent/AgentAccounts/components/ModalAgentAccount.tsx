import { DatePicker, Form, Input } from 'antd';
import SelectRole from 'components/atomic/admin/company/SelectRole';
import { SelectGender } from 'components/atomic/common/Gender';
import { SelectRoleType } from 'components/atomic/common/RoleType';
import { SelectStatus } from 'components/atomic/common/Status';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { FORMAT_DATE } from 'config/constants';
import dayjs from 'dayjs';
import { useCreateAdminAccount, useUpdateAdminAccount, useValidation } from 'libs/hooks';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType, Status } from 'types';
import { IFormBoxItem } from 'types/components';
import { AdminRes } from 'types/SwaggerTypeAdmin';
import { FormAgentAccountSchema, validationAgentAccount } from './validationAgentAccounts';

const screen: ScreenType = 'ADMIN_ACCOUNT';

const ModalAgentAccounts = ({ agentAccount, agencyId }: { agentAccount?: AdminRes; agencyId: number }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationAgentAccount(t, !!agentAccount?.id));

  const { mutate: createAgentAccount, isPending: loadingCreate } = useCreateAdminAccount();
  const { mutate: updateAgentAccount, isPending: loadingUpdate } = useUpdateAdminAccount();

  const formItems: IFormBoxItem<FormAgentAccountSchema>[] = [
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
      name: 'permission',
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
      hidden: !agentAccount,
      children: <SelectGender />,
    },
    {
      name: 'birthday',
      label: t('birthday'),
      hidden: !agentAccount,
      children: (
        <DatePicker format={FORMAT_DATE.ASIA_HO_CHI_MINH} className={'w-full'} disabledDate={(d) => d > dayjs()} />
      ),
    },
    {
      name: 'password',
      label: t('password'),
      required: true,
      hidden: !!agentAccount,
      children: <Input.Password placeholder={t('password')} />,
    },
    {
      name: 'confirmPassword',
      label: t('confirmPassword'),
      rules: [
        rule,
        {
          validator(_, value) {
            if (value === form.getFieldValue('password')) {
              return Promise.resolve();
            }
            return Promise.reject(t('error_message.field_not_match', { field: t('auth.password') }));
          },
        },
      ],
      required: true,
      hidden: !!agentAccount,
      children: <Input.Password placeholder={t('confirmPassword')} />,
    },
    {
      name: 'status',
      label: t('status'),
      required: true,
      children: <SelectStatus screen={screen} />,
    },
  ];

  const handleCreateUpdate = (values: FormAgentAccountSchema) => {
    if (agentAccount) {
      updateAgentAccount(
        {
          ...values,
          id: agentAccount.id,
          birthday: values.birthday && dayjs(values.birthday).format(FORMAT_DATE.SEND_REQUEST_SERVER),
        },
        {
          onSuccess: () => removeModal(),
        },
      );
      return;
    }
    createAgentAccount(
      { ...values, agencyId: agencyId },
      {
        onSuccess: () => removeModal(),
      },
    );
  };

  return (
    <Form
      form={form}
      initialValues={{
        ...agentAccount,
        status: agentAccount?.status || agentAccount?.status === Status.INACTIVE ? agentAccount?.status : Status.ACTIVE,
        roleId: agentAccount?.role?.roleId,
        birthday: agentAccount?.birthday ? dayjs(agentAccount?.birthday) : '',
      }}
      layout="vertical"
      onFinish={handleCreateUpdate}
    >
      <FormBoxItem listItems={formItems} columnGap={[20, 5]} rule={rule} />
      <ButtonGlobal.Footer isUpdate={!!agentAccount} screen={screen} loading={loadingCreate ?? loadingUpdate} />
    </Form>
  );
};

export default ModalAgentAccounts;
