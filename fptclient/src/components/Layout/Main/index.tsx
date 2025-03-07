import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import classes from './Style/Main.module.scss';
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const MainLayout = () =>{
    return(
        <Layout className={`h-screen ${classes.dashboard}`}>
            <Layout.Header>
                <AppHeader />
            </Layout.Header>
            <Layout.Content>
                <Outlet />
            </Layout.Content>
            <Layout.Footer>
                <AppFooter/>
            </Layout.Footer>
        </Layout>
    )
};

export default MainLayout;