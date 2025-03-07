import { Link } from 'react-router-dom';
import logo from '/images/logo.png';
import { Dropdown, Image } from 'antd';
import { memo } from 'react';

const AppHeader = memo(()=>{


    return(
        <div className="flex h-full items-center justify-between px-8">
            <Link to={"/"} className="flex justify-center">
                <Image preview={false} src={logo} alt="Logo ITS" width={100} height={60}/>
            </Link>

            <div className="flex h-full w-full items-center justify-end">
                <Dropdown
                    menu={{

                    }}
                />
                ddd
            </div>
        </div>)
});

export default AppHeader;