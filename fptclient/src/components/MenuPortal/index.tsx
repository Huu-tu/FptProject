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
      key: FPT.INFO.INDEX,
      label: t('info_event'),
      title: t('info_event'),
      icon: <FontAwesomeIcon icon={faChevronDown} />,
      children: [
        {
          key: FPT.INFO.INDEX,
          title: t('info_event'),
          label: t('info_event'),
          permission: 'ADMIN_ROLE',
        },
        {
          key: FPT.INFO.INTRO_VIETTEL,
          title: t('intro_viettel'),
          label: t('intro_viettel'),
          permission: 'ADMIN_ACCOUNT',
        },
      ],
    },
    {
      key: FPT.PRODUCT,
      title: t('product_service'),
      label: t('product_service'),
      icon: <FontAwesomeIcon icon={faChevronDown} />,
      children: [
        {
          key: FPT.SUPPORT.SUPPORT_ONLINE,
          title: t('support_online'),
          label: t('support_online'),
          permission: 'ADMIN_ROLE',
        },
        {
          key: FPT.SUPPORT.SUPPORT_CALL,
          title: t('support_call'),
          label: t('support_call'),
          permission: 'ADMIN_DOCUMENT',
        },
        {
          key: FPT.SUPPORT.SUPPORT_QUESTION,
          title: t('support_question'),
          label: t('support_question'),
          permission: 'ADMIN_ACCOUNT',
        },
      ],
    },
    {
      key: FPT.SUPPORT.INDEX,
      title: t('support_customer'),
      label: t('support_customer'),
      icon: <FontAwesomeIcon icon={faChevronDown} />,
      children: [
        {
          key: FPT.SUPPORT.SUPPORT_ONLINE,
          title: t('support_online'),
          label: t('support_online'),
          permission: 'ADMIN_ROLE',
        },
        {
          key: FPT.SUPPORT.SUPPORT_CALL,
          title: t('support_call'),
          label: t('support_call'),
          permission: 'ADMIN_DOCUMENT',
        },
        {
          key: FPT.SUPPORT.SUPPORT_QUESTION,
          title: t('support_question'),
          label: t('support_question'),
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
