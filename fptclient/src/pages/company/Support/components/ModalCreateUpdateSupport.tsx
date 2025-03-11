import { Form, Input } from 'antd';
import { SelectStatus } from 'components/atomic/common/Status.tsx';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem.tsx';
import { useValidation } from 'libs/hooks';
import { useCreateCompanySupport, useUpdateCompanySupport } from 'libs/hooks/api/company/useCompanySupport';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';
import { Support } from 'types/SwaggerTypeAdmin.ts';
import { validationSupport, type FormSupport } from './validationSupport';

export const ModalCreateUpdateSupport = ({ support, screen }: { support?: Support; screen: ScreenType }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationSupport(t));

  const { mutate: createSupport } = useCreateCompanySupport();
  const { mutate: updateSupport } = useUpdateCompanySupport();

  const formItems: IFormBoxItem<FormSupport>[] = [
    {
      name: 'name',
      label: t('name_account'),
      required: true,
      children: <Input placeholder={t('name_account')} />,
    },
    {
      name: 'content',
      label: t('title'),
      required: true,
      children: <Input placeholder={t('title')} />,
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

  const handleUpdateAccountSubmit = (values: FormSupport) => {
    if (support) {
      updateSupport(
        {
          ...values,
          supportId: support.id,
        },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
      return;
    }
    createSupport(
      {
        ...values,
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
        initialValues={support}
        onFinish={handleUpdateAccountSubmit}
        autoComplete="off"
      >
        <FormBoxItem listItems={formItems} columnGap={[20, 5]} rule={rule} />
      </Form>
    </div>
  );
};
