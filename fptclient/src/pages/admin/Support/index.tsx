import { ColumnsType } from 'antd/es/table';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import { APP, FORMAT_DATE } from 'config/constants';
import dayjs from 'dayjs';
import { useGetAdminSupports, useSearchParams } from 'libs/hooks';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import store from 'store';
import { openModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { Support } from 'types/SwaggerTypeAdmin';
import { ModalUpdateSupport } from './components/ModalUpdateSupport';

const screen: ScreenType = 'ADMIN_HELP';

const SupportPage: FC = () => {
  const { t } = useTranslation();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchParams({
    page: 0,
    agencyId: store.getState().user[APP.ADMIN]?.agencyId,
  });

  const { data: supports, isFetching } = useGetAdminSupports(params);

  const handleUpdate = (values: Support) => {
    openModal({
      content: <ModalUpdateSupport support={values} screen={screen} />,
      options: {
        title: t('update'),
        width: 800,
      },
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
      render: (_, record) => <ActionsRow onUpdate={() => handleUpdate(record)} screen={screen} />,
    },
  ];
  return (
    <>
      <HeaderTable title={`${t('field_management', { field: t('support') })}`} />
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

export default SupportPage;
