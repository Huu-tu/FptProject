import { ConfigProvider } from 'antd';
import enLocale from 'antd/locale/en_US';
import viLocale from 'antd/locale/vi_VN';
import { COLOR_PRIMARY, KEY_LANGUAGE, LANGUAGE_VI } from 'config/constants';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import { RouterProvider } from 'react-router-dom';
import { routers } from 'routes';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

function App() {
  return (
    <ConfigProvider
      locale={
        window.localStorage.getItem(KEY_LANGUAGE)
          ? window.localStorage.getItem(KEY_LANGUAGE) === LANGUAGE_VI
            ? viLocale
            : enLocale
          : viLocale
      }
      theme={{
        token: {
          colorPrimary: COLOR_PRIMARY,
          fontFamily: 'Inter',
        },
        hashed: false,
      }}
    >
      <RouterProvider router={routers} />
    </ConfigProvider>
  );
}

export default App;
