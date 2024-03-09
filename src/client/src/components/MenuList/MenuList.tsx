import './menuList.scss';
import { Icon } from '../Icon/Icon';

const MenuList = () => {
    const handleMenuItemClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <ul className="menu-list">
            <li onClick={handleMenuItemClick} className="menu-item">
                <div className="menu-item__content">
                    <Icon iconName="sport" />
                    <span className="menu-item__content__text">Спорт</span>
                </div>
            </li>
            <li onClick={handleMenuItemClick} className="menu-item">
                <div className="menu-item__content">
                    <Icon iconName="edit-notes" />
                    <span className="menu-item__content__text">Заметки</span>
                </div>
            </li>
            <li onClick={handleMenuItemClick} className="menu-item">
                <div className="menu-item__content">
                    <Icon iconName="food" />
                    <span className="menu-item__content__text">Питание</span>
                </div>
            </li>
        </ul>
    );
};

export default MenuList;
