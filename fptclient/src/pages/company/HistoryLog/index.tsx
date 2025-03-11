import { ColumnsType } from 'antd/es/table';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { DisplayTelComType } from 'components/atomic/common/TelComType';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { HeaderTable } from 'components/custom/Table';
import { APP, FORMAT_DATE } from 'config/constants';
import dayjs from 'dayjs';
import { useSearchParams } from 'libs/hooks';
import { useGetCompanyLogs } from 'libs/hooks/api/company/useCompanyLog';
import { useTranslation } from 'react-i18next';
import store from 'store';
import type { AuthLogAdminResponse } from 'types/SwaggerTypeAdmin';

const HistoryLogsPage = () => {
  const { t } = useTranslation();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchParams({
    page: 0,
    agencyId: store.getState().user[APP.ADMIN]?.agencyId,
  });

  const { data: supports, isFetching } = useGetCompanyLogs(params);

  const columns: ColumnsType<AuthLogAdminResponse> = [
    {
      title: t('transaction_code'),
      dataIndex: 'code',
    },
    {
      title: t('telephone_company'),
      dataIndex: 'telcoType',
      render: (v) => <DisplayTelComType value={v} />,
    },
    {
      title: 'IP',
      dataIndex: 'ip',
    },
    {
      title: t('phone'),
      dataIndex: 'msisdn',
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
  ];

  return (
    <>
      <HeaderTable title={`${t('field_management', { field: t('diary') })}`} />
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
        loading={isFetching}
        totalItems={supports?.total_record}
        currentPage={params.page}
      />
    </>
  );
};

export default HistoryLogsPage;
