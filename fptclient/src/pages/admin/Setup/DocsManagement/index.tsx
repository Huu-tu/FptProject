import { ColumnsType } from 'antd/lib/table';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { FORMAT_DATE } from 'config/constants';
import dayjs from 'dayjs';
import { useBulkDeleteDocuments, useGetDocuments } from 'libs/hooks/api/admin/useDocument.ts';
import { useSearchParams } from 'libs/hooks/useSearchParams';
import { useSelectTableRow } from 'libs/hooks/useSelectTableRow.tsx';
import type { FC, Key } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { openModal } from 'store/slices/modalSlice';
import { ScreenType, Status } from 'types';
import { Document } from 'types/SwaggerTypeAdmin.ts';
import { undefined } from 'zod';
import ModalAddUpdateDocument from './components/ModalAddUpdateDocument.tsx';

const screen: ScreenType = 'ADMIN_DOCUMENT';

const DocsManagement: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedKey, setSelectedKey, handleSelectRow } = useSelectTableRow();
  const { params, handleChangePagination, setSearchValue } = useSearchParams({
    page: 0,
    status: Status.ACTIVE,
  });

  const { data: documents } = useGetDocuments(params);
  const { mutate: bulkDeleteDocuments } = useBulkDeleteDocuments();

  const columns: ColumnsType<Document> = [
    {
      title: t('title'),
      dataIndex: 'name',
    },
    {
      title: t('description'),
      dataIndex: 'description',
    },
    {
      title: t('date_created'),
      dataIndex: 'createdAt',
      render: (_, record) => {
        return dayjs(record.createdAt).format(FORMAT_DATE.ASIA_HO_CHI_MINH);
      },
    },
    {
      title: t('action'),
      dataIndex: 'id',
      width: 200,
      fixed: 'right',
      render: (_, record: Document) => (
        <ActionsRow
          screen={screen}
          onView={() => handleView(record.id)}
          onUpdate={() => handleCreateUpdate(record)}
          onDelete={() => handleBulkDelete(record.id)}
        />
      ),
    },
  ];

  const handleView = (id?: Key) => {
    return id ? navigate(id.toString()) : undefined;
  };

  const handleCreateUpdate = (document?: Document) => {
    openModal({
      content: <ModalAddUpdateDocument document={document} screen={screen} />,
      options: {
        width: 1000,
        title: t('create_new_field', { field: t('document') }),
      },
    });
  };

  const handleBulkDelete = (id?: Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () =>
        bulkDeleteDocuments(
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
        title={`${t('field_management', { field: t('document') })}`}
        onCreate={() => handleCreateUpdate()}
        onBulkDelete={() => handleBulkDelete()}
        disableDelete={!selectedKey.length}
        screen={screen}
      />
      <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('title')} />
      <TableGlobal
        columns={columns}
        dataSource={documents?.data}
        totalItems={documents?.total_record}
        currentPage={params.page}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
      />
    </>
  );
};

export default DocsManagement;
