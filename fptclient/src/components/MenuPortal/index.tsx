import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { FPT_ROUTERS } from 'config/constants';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PermissionRes } from 'types/SwaggerTypeAdmin';
import classes from './Menu.module.scss';

type MenuItem = ItemType & {
  permission?: PermissionRes['permission'];
  children?: MenuItem[];
};

const { FPT } = FPT_ROUTERS;

const MenuPortal = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(window.location.pathname);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const fptMenuItems: MenuItem[] = [
    {
      key: FPT.BASE,
      label: t('overview'),
      title: t('overview'),
      permission: 'ADMIN_DASHBOARD',
    },
    {
      key: FPT.BASE,
      title: t('agent'),
      label: t('agent'),
      permission: 'ADMIN_AGENCY',
    },
    {
      key: FPT.BASE,
      title: t('business'),
      label: t('business'),
      permission: 'ADMIN_BUSINESS',
    },
    {
      key: FPT.BASE,
      title: t('support'),
      label: t('support'),
      permission: 'ADMIN_HELP',
    },
    {
      key: FPT.BASE,
      title: t('setup'),
      label: t('setup'),
      icon: <FontAwesomeIcon icon={faChevronDown} />,
      children: [
        {
          key: FPT.BASE,
          title: t('authorization_configuration'),
          label: t('authorization_configuration'),
          permission: 'ADMIN_ROLE',
        },
        {
          key: FPT.BASE,
          title: t('field_management', { field: t('document') }),
          label: t('field_management', { field: t('document') }),
          permission: 'ADMIN_DOCUMENT',
        },
        {
          key: FPT.BASE,
          title: t('field_management', { field: t('auth.account') }),
          label: t('field_management', { field: t('auth.account') }),
          permission: 'ADMIN_ACCOUNT',
        },
      ],
    },
  ];

  const { menuItems, defaultSelectedKey } = useMemo(() => {
    return {
      menuItems: fptMenuItems,
      defaultSelectedKey: [],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
