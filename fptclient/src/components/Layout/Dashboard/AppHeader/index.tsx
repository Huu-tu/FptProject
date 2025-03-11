import { Image } from 'antd';
import { memo } from 'react';

import { Link } from 'react-router-dom';

import logoITS from '/images/logo_its.png';

import MenuPortal from 'components/MenuPortal';

export const KEY_LIST_CUSTOMER = 'KEY_LIST_CUSTOMER';
export const KEY_UPDATE_LIST_CUSTOMER = 'KEY_UPDATE_LIST_CUSTOMER';

const AppHeader = memo(() => {
  // const { t } = useTranslation();

  // const itemsMenuDropdown = useMemo((): MenuProps['items'] => {
  //   const items: MenuProps['items'] = [
  //     {
  //       key: EMenu.PROFILE,
  //       label: t('personal_information'),
  //       onClick: () =>
  //         openModal({
  //           content: <ModalUpdateCompanyProfile />,
  //           options: {
  //             width: 1000,
  //             title: t('personal_information'),
  //           },
  //         }),
  //     },
  //     {
  //       key: EMenu.CHANG_PASSWORD,
  //       label: t('change_password'),
  //       onClick: () =>
  //         openModal({
  //           content: <ModalChangePassword />,
  //           options: {
  //             width: 1000,
  //             title: t('update_field', { field: t('password') }),
  //           },
  //         }),
  //     },
  //     {
  //       key: EMenu.LOGOUT,
  //       label: t('log_out'),
  //       onClick: logoutUser,
  //     },
  //   ];
  //   return items;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="flex h-full items-center justify-between px-8">
      <Link to={'/'} className="flex justify-center">
        <Image preview={false} src={logoITS} alt="Logo ITS" width={120} height={70} />
      </Link>

      <MenuPortal />

      <div className="flex h-full w-full items-center justify-end">
        {/*<Dropdown*/}
        {/*  menu={{*/}
        {/*    items: itemsMenuDropdown,*/}
        {/*  }}*/}
        {/*  placement="bottom"*/}
        {/*  className="h-full"*/}
        {/*>*/}
        {/*  <div>*/}
        {/*    <div className="flex h-full items-center justify-between">*/}
        {/*      <div className="flex h-full w-10 items-center overflow-hidden">*/}
        {/*        <Image*/}
        {/*          src={defaultAvatar}*/}
        {/*          alt={'avatar'}*/}
        {/*          preview={false}*/}
        {/*          className="flex w-full cursor-pointer items-center overflow-hidden rounded-full object-cover"*/}
        {/*          title={'avatar'}*/}
        {/*          width={38}*/}
        {/*          height={38}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*      <div className="ms-2 cursor-pointer leading-none">*/}
        {/*        <p className="truncate text-sm font-medium">d</p>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</Dropdown>*/}
      </div>
    </div>
  );
});

export default AppHeader;
