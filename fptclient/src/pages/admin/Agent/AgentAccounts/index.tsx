import { Col, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import { notifyError } from 'components/custom/Notification';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import ModalChangeAdminCompanyPassword from 'components/Modal/ModalChangeAdminCompanyPassword';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { useDeleteUserAccount, useGetAdminAccounts, useGetAgent, useSearchParams } from 'libs/hooks';
import { useSelectTableRow } from 'libs/hooks/useSelectTableRow';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { openModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { AdminRes } from 'types/SwaggerTypeAdmin';
import ModalAgentAccounts from './components/ModalAgentAccount';

const AgentAccounts = () => {
  const screen: ScreenType = 'ADMIN_ACCOUNT';
  const { agencyId } = useParams();
  const { t } = useTranslation();
  const { selectedKey, setSelectedKey, handleSelectRow } = useSelectTableRow();

  const { params, setParams, setSearchValue, handleChangePagination } = useSearchParams<{
    page: number;
    agencyId: number;
  }>({
    page: 0,
    agencyId: Number(agencyId),
  });

  const { data: agent } = useGetAgent({ agencyId: Number(agencyId) });
  const { data: agentAccounts, isFetching } = useGetAdminAccounts(params);
  const { mutate: bulkDeleteAgencyAccounts } = useDeleteUserAccount();

  const handleCreateUpdate = (agentAccount?: AdminRes) => {
    openModal({
      content: <ModalAgentAccounts agentAccount={agentAccount} agencyId={Number(agencyId)} />,
      options: {
        title: agentAccount
          ? t('update_field', { field: t('agency_account') })
          : t('create_new_field', { field: t('agency_account') }),
        width: 800,
      },
    });
  };

  const handleChangePassword = (id?: number) => {
    if (id === undefined) return notifyError('agent not found');
    openModal({
      content: <ModalChangeAdminCompanyPassword id={id} />,
      options: {
        title: t('update_field', { field: t('auth.password') }),
        width: 800,
      },
    });
  };

  const handleBulkDelete = (id?: React.Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () =>
        bulkDeleteAgencyAccounts(
          { ids: id ? [id] : selectedKey },
          {
            onSuccess: () => {
              setSelectedKey([]);
            },
          },
        ),
    });
  };

  const columns: ColumnsType<AdminRes> = [
    {
      title: t('full_name'),
      dataIndex: 'name',
    },
    {
      title: t('email'),
      dataIndex: 'email',
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      width: 200,
    },
    {
      title: t('role'),
      width: 200,
      render: (_, record) => record.role?.roleName,
    },
    {
      title: t('status'),
      dataIndex: 'status',
      width: 100,
      render: (value) => {
        return <DisplayStatus value={value} />;
      },
    },
    {
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <ActionsRow
          onUpdate={() => handleCreateUpdate(record)}
          onDelete={() => handleBulkDelete(record.id)}
          onChangePassword={() => handleChangePassword(record.id)}
          screen={screen}
        />
      ),
    },
  ];

  return (
    <>
      <HeaderTable
        title={`${t('field_management', { field: t('agency_account') })} (${agent?.data.name ?? ''})`}
        getListPage={true}
        onCreate={() => handleCreateUpdate()}
        onBulkDelete={handleBulkDelete}
        disableDelete={!selectedKey.length}
        screen={screen}
      />

      <Row gutter={4} className="justify-between">
        <Col span={4} className="flex items-center">
          <SelectStatus
            className="w-80"
            allowClear
            onChange={(value) => setParams((pre) => ({ ...pre, status: value }))}
          />
        </Col>
        <Col span={20} className="mb-0 flex flex-grow items-center">
          <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={[t('full_name'), t('email')]} />
        </Col>
      </Row>

      <TableGlobal
        columns={columns}
        dataSource={agentAccounts?.data}
        loading={isFetching}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        totalItems={agentAccounts?.total_record}
        currentPage={params.page}
      />
    </>
  );
};

export default AgentAccounts;
