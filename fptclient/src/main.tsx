import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import 'dayjs/locale/vi';
// import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/storage';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';

import './i18n';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.locale('vi');

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider>
        <App />
    </ConfigProvider>,
);
