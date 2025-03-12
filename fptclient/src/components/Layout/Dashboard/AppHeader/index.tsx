import { Image, Button, Carousel } from 'antd';
import { memo } from 'react';

import { Link } from 'react-router-dom';

import logoViettel from '/images/viettel_logo.png';

import MenuPortal from 'components/MenuPortal';

const AppHeader = memo(() => {
  // const { t } = useTranslation();


  return (
    <div className="flex h-full items-center justify-between px-8">
      <Link to={'/'} className="flex justify-center">
        <Image preview={false} src={logoViettel} alt="Logo Viettel" width={120} height={60} />
      </Link>

      <MenuPortal />

      <div className="flex h-full w-full items-center justify-end">
        <div>
          <div className="flex h-full items-center justify-between">
            <div className="ms-2 cursor-pointer leading-none">
              <Button type="primary" shape="round" danger>
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AppHeader;
