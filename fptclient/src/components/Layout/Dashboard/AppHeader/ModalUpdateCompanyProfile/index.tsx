import { DatePicker, Form, Input, Skeleton } from 'antd';
import { SelectGender } from 'components/atomic/common/Gender.tsx';
import { SelectRoleType } from 'components/atomic/common/RoleType.tsx';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem.tsx';
import { FORMAT_DATE } from 'config/constants';
import dayjs from 'dayjs';
import { useValidation } from 'libs/hooks';
import { useGetMyProfile, useSelfUpdateCompanyProfile } from 'libs/hooks/api/company/useCompany.ts';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { IFormBoxItem } from 'types/components';
import { FormUpdateProfile, validationUpdateProfile } from './validationUpdateProfile.ts';

const ModalUpdateCompanyProfile = () => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationUpdateProfile(t));

  const { data: myProfile, isFetching } = useGetMyProfile();
  const { mutate: updateProfile, isPending } = useSelfUpdateCompanyProfile();

  const formItems: IFormBoxItem<FormUpdateProfile>[] = [
    {
      name: 'name',
      label: t('name_account'),
      required: true,
      children: <Input placeholder={t('name_account')} />,
    },
    {
      name: 'address',
      label: t('address'),
      required: true,
      children: <Input placeholder={t('address')} />,
    },
    {
      name: 'phone',
      label: t('phone'),
      required: true,
      children: <Input placeholder={t('phone')} disabled />,
    },
    {
      label: t('group_permission'),
      children: <SelectRoleType open={false} />,
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
  ];

  const handleUpdateSubmit = (values: FormUpdateProfile) => {
    updateProfile(
      {
        ...values,
        birthday: values.birthday && dayjs(values.birthday).format(FORMAT_DATE.SEND_REQUEST_SERVER),
      },
      {
        onSuccess: () => {
          removeModal();
        },
      },
    );
  };

  return isFetching ? (
    <Skeleton />
  ) : (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...myProfile?.data,
        birthday: myProfile?.data?.birthday ? dayjs(myProfile?.data.birthday) : '',
      }}
      onFinish={handleUpdateSubmit}
    >
      <FormBoxItem listItems={formItems} columnGap={[20, 5]} rule={rule} />
      <ButtonGlobal.Footer isUpdate loading={isPending} />
    </Form>
  );
};

export default ModalUpdateCompanyProfile;
