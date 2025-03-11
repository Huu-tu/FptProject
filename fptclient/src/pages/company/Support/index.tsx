import { ColumnsType } from 'antd/es/table';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { FORMAT_DATE } from 'config/constants';
import dayjs from 'dayjs';
import { useSearchParams, useSelectTableRow } from 'libs/hooks';
import { useBulkDeleteCompanySupport, useGetCompanySupports } from 'libs/hooks/api/company/useCompanySupport';
import { useTranslation } from 'react-i18next';
import { openModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { Support } from 'types/SwaggerTypeAdmin';
import { ModalCreateUpdateSupport } from './components/ModalCreateUpdateSupport';

const screen: ScreenType = 'USER_BUSINESS';

const CompanySupportPage = () => {
  const { t } = useTranslation();
  const { handleSelectRow, selectedKey, setSelectedKey } = useSelectTableRow();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchParams({
    page: 0,
  });

  const { data: supports, isFetching } = useGetCompanySupports(params);
  const { mutate: bulkDelete } = useBulkDeleteCompanySupport();

  const handleCreateUpdate = (values?: Support) => {
    openModal({
      content: <ModalCreateUpdateSupport support={values} screen={screen} />,
      options: {
        title: values ? t('update') : t('create'),
        width: 800,
      },
    });
  };

  const handleBulkDelete = (id?: React.Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () =>
        bulkDelete(
          { ids: id ? [id] : selectedKey },
          {
            onSuccess: () => {
              setSelectedKey([]);
            },
          },
        ),
    });
  };

  const columns: ColumnsType<Support> = [
    {
      title: t('company_code'),
      dataIndex: 'code',
    },
    {
      title: t('company_name'),
      dataIndex: 'name',
    },
    {
      title: t('title'),
      dataIndex: 'content',
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
      title: t('created_date'),
      dataIndex: 'createdAt',
      render: (v) => dayjs(v).format(FORMAT_DATE.ASIA_HO_CHI_MINH),
    },
    {
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <ActionsRow
          onUpdate={() => handleCreateUpdate(record)}
          onDelete={() => handleBulkDelete(record.id)}
          screen={screen}
        />
      ),
    },
  ];
  return (
    <>
      <HeaderTable
        title={`${t('field_management', { field: t('support') })}`}
        onCreate={handleCreateUpdate}
        onBulkDelete={handleBulkDelete}
        disableDelete={!selectedKey.length}
      />
      <div className="my-2 flex gap-2">
        <SelectStatus
          className="w-80"
          onChange={(value) => setParams((pre) => ({ ...pre, status: value }))}
          allowClear
        />
        <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('company_name')} />
      </div>

      <TableGlobal
        columns={columns}
        dataSource={supports?.data}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        loading={isFetching}
        totalItems={supports?.total_record}
        currentPage={params.page}
      />
    </>
  );
};

export default CompanySupportPage;
