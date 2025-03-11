import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { APP, PRIVATE_ROUTERS } from 'config/constants';
import { checkPermission } from 'libs/utils/checkPermission';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'types/store';
import { PermissionRes } from 'types/SwaggerTypeAdmin';
import classes from './Menu.module.scss';

type MenuItem = ItemType & {
  permission?: PermissionRes['permission'];
  children?: MenuItem[];
};

const { ADMIN, BUSINESS } = PRIVATE_ROUTERS;

const MenuPortal = () => {
  const currentUser = useSelector((state: RootState) => state.user);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(window.location.pathname);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const adminMenuItems: MenuItem[] = [
    {
      key: ADMIN.OVERVIEW,
      label: t('overview'),
      title: t('overview'),
      permission: 'ADMIN_DASHBOARD',
    },
    {
      key: ADMIN.AGENT,
      title: t('agent'),
      label: t('agent'),
      permission: 'ADMIN_AGENCY',
    },
    {
      key: ADMIN.COMPANY,
      title: t('business'),
      label: t('business'),
      permission: 'ADMIN_BUSINESS',
    },
    {
      key: ADMIN.SUPPORT,
      title: t('support'),
      label: t('support'),
      permission: 'ADMIN_HELP',
    },
    {
      key: ADMIN.SETUP.INDEX,
      title: t('setup'),
      label: t('setup'),
      icon: <FontAwesomeIcon icon={faChevronDown} />,
      children: [
        {
          key: ADMIN.SETUP.AUTHORIZATION_CONFIG,
          title: t('authorization_configuration'),
          label: t('authorization_configuration'),
          permission: 'ADMIN_ROLE',
        },
        {
          key: ADMIN.SETUP.DOC_MANAGEMENT,
          title: t('field_management', { field: t('document') }),
          label: t('field_management', { field: t('document') }),
          permission: 'ADMIN_DOCUMENT',
        },
        {
          key: ADMIN.SETUP.ACCOUNT_MANAGEMENT,
          title: t('field_management', { field: t('auth.account') }),
          label: t('field_management', { field: t('auth.account') }),
          permission: 'ADMIN_ACCOUNT',
        },
      ],
    },
  ];

  const businessMenuItems: MenuItem[] = [
    {
      key: BUSINESS.OVERVIEW,
      label: t('overview'),
      title: t('overview'),
      permission: 'USER_DASHBOARD',
    },
    {
      key: BUSINESS.LOGS,
      title: t('diary'),
      label: t('diary'),
      permission: 'USER_LOG',
    },
    {
      key: BUSINESS.CONVERSION_METRICS,
      title: t('conversion_metrics'),
      label: t('conversion_metrics'),
      permission: 'USER_CONVERSION_METRIC',
    },
    {
      key: BUSINESS.SUPPORT,
      title: t('support'),
      label: t('support'),
      permission: 'USER_BUSINESS',
    },
    {
      key: BUSINESS.SETUP.INDEX,
      title: t('setup'),
      label: t('setup'),
      icon: <FontAwesomeIcon icon={faChevronDown} />,
      children: [
        {
          key: BUSINESS.SETUP.SERVICE_CONFIG,
          title: t('service_configuration'),
          label: t('service_configuration'),
          permission: 'USER_BUSINESS',
        },
        {
          key: BUSINESS.SETUP.AUTHORIZATION_CONFIG,
          title: t('authorization_configuration'),
          label: t('authorization_configuration'),
          permission: 'USER_ROLE',
        },
        {
          key: BUSINESS.SETUP.DOCS_MANAGEMENT,
          title: t('field_management', { field: t('document') }),
          label: t('field_management', { field: t('document') }),
          permission: 'USER_BUSINESS',
        },
        {
          key: BUSINESS.SETUP.ACCESS_ACCOUNT,
          title: t('access_account'),
          label: t('access_account'),
          permission: 'USER_ACCOUNT',
        },
      ],
    },
  ];

  const adminMenuItemsByPermission = adminMenuItems.filter(
    (i) =>
      checkPermission(i.permission)?.isView || i.children?.some((c: MenuItem) => checkPermission(c.permission)?.isView),
  );
  const agencyMenuItemByPermission = adminMenuItemsByPermission.filter((i) => i?.key === ADMIN.AGENT);

  const companyMenuItemsByPermission = businessMenuItems.filter(
    (i) =>
      checkPermission(i.permission)?.isView || i.children?.some((c: MenuItem) => checkPermission(c.permission)?.isView),
  );
  const { menuItems, defaultSelectedKey } = useMemo(() => {
    if (currentUser[APP.ADMIN]) {
      return {
        menuItems: currentUser[APP.ADMIN].agencyId ? agencyMenuItemByPermission : adminMenuItemsByPermission,
        defaultSelectedKey: [ADMIN.OVERVIEW],
      };
    }
    if (currentUser[APP.PROVIDER]) {
      return {
        menuItems: companyMenuItemsByPermission,
        defaultSelectedKey: [BUSINESS.OVERVIEW],
      };
    }
    return {
      menuItems: [],
      defaultSelectedKey: [],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleSelectMenu: MenuProps['onClick'] = ({ key, domEvent }): void => {
    document.head.title = (domEvent.target as HTMLElement).textContent as string;
    setSelectedMenuItem(key);
    navigate(key);
  };

  return (
    <Menu
      defaultSelectedKeys={defaultSelectedKey}
      selectedKeys={[selectedMenuItem]}
      expandIcon
      mode="horizontal"
      items={menuItems}
      onClick={handleSelectMenu}
      className={`ml-10 w-full bg-inherit text-[0.875rem] font-medium ${classes.menu}`}
    />
  );
};

export default MenuPortal;
