import { createBrowserRouter } from 'react-router-dom';
import OverviewPage from 'pages/company/Overview';
import MainLayout from "../components/Layout/Main";

export const routers = createBrowserRouter([
    {
        path: '*',
        element: <MainLayout />,
        children: [
            {
                path: "*",
                element: <OverviewPage />,
            }
        ]
    }
])