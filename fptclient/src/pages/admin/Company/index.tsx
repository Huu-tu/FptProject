import { ColumnsType } from 'antd/lib/table';
import { DisplayAgent } from 'components/atomic/admin/company/SelectAgent';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { useBulkDeleteCompanies, useGetCompanies, useSearchParams, useSelectTableRow } from 'libs/hooks';
import type { FC, Key } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PRIVATE_ROUTERS } from 'routes/router';
import { openModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { Company } from 'types/SwaggerTypeAdmin';
import { undefined } from 'zod';
import ModalAddCompany from './components/ModalAddUpdateCompany';

const screen: ScreenType = 'ADMIN_BUSINESS';

const CompanyPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedKey, setSelectedKey, handleSelectRow } = useSelectTableRow();
  const { params, setParams, handleChangePagination, setSearchValue } = useSearchParams({
    page: 0,
  });

  const { data: companies, isFetching } = useGetCompanies(params);
  const { mutate: bulkDeleteCompanies } = useBulkDeleteCompanies();

  const column: ColumnsType<Company> = [
    {
      title: t('client_name'),
      dataIndex: 'nameBusiness',
      width: 200,
      ellipsis: true,
    },
    {
      title: t('agent'),
      dataIndex: 'agentId',
      width: 200,
      ellipsis: true,
      render: (_, record) => (record.agencyId ? <DisplayAgent id={record.agencyId} /> : 'Inter ITS'),
    },
    {
      title: t('tax_code'),
      dataIndex: 'taxCode',
      width: 200,
      ellipsis: true,
    },
    {
      title: t('phone'),
      dataIndex: 'hotline',
      width: 200,
      ellipsis: true,
    },
    {
      title: t('status'),
      dataIndex: 'status',
      width: 100,
      ellipsis: true,
      render: (v) => <DisplayStatus value={v} />,
    },
    {
      dataIndex: 'id',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <ActionsRow
          screen={screen}
          onDelete={() => handleBulkDelete(record.id)}
          onUpdate={() => handleCreateUpdate(record)}
          onGetList={() => (record.id ? navigate(`${record.id}`) : undefined)}
          onGetLogs={() => (record.id ? navigate(`${PRIVATE_ROUTERS.LOGS}/${record.id}`) : undefined)}
          onGetLicenses={() => (record.id ? navigate(`${PRIVATE_ROUTERS.LICENSES}/${record.id}`) : undefined)}
        />
      ),
    },
  ];

  const handleCreateUpdate = (company?: Company) => {
    openModal({
      content: <ModalAddCompany company={company} screen={screen} />,
      options: {
        width: 1000,
        title: company ? t('update_field', { field: t('company') }) : t('create_new_field', { field: t('company') }),
      },
    });
  };

  const handleBulkDelete = (id?: Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () =>
        bulkDeleteCompanies(
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
        title={t('field_management', { field: t('company') })}
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
        <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('client_name')} />
      </div>
      <TableGlobal
        columns={column}
        dataSource={companies?.data}
        totalItems={companies?.total_record}
        currentPage={params.page}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        loading={isFetching}
      />
    </>
  );
};

export default CompanyPage;
