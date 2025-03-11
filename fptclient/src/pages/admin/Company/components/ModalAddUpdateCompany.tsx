import { Form, Input } from 'antd';
import SelectAgent from 'components/atomic/admin/company/SelectAgent';
import { SelectStatus } from 'components/atomic/common/Status';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { useCreateCompany, useUpdateCompany, useValidation } from 'libs/hooks';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { type ScreenType, Status } from 'types';
import type { IFormBoxItem } from 'types/components';
import type { Company } from 'types/SwaggerTypeAdmin';
import { companySchema, type FormRegisterProviderSchema } from './validationRegisterForm';

const ModalAddUpdateCompany = ({ company, screen }: { company?: Company; screen: ScreenType }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(companySchema(t, !!company));
  const { mutate: createCompany, isPending: loadingCreate } = useCreateCompany();
  const { mutate: updateCompany, isPending: loadingUpdate } = useUpdateCompany();

  const handleSubmitForm = (values: FormRegisterProviderSchema) => {
    if (company) {
      updateCompany(
        { ...values, companyId: company.id },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
      return;
    }
    createCompany(values, {
      onSuccess: () => {
        removeModal();
      },
    });
  };

  const formItems: IFormBoxItem<FormRegisterProviderSchema>[] = [
    {
      name: 'nameBusiness',
      label: t('auth.business_name'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.business_name') })} />,
    },
    {
      name: 'taxCode',
      label: t('auth.tax_code'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.tax_code') })} />,
    },
    {
      name: 'agencyId',
      label: t('agent'),
      hidden: !!company,
      children: <SelectAgent />,
    },
    {
      name: 'status',
      label: t('status'),
      children: <SelectStatus />,
    },
    {
      name: 'email',
      label: t('auth.email'),
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.email') })} />,
    },
    {
      name: 'address',
      label: t('auth.address'),
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.address') })} />,
    },
    {
      name: 'name',
      label: t('auth.account_name'),
      required: true,
      hidden: !!company,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.account_name') })} />,
    },
    {
      name: 'phone',
      label: t('auth.phone'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.phone') })} />,
    },
    {
      name: 'password',
      label: t('auth.password'),
      hidden: !!company,
      required: true,
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.password') })} />,
    },
    {
      name: 'confirmPassword',
      label: t('auth.confirm_password'),
      hidden: !!company,
      rules: [
        rule,
        {
          validator(_, value) {
            if (value === form.getFieldValue('password')) {
              return Promise.resolve();
            }
            return Promise.resolve(t('error_message.field_not_match', { field: t('auth.password') }));
          },
        },
      ],
      required: true,
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.confirm_password') })} />,
    },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...company,
        status: company?.status ? company?.status : Status.ACTIVE,
      }}
      onFinish={handleSubmitForm}
    >
      <FormBoxItem listItems={formItems} columnGap={[20, 5]} rule={rule} />
      <ButtonGlobal.Footer
        isUpdate={!!company}
        htmlType="submit"
        loading={loadingCreate ?? loadingUpdate}
        screen={screen}
      />
    </Form>
  );
};

export default ModalAddUpdateCompany;
