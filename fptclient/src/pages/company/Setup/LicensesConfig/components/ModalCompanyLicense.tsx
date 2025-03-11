import { DatePicker, Form, Input } from 'antd';
import { SelectProps } from 'antd/lib';
import { SelectStatus } from 'components/atomic/common/Status';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { SelectGlobal } from 'components/custom/Select';
import { FORMAT_DATE } from 'config/constants';
import dayjs from 'dayjs';
import { useValidation } from 'libs/hooks';
import { useCreateCompanyLicense, useUpdateCompanyLicense } from 'libs/hooks/api/company/useCompanyLicense';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';
import { License } from 'types/SwaggerTypeAdmin';
import { companyLicenseSchema, FormRegisterProviderSchema } from './validationCompanyLicence';

const ModalCompanyLicense = ({ license, screen }: { license?: License; screen: ScreenType }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(companyLicenseSchema(t));

  const { mutate: createCompanyLicense, isPending: loadingCreate } = useCreateCompanyLicense();
  const { mutate: updateCompanyLicense, isPending: loadingUpdate } = useUpdateCompanyLicense();

  const formItems: IFormBoxItem<FormRegisterProviderSchema>[] = [
    {
      name: 'name',
      label: t('license_name'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('license_name') })} />,
    },
    {
      name: 'companyId',
      label: 'Client ID',
      hidden: !license,
      children: <Input placeholder={t('placeholder.enter_field', { field: 'Client ID' })} disabled={!!license} />,
    },
    {
      name: 'secretCode',
      label: 'Secret Code',
      hidden: !license,
      children: (
        <Input.Password placeholder={t('placeholder.enter_field', { field: 'Secret Code' })} disabled={!!license} />
      ),
    },
    {
      name: 'whitelistIp',
      label: t('whitelist_ip'),
      children: <Input placeholder={t('placeholder.enter_field', { field: t('whitelist_ip') })} disabled={!!license} />,
    },
    {
      name: 'redirectUri',
      label: t('redirect_uri'),
      children: <Input placeholder={t('placeholder.enter_field', { field: t('redirect_uri') })} disabled={!!license} />,
    },
    {
      name: 'scope',
      label: 'Scope',
      children: <SelectScope mode="multiple" disabled={!!license} />,
    },
    {
      name: 'expireAt',
      label: t('expire_time'),
      children: <DatePicker format={FORMAT_DATE.ASIA_HO_CHI_MINH} className={'w-full'} disabled={!!license} />,
    },
    {
      name: 'status',
      label: t('status'),
      hidden: !license,
      children: <SelectStatus className={'w-full'} screen={screen} disabled={!!license} />,
    },
  ];

  const handleCreateUpdate = (value: FormRegisterProviderSchema) => {
    if (license) {
      updateCompanyLicense(
        {
          ...value,
          expireAt: value.expireAt ? dayjs(value.expireAt).format(FORMAT_DATE.SEND_REQUEST_SERVER) : undefined,
          id: license.id,
        },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
      return;
    }
    createCompanyLicense(
      {
        ...value,
        expireAt: value.expireAt ? dayjs(value.expireAt).format(FORMAT_DATE.SEND_REQUEST_SERVER) : undefined,
      },
      {
        onSuccess: () => {
          removeModal();
        },
      },
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ ...license, expireAt: license?.expireAt ? dayjs(license?.expireAt) : '' }}
      onFinish={handleCreateUpdate}
    >
      <FormBoxItem listItems={formItems} defaultSpan={license ? 12 : 24} columnGap={[20, 5]} rule={rule} />
      <ButtonGlobal.Footer
        isUpdate={!!license}
        htmlType="submit"
        loading={loadingCreate ?? loadingUpdate}
        screen={screen}
      />
    </Form>
  );
};

const SelectScope = (props: SelectProps) => {
  const { t } = useTranslation();
  const options = [
    {
      label: 'Public',
      value: 'public',
    },
    {
      label: 'Mobile-id',
      value: 'mobile-id',
    },
  ];
  return <SelectGlobal options={options} placeholder={t('placeholder.select_field', { field: 'Scope' })} {...props} />;
};

export default ModalCompanyLicense;
