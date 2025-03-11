import { Button, Form, Input, Typography } from 'antd';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { t, TFunction } from 'i18next';
import { useForgotPasswordAdmin, useValidation } from 'libs/hooks';
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
      .min(4, t('error_message.min_length_field', { field: t('auth.otp'), length: 4 })),
  });

type FormSchema = z.infer<ReturnType<typeof schema>>;

const ModalVerifyEmail = ({ otpRes }: { otpRes: SendOtp }) => {
  const [form, rule] = useValidation(schema(t));
  const { mutate: forgotPassword, isPending } = useForgotPasswordAdmin();

  const handleConfirmPhone = (value: FormSchema) => {
    forgotPassword(
      {
        ...value,
        codeId: otpRes.id,
      },
      {
        onSuccess: () => {
          removeModal();
        },
      },
    );
  };

  const formListItems: IFormBoxItem<FormSchema>[] = [
    {
      name: 'newPassword',
      label: t('auth.new_password'),
      required: true,
      rules: [rule],
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.new_password') })} />,
    },
    {
      name: 'confirmNewPassword',
      label: t('auth.confirm_new_password'),
      required: true,
      rules: [rule],
      children: (
        <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.confirm_new_password') })} />
      ),
    },
    {
      name: 'code',
      label: t('auth.otp_code'),
      required: true,
      rules: [rule],
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.otp') })} />,
    },
  ];

  return (
    <Form form={form} layout="vertical" onFinish={handleConfirmPhone}>
      <Typography.Paragraph className="text-center text-slate-500">
        {t('auth.paragraph.field_has_otp_value', { field: t('auth.email'), value: otpRes.email })}
      </Typography.Paragraph>
      <FormBoxItem listItems={formListItems} defaultSpan={24} columnGap={[20, 5]} />

      <Button htmlType="submit" type="primary" loading={isPending} block className="my-10 font-semibold">
        {t('auth.verify')}
      </Button>
    </Form>
  );
};

export default ModalVerifyEmail;
