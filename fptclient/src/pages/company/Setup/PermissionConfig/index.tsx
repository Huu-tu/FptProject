import type { ColumnsType } from 'antd/lib/table';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { HeaderTable } from 'components/custom/Table';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { useSearchParams } from 'libs/hooks';
import { useBulkDeleteAdminRoles, useGetAdminRoles } from 'libs/hooks/api/admin/useAdminRole';
import { useSelectTableRow } from 'libs/hooks/useSelectTableRow';
import type { FC, Key } from 'react';
import { useTranslation } from 'react-i18next';
import { openModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { RoleRes } from 'types/SwaggerTypeAdmin';
import ModalAddUpdateAdminRole from './components/ModalAddUpdateAdminRole';

const screen: ScreenType = 'USER_ROLE';

const PermissionConfig: FC = () => {
  const { t } = useTranslation();
  const { selectedKey, setSelectedKey, handleSelectRow } = useSelectTableRow();
  const { params, setParams, handleChangePagination, setSearchValue } = useSearchParams({
    page: 0,
  });

  const { data: adminRoles, isFetching } = useGetAdminRoles(params);
  const { mutate: bulkDeleteAdminRoles } = useBulkDeleteAdminRoles();

  const column: ColumnsType<RoleRes> = [
    {
      title: t('config_name'),
      dataIndex: 'name',
      width: 200,
      ellipsis: true,
    },
    {
      title: t('note'),
      dataIndex: 'note',
      width: 300,
      ellipsis: true,
    },
    {
      title: t('status'),
      dataIndex: 'status',
      width: 100,
      ellipsis: true,
      render: (v) => <DisplayStatus value={v} />,
    },
  ];

  const handleCreateUpdate = (role?: RoleRes) => {
    openModal({
      content: <ModalAddUpdateAdminRole role={role} screen={screen} />,
      options: {
        width: 1400,
        title: t('create_new_field', { field: t('role') }),
      },
    });
  };

  const handleBulkDelete = (id?: Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () =>
        bulkDeleteAdminRoles(
          { ids: id ? [id] : selectedKey },
          {
            onSuccess: () => {
              setSelectedKey([]);
            },
          },
        ),
    });
  };

  return (
    <>
      <HeaderTable
        title={t('permission_config')}
        onCreate={handleCreateUpdate}
        onBulkDelete={handleBulkDelete}
        disableDelete={!selectedKey.length}
        screen={screen}
      />

      <div className="my-2 flex gap-2">
        <SelectStatus
          className="w-80"
          allowClear
          onChange={(value) => setParams((pre) => ({ ...pre, status: value }))}
        />
        <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('config_name')} />
      </div>
      <TableGlobal
        columns={column}
        dataSource={adminRoles?.data}
        totalItems={adminRoles?.total_record}
        currentPage={params.page}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        loading={isFetching}
        actionRows={{
          screen: screen,
          onDelete: handleBulkDelete,
          onUpdate: handleCreateUpdate,
        }}
      />
    </>
  );
};

export default PermissionConfig;
