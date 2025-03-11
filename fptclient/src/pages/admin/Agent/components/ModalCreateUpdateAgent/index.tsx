import { Form, Input } from 'antd';
import { SelectStatus } from 'components/atomic/common/Status';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { useValidation } from 'libs/hooks';
import { useCreateAgent, useUpdateAgent } from 'libs/hooks/api/admin/useAgent';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';
import { AgencyRes } from 'types/SwaggerTypeAdmin';
import { FormCreateUpdateAgentSchema, createUpdateAgentSchema } from './validationCreateAgentForm';

const screen: ScreenType = 'ADMIN_ACCOUNT';

export const ModalCreateUpdateAgent = ({ agent }: { agent?: AgencyRes }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(createUpdateAgentSchema(t, !!agent));
  const { mutate: createAgent, isPending: isCreating } = useCreateAgent();
  const { mutate: updateAgent, isPending: isUpdating } = useUpdateAgent();

  const handleCreateAgentSubmit = (value: FormCreateUpdateAgentSchema) => {
    if (agent) {
      updateAgent(
        {
          id: agent.id,
          ...value,
        },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
      return;
    }
    createAgent(
      {
        ...value,
        valid: true,
      },
      {
        onSuccess: () => {
          removeModal();
        },
      },
    );
  };

  const formItems: IFormBoxItem<FormCreateUpdateAgentSchema>[] = [
    {
      name: 'name',
      label: t('auth.agent_name'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.business_name') })} />,
    },
    {
      name: 'taxCode',
      label: t('auth.tax_code'),
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.tax_code') })} />,
    },
    {
      name: 'phone',
      label: t('auth.phone'),
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.phone') })} />,
    },
    {
      name: 'address',
      label: t('auth.address'),
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.address') })} />,
    },
    {
      name: 'accountName',
      label: t('auth.account_name'),
      hidden: !!agent,
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.account_name') })} />,
    },
    {
      name: 'email',
      label: t('auth.email'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.email') })} />,
    },
    {
      name: 'status',
      label: t('status'),
      hidden: !agent,
      children: <SelectStatus />,
    },
    {
      name: 'password',
      label: t('auth.password'),
      required: true,
      hidden: !!agent,
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.password') })} />,
    },
    {
      name: 'confirmPassword',
      label: t('auth.confirm_password'),
      hidden: !!agent,
      required: true,
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
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.confirm_password') })} />,
    },
  ];

  return (
    <Form form={form} initialValues={agent} layout="vertical" onFinish={handleCreateAgentSubmit}>
      <FormBoxItem listItems={formItems} columnGap={[20, 5]} rule={rule} />

      <div>
        <ButtonGlobal.Footer isUpdate={false} loading={isCreating || isUpdating} screen={screen} />
      </div>
    </Form>
  );
};
