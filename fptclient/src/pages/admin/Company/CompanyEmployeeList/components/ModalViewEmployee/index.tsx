import { Form, Input } from 'antd';
import { SelectStatus } from 'components/atomic/common/Status.tsx';
import FormBoxItem from 'components/custom/Form/FormBoxItem.tsx';
import { useTranslation } from 'react-i18next';
import { UserRes } from 'types/SwaggerTypeAdmin';

const ModalViewEmployee = ({ employee }: { employee: UserRes }) => {
  const { t } = useTranslation();

  const formItems = [
    {
      name: 'name',
      label: t('name_account'),
      children: <Input readOnly />,
    },
    {
      name: 'email',
      label: t('email'),
      children: <Input readOnly />,
    },
    {
      name: 'code',
      label: t('tax_code'),
      children: <Input readOnly />,
    },
    {
      name: 'status',
      label: t('status'),
      children: <SelectStatus open={false} />,
    },
  ];

  return (
    <Form layout="vertical" initialValues={employee}>
      <FormBoxItem listItems={formItems} columnGap={[20, 5]} />
    </Form>
  );
};

export default ModalViewEmployee;
