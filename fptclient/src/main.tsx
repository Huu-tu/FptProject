import { ConfigProvider, notification } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import ReactDOM from 'react-dom/client';

import { COLOR_PRIMARY } from 'config/constants/index.ts';
import App from './App.tsx';

import 'dayjs/locale/vi';
// import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/storage';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';

import './i18n';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './styles/index.scss';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.locale('vi');
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      notification.error(error);
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: COLOR_PRIMARY,
      },
    }}
  >
    <QueryClientProvider client={queryClient}>
        <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ConfigProvider>,
);
