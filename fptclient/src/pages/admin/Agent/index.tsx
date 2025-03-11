import { ColumnsType } from 'antd/lib/table';
import type { FC, Key } from 'react';

import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { useDeleteAgents, useGetAgents, useSearchParams, useSelectTableRow } from 'libs/hooks';
import { useTranslation } from 'react-i18next';
import { openModal } from 'store/slices/modalSlice';

import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { HeaderTable } from 'components/custom/Table';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from 'types';
import { AgencyRes } from 'types/SwaggerTypeAdmin';
import { ModalCreateUpdateAgent } from './components/ModalCreateUpdateAgent';

const screen: ScreenType = 'ADMIN_AGENCY';

const AgentPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedKey, setSelectedKey, handleSelectRow } = useSelectTableRow();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchParams({
    page: 0,
  });

  const { data: agents, isFetching } = useGetAgents(params);
  const { mutate: deleteAgents } = useDeleteAgents();

  const handleGetAgentAccounts = (id: number) => {
    navigate(`${id}`);
  };

  const handleCreateUpdate = (agent?: AgencyRes) => {
    openModal({
      content: <ModalCreateUpdateAgent agent={agent} />,
      options: {
        title: t('update'),
        width: 1000,
      },
    });
  };

  const handleDelete = (id?: Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () => {
        return (
          deleteAgents({
            ids: id ? [id] : selectedKey,
          }),
          {
            onSuccess: () => {
              setSelectedKey([]);
            },
          }
        );
      },
    });
  };

  const columns: ColumnsType<AgencyRes> = [
    {
      title: t('agent_code'),
      dataIndex: 'code',
    },
    {
      title: t('agent_name'),
      dataIndex: 'name',
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
    },
    {
      title: t('auth.email'),
      dataIndex: 'email',
    },
    {
      title: t('address'),
      dataIndex: 'address',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      width: 100,
      render: (v) => <DisplayStatus value={v} />,
    },
  ];

  return (
    <>
      <HeaderTable
        title={t('agent_list')}
        onCreate={handleCreateUpdate}
        onBulkDelete={handleDelete}
        disableDelete={!selectedKey.length}
        screen={screen}
      />
      <div className="my-2 flex gap-2">
        <SelectStatus
          className="w-80"
          onChange={(value) => setParams((pre) => ({ ...pre, status: value }))}
          allowClear
        />
        <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('agent_name')} />
      </div>
      <TableGlobal
        columns={columns}
        dataSource={agents?.data}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        loading={isFetching}
        totalItems={agents?.total_record}
        currentPage={params.page}
        scroll={{
          x: 1900,
        }}
        actionRows={{
          screen: screen,
          onDelete: handleDelete,
          onUpdate: handleCreateUpdate,
          onGetList: handleGetAgentAccounts,
        }}
      />
    </>
  );
};

export default AgentPage;
