import { Checkbox, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { ColumnsType } from 'antd/es/table';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import TableGlobal from 'components/custom/Table';
import { getRoleType } from 'config/enum';
import { useValidation } from 'libs/hooks';
import {
  useCreateAdminRole,
  useGetAdminPermissions,
  useGetDetailAdminRole,
  useUpdateAdminRole,
} from 'libs/hooks/api/admin/useAdminRole';
import { checkPermission } from 'libs/utils/checkPermission';
import { useRef } from 'react';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType, Status } from 'types';
import { IFormBoxItem } from 'types/components';
import { PermissionRes, RoleRes } from 'types/SwaggerTypeAdmin';
import { FormAdminRoleSchemaSchema, adminRoleSchema } from './validationRegisterForm';

const ModalAddUpdateAdminRole = ({ role, screen }: { role?: RoleRes; screen: ScreenType }) => {
  const permissionAdminRole = checkPermission(screen);
  const { t } = useTranslation();
  const [form, rule] = useValidation(adminRoleSchema(t));

  const { mutate: createAdminRole, isPending: loadingCreate } = useCreateAdminRole();
  const { mutate: updateAdminRole, isPending: loadingUpdate } = useUpdateAdminRole();
  const { data: adminPermissions, isFetching } = useGetAdminPermissions(Number(role?.id));
  const { data: detailAdminRole, isFetching: fetchingDetailRole } = useGetDetailAdminRole(Number(role?.id));

  const permissions = useRef<PermissionRes[]>();
  permissions.current = role?.id ? detailAdminRole?.data.permissions : adminPermissions?.data;

  const handleSubmitForm = (values: FormAdminRoleSchemaSchema) => {
    if (role) {
      updateAdminRole(
        {
          ...values,
          id: role.id,
          type: getRoleType(),
          permissions: permissions.current,
          status: values.status ? Status.ACTIVE : Status.INACTIVE,
        },
        {
          onSuccess: () => {
            permissions.current = undefined;
            removeModal();
          },
        },
      );
      return;
    }
    createAdminRole(
      {
        ...values,
        type: getRoleType(),
        permissions: permissions.current,
        status: values.status ? Status.ACTIVE : Status.INACTIVE,
      },
      {
        onSuccess: () => {
          permissions.current = undefined;
          removeModal();
        },
      },
    );
  };

  const columns: ColumnsType<PermissionRes> = [
    {
      title: t('config_name'),
      dataIndex: 'title',
      width: 200,
      ellipsis: true,
    },
    {
      title: t('view'),
      dataIndex: 'isView',
      width: 100,
      render: (_, record, index) => (
        <Checkbox
          defaultChecked={record.isView}
          onChange={(e) => {
            if (permissions.current) permissions.current[index].isView = e.target.checked;
          }}
        />
      ),
    },
    {
      title: t('update'),
      dataIndex: 'isWrite',
      width: 100,
      render: (_, record, index) => (
        <Checkbox
          defaultChecked={record.isWrite}
          onChange={(e) => {
            if (permissions.current) permissions.current[index].isWrite = e.target.checked;
          }}
        />
      ),
    },
    {
      title: t('change_status'),
      dataIndex: 'isApproval',
      width: 100,
      render: (_, record, index) => (
        <Checkbox
          defaultChecked={record.isApproval}
          onChange={(e) => {
            if (permissions.current) permissions.current[index].isApproval = e.target.checked;
          }}
        />
      ),
    },
    {
      title: t('delete'),
      dataIndex: 'isDecision',
      width: 100,
      render: (_, record, index) => (
        <Checkbox
          defaultChecked={record.isDecision}
          onChange={(e) => {
            if (permissions.current) permissions.current[index].isDecision = e.target.checked;
          }}
        />
      ),
    },
  ];

  const formItems: IFormBoxItem<FormAdminRoleSchemaSchema>[] = [
    {
      name: 'name',
      label: t('config_name'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('config_name') })} />,
    },
    {
      name: 'note',
      label: t('note'),
      children: <Input placeholder={t('placeholder.enter_field', { field: t('note') })} />,
    },
    {
      name: undefined,
      label: t('permission_detail'),
      required: true,
      children: (
        <TableGlobal
          totalItems={adminPermissions?.total_record}
          pagination={false}
          columns={columns}
          dataSource={permissions.current}
          loading={isFetching ?? fetchingDetailRole}
          scroll={{ x: 1000 }}
        />
      ),
    },
    {
      name: 'status',
      label: t('status'),
      valuePropName: 'checked',
      children: <Checkbox disabled={!permissionAdminRole?.isDecision} />,
    },
  ];

  return (
    <Form
      form={form}
      autoComplete="off"
      initialValues={{ ...role, permissions: undefined, status: role?.status === Status.ACTIVE }}
      labelCol={{ span: 4 }}
      layout="horizontal"
      onFinish={handleSubmitForm}
    >
      <FormBoxItem listItems={formItems} defaultSpan={24} columnGap={[20, 5]} rule={rule} />
      <ButtonGlobal.Footer
        isUpdate={!!role}
        htmlType="submit"
        loading={loadingCreate ?? loadingUpdate}
        screen={screen}
      />
    </Form>
  );
};

export default ModalAddUpdateAdminRole;
