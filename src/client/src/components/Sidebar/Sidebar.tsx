import { useState } from 'react';
import MenuList from '../MenuList/MenuList';
import './sidebar.scss';

const Sidebar = () => {
    const [isSidebarClosed, setIsSidebarClosed] = useState<boolean>(false);

    const sidebarClass = ['sidebar'];
    isSidebarClosed && sidebarClass.push('closed');

    const handleSidebarClosed = () => {
        setIsSidebarClosed(!isSidebarClosed);   
    };

    return (
        <div className={sidebarClass.join(' ')} onClick={handleSidebarClosed}>
            <div className="sidebar__header"></div>
            <div className="sidebar__body">
                <MenuList />
            </div>
        </div>
    );
};

export default Sidebar;
