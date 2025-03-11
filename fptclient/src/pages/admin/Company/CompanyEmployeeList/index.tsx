import { Col, Row } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status.tsx';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal.tsx';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { useBulkDeleteUsers, useGetCompany, useGetUsers, useSearchParams, useSelectTableRow } from 'libs/hooks';
import { FC, Key } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { openModal } from 'store/slices/modalSlice.ts';
import { ScreenType } from 'types';
import { UserRes } from 'types/SwaggerTypeAdmin.ts';
import ModalCreateEmployee from './components/ModalCreateEmployee';
import ModalViewEmployee from './components/ModalViewEmployee';

const screen: ScreenType = 'ADMIN_BUSINESS';

const CompanyEmployeeList: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { selectedKey, setSelectedKey, handleSelectRow } = useSelectTableRow();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchParams<{
    page: number;
    companyId: number;
  }>({
    page: 0,
    companyId: Number(id),
  });

  const { data: company } = useGetCompany({ companyId: Number(id) });
  const { mutate: bulkDeleteEmployee } = useBulkDeleteUsers();
  const { data: users } = useGetUsers(params);

  const handleCreateEmployeeClick = () => {
    if (!id) return;
    openModal({
      content: <ModalCreateEmployee companyId={Number(id)} />,
      options: {
        title: t('create_account'),
        width: 800,
      },
    });
  };

  const handleBulkDelete = (id?: Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () =>
        bulkDeleteEmployee(
          { ids: id ? [id] : selectedKey },
          {
            onSuccess: () => {
              setSelectedKey([]);
            },
          },
        ),
    });
  };

  const handleViewEmployeeClick = (employee: UserRes) => {
    openModal({
      content: <ModalViewEmployee employee={employee} />,
      options: {
        title: t('see_details'),
        width: 800,
      },
    });
  };

  const columns: ColumnsType<UserRes> = [
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
      render: (v) => {
        return <DisplayStatus value={v} />;
      },
    },
    {
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <ActionsRow
          onView={() => handleViewEmployeeClick(record)}
          onDelete={() => handleBulkDelete(record.id)}
          screen={screen}
        />
      ),
    },
  ];

  return (
    <>
      <HeaderTable
        title={`${t('field_management', { field: t('employee') })} (${company?.data.name ?? ''})`}
        getListPage={true}
        onCreate={handleCreateEmployeeClick}
        onBulkDelete={handleBulkDelete}
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
          <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('full_name')} />
        </Col>
      </Row>

      <TableGlobal
        columns={columns}
        dataSource={users?.data}
        onChange={handleChangePagination}
        totalItems={users?.total_record}
        currentPage={params.page}
        rowSelection={{ onChange: handleSelectRow }}
      />
    </>
  );
};
export default CompanyEmployeeList;
