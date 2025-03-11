import { Col, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { FORMAT_DATE } from 'config/constants';
import dayjs from 'dayjs';
import { useGetCompany, useSearchParams } from 'libs/hooks';
import { useBulkDeleteCompanyLicenses, useGetCompanyLicenses } from 'libs/hooks/api/admin/useAdminLicense';
import { useSelectTableRow } from 'libs/hooks/useSelectTableRow';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { openModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { License } from 'types/SwaggerTypeAdmin';
import ModalCompanyLicense from './components/ModalCompanyLicense';

const screen: ScreenType = 'ADMIN_BUSINESS';

const CompanyLicenses = () => {
  const { companyId } = useParams();
  const { t } = useTranslation();
  const { selectedKey, setSelectedKey, handleSelectRow } = useSelectTableRow();

  const { params, setParams, setSearchValue, handleChangePagination } = useSearchParams<{
    page: number;
    companyId: number;
  }>({
    page: 0,
    companyId: Number(companyId),
  });
  const { data: company } = useGetCompany({ companyId: Number(companyId) });
  const { data: licenses } = useGetCompanyLicenses(params);
  const { mutate: bulkDeleteCompanyLicenses } = useBulkDeleteCompanyLicenses();

  const handleCreateUpdate = (license?: License) => {
    openModal({
      content: <ModalCompanyLicense license={license} companyId={Number(companyId)} screen={screen} />,
      options: {
        title: license ? t('update_field', { field: t('license') }) : t('create_new_field', { field: t('license') }),
        width: 800,
      },
    });
  };

  const handleBulkDelete = (id?: React.Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () =>
        bulkDeleteCompanyLicenses(
          { ids: id ? [id] : selectedKey },
          {
            onSuccess: () => {
              setSelectedKey([]);
            },
          },
        ),
    });
  };

  const columns: ColumnsType<License> = [
    {
      title: t('license_name'),
      dataIndex: 'name',
    },
    {
      title: t('license_code'),
      dataIndex: 'licenseCode',
    },
    {
      title: t('expire_time'),
      dataIndex: 'expireAt',
      render: (v) => (v ? dayjs(v).format(FORMAT_DATE.ASIA_HO_CHI_MINH) : t('indefinitely')),
    },
    {
      title: t('created_date'),
      dataIndex: 'createdAt',
      render: (v) => dayjs(v).format(FORMAT_DATE.ASIA_HO_CHI_MINH),
    },
    {
      title: t('status'),
      dataIndex: 'status',
      width: 100,
      render: (v) => {
        return <DisplayStatus value={v} />;
      },
    },
    {
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <ActionsRow
          onDelete={() => handleBulkDelete(record.id)}
          onUpdate={() => handleCreateUpdate(record)}
          screen={screen}
        />
      ),
    },
  ];

  return (
    <>
      <HeaderTable
        title={`${t('field_management', { field: t('license') })} (${company?.data.name ?? ''})`}
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
          <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('license_name')} />
        </Col>
      </Row>

      <TableGlobal
        columns={columns}
        dataSource={licenses?.data}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        totalItems={licenses?.total_record}
        currentPage={params.page}
      />
    </>
  );
};

export default CompanyLicenses;
