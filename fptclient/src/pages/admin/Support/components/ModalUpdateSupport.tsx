import { Form, Input } from 'antd';
import { SelectStatus } from 'components/atomic/common/Status.tsx';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem.tsx';
import { useUpdateAdminSupport, useValidation } from 'libs/hooks';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';
import { Support } from 'types/SwaggerTypeAdmin.ts';
import { validationUpdateSupport, type FormUpdateSupport } from './validationUpdateSupport';

export const ModalUpdateSupport = ({ support, screen }: { support: Support; screen: ScreenType }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationUpdateSupport(t));

  const { mutate: updateAdminSupport } = useUpdateAdminSupport();

  const formItems: IFormBoxItem<FormUpdateSupport>[] = [
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

  const handleUpdateAccountSubmit = (values: FormUpdateSupport) => {
    updateAdminSupport(
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
