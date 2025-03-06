import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const MainLayout = () =>{
    return(
        <Layout>
            <Outlet />
        </Layout>
    )
};

export default MainLayout;