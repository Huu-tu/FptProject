import { Button, Form, Input, Typography } from 'antd';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { PUBLIC_ROUTERS } from 'config/constants';
import { TFunction } from 'i18next';
import { useForgotPasswordProvider, useValidation } from 'libs/hooks';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { removeModal } from 'store/slices/modalSlice';
import { IFormBoxItem } from 'types/components';
import { SendOtp } from 'types/SwaggerTypeUser';
import { z } from 'zod';

const schema = (t: TFunction) =>
  z.object({
    newPassword: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('auth.password') }) })
      .min(6, t('error_message.please_enter_field', { field: t('auth.password') })),
    confirmNewPassword: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('auth.password') }) })
      .min(6, t('error_message.please_enter_field', { field: t('auth.password') })),
    code: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('auth.otp') }) })
      .min(1, t('error_message.please_enter_field', { field: t('auth.otp') })),
  });

type FormSchema = z.infer<ReturnType<typeof schema>>;

const ModalVerifyPhoneNumber = ({ otpRes }: { otpRes: SendOtp }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(schema(t));
  const { mutate: forgotPassword, isPending } = useForgotPasswordProvider();
  const navigate = useNavigate();

  const handleConfirmPhone = (value: FormSchema) => {
    forgotPassword(
      {
        ...value,
        codeId: otpRes.id,
      },
      {
        onSuccess: () => {
          removeModal();
          navigate(PUBLIC_ROUTERS.LOGIN);
        },
      },
    );
  };

  const formListItems: IFormBoxItem<FormSchema>[] = [
    {
      name: 'newPassword',
      label: t('auth.new_password'),
      required: true,
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.new_password') })} />,
    },
    {
      name: 'confirmNewPassword',
      label: t('auth.confirm_new_password'),
      required: true,
      children: (
        <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.confirm_new_password') })} />
      ),
    },
    {
      name: 'code',
      label: t('auth.otp_code'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.otp') })} />,
    },
  ];

  return (
    <Form form={form} layout="vertical" onFinish={handleConfirmPhone}>
      <Typography.Paragraph className="text-center text-slate-500">
        {t('auth.paragraph.field_has_otp_value', { field: t('auth.phone'), value: otpRes.phone })}
      </Typography.Paragraph>
      <FormBoxItem listItems={formListItems} defaultSpan={24} columnGap={[20, 5]} rule={rule} />
      <Button htmlType="submit" type="primary" loading={isPending} block className="my-10 font-semibold">
        {t('auth.verify')}
      </Button>
    </Form>
  );
};

export default ModalVerifyPhoneNumber;
