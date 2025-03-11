/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TableProps } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

import { Table, Tooltip } from 'antd';

import { PAGE_SIZE_TABLE } from 'config/constants';
import { useWindowSize } from 'hooks';

import { ArrowLeftOutlined, EditOutlined, HistoryOutlined, LockOutlined, SettingOutlined } from '@ant-design/icons';
import ButtonGlobal from 'components/custom/Button';
import { DeleteIcon, ListIcon, ViewIcon } from 'components/icon';
import { EActionKey } from 'config/enum';
import { checkPermission } from 'libs/utils/checkPermission';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenType } from 'types';

const TableGlobal = <T extends Record<any, any>>({
  rowKey = 'id',
  className,
  defaultPageSize = PAGE_SIZE_TABLE,
  subtractHeight = 300,
  scroll,
  currentPage,
  totalItems,
  rowSelection,
  actionRows,
  columns = [],
  ...props
}: TableProps<T> & {
  columns: ColumnsType<T> | undefined;
  currentPage?: number;
  defaultPageSize?: number;
  totalItems: number | undefined;
  subtractHeight?: number;
  hasNumericalOrder?: boolean;
  actionRows?: {
    // addition action if needed
    onGetList?: (id: number) => void;
    onUpdate?: (values: any) => void;
    onDelete?: (id: number) => void;
    screen: ScreenType;
  };
}) => {
  const { height } = useWindowSize();
  const { t } = useTranslation();
  const defaultCols: ColumnsType<T> = [
    {
      title: t('numerical_order'),
      fixed: 'left',
      width: 100,
      render: (_, __, index) => index + 1,
    },
    ...columns,
  ];
  const cols: ColumnsType<T> = actionRows
    ? [
        ...defaultCols,
        {
          dataIndex: 'id',
          width: 200,
          fixed: 'right',
          render: (_, record) => (
            <ActionsRow
              onGetList={actionRows.onGetList ? () => actionRows?.onGetList?.(record.id) : undefined}
              onUpdate={actionRows.onUpdate ? () => actionRows?.onUpdate?.(record) : undefined}
              onDelete={actionRows.onDelete ? () => actionRows?.onDelete?.(record.id) : undefined}
              screen={actionRows.screen}
            />
          ),
        },
      ]
    : [...defaultCols];

  return (
    <Table<T>
      className={`mt-2 ${className} `}
      size="small"
      rowKey={rowKey}
      pagination={{
        total: totalItems,
        pageSize: defaultPageSize,
        current: currentPage !== undefined ? currentPage + 1 : undefined, // api return page begin from 0
        showTotal: (total) => `${t('total')}: ${total}`,
        showSizeChanger: false,
      }}
      rowSelection={
        rowSelection
          ? {
              ...rowSelection,
              fixed: 'left',
              columnWidth: 50,
            }
          : undefined
      }
      columns={cols}
      scroll={{
        x: scroll?.x ?? 1024,
        y: subtractHeight ? height - subtractHeight : undefined,
      }}
      {...props}
    />
  );
};

export const ActionsRow = ({
  onView,
  onChangePassword,
  onUpdate,
  onDelete,
  onGetList,
  onGetLogs,
  onGetLicenses,
  screen,
}: {
  onView?: () => void;
  onChangePassword?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
  onGetList?: () => void;
  onGetLogs?: () => void;
  onGetLicenses?: () => void;
  screen?: ScreenType;
}) => {
  const { t } = useTranslation();
  const permission = checkPermission(screen);

  const actions = [
    {
      action: onView,
      children: (
        <ButtonGlobal
          type="default"
          className="min-w-8 cursor-pointer rounded-md border border-blue-200 bg-white !px-1 py-1 text-primary hover:bg-primary hover:text-white"
          onClick={onView}
          icon={<ViewIcon />}
        />
      ),
      tooltip: 'view',
      key: EActionKey.View,
    },
    {
      action: onChangePassword,
      children: (
        <ButtonGlobal
          type="default"
          className="min-w-8 cursor-pointer rounded-md border border-blue-200 bg-white !px-1 py-1 text-primary hover:bg-primary hover:text-white"
          onClick={onChangePassword}
          icon={<LockOutlined />}
        />
      ),
      tooltip: 'change_password',
      key: EActionKey.ChangePassword,
    },
    {
      action: onUpdate,
      children: (
        <ButtonGlobal
          type="default"
          className="min-w-8 cursor-pointer rounded-md border border-blue-200 bg-white !px-1 py-1 text-primary hover:bg-primary hover:text-white"
          onClick={onUpdate}
          icon={<EditOutlined />}
        />
      ),
      tooltip: 'update',
      key: EActionKey.Update,
    },
    {
      action: onGetLicenses,
      children: (
        <ButtonGlobal
          type="default"
          className="min-w-8 cursor-pointer rounded-md border border-blue-200 bg-white !px-1 py-1 text-primary hover:bg-primary hover:text-white"
          onClick={onGetLicenses}
          icon={<SettingOutlined />}
        />
      ),
      tooltip: 'service',
      key: EActionKey.ConfigLicense,
    },
    {
      action: onGetLogs,
      children: (
        <ButtonGlobal
          type="default"
          className="min-w-8 cursor-pointer rounded-md border border-blue-200 bg-white !px-1 py-1 text-primary hover:bg-primary hover:text-white"
          onClick={onGetLogs}
          icon={<HistoryOutlined />}
        />
      ),
      tooltip: 'diary',
      key: EActionKey.Log,
    },
    {
      action: onGetList,
      children: (
        <ButtonGlobal
          type="default"
          className="min-w-8 cursor-pointer place-content-center rounded-md border border-blue-200 bg-white !px-1 py-1 hover:text-white"
          onClick={onGetList}
          icon={<ListIcon />}
        />
      ),
      tooltip: 'get_list',
      key: EActionKey.GetList,
    },
    {
      action: onDelete,
      children: permission?.isDecision && (
        <ButtonGlobal
          type="text"
          className="min-w-8 cursor-pointer place-content-center rounded-md border border-blue-200 bg-white !px-1 py-1"
          onClick={onDelete}
          icon={<DeleteIcon />}
        />
      ),
      tooltip: 'delete',
      key: EActionKey.Delete,
    },
  ];

  return (
    <div className="flex place-content-center gap-2">
      {actions.map((action) => (
        <Fragment key={action.key}>
          {action.action && <Tooltip title={t(action.tooltip)}>{action.children}</Tooltip>}
        </Fragment>
      ))}
    </div>
  );
};

export const HeaderTable = ({
  title,
  getListPage = false,
  disableDelete,
  onCreate,
  onBulkDelete,
  screen,
}: {
  title: string;
  getListPage?: boolean;
  disableDelete?: boolean;
  onCreate?: () => void;
  onBulkDelete?: () => void;
  screen?: ScreenType;
}) => {
  const permission = checkPermission(screen);

  return (
    <div className="mb-2 flex items-center justify-between">
      <div className={`text-xl font-bold`}>
        {getListPage && <ArrowLeftOutlined className="mr-3 cursor-pointer" onClick={() => window.history.back()} />}
        <span>{title}</span>
      </div>
      <div className="flex justify-between gap-2">
        {onCreate && (screen ? permission?.isWrite : true) && <ButtonGlobal.Add onClick={() => onCreate?.()} />}
        {onBulkDelete && (screen ? permission?.isDecision : true) && (
          <ButtonGlobal.Delete onClick={() => onBulkDelete?.()} disabled={disableDelete} />
        )}
      </div>
    </div>
  );
};

export default TableGlobal;
