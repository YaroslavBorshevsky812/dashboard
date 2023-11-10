import './menuList.scss';
import { ReactComponent as Dumbell } from '../../assets/icons/dumbell.svg';
import { ReactComponent as Food } from '../../assets/icons/food.svg';
import { ReactComponent as Notes } from '../../assets/icons/notes.svg';

const MenuList = () => {
    const handleMenuItemClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <ul className="menu-list">
            <li onClick={handleMenuItemClick} className="menu-item">
                <div className="menu-item__content">
                    <Dumbell className="menu-item__content__icon" />
                    <span className="menu-item__content__text">Спорт</span>
                </div>
            </li>
            <li onClick={handleMenuItemClick} className="menu-item">
                <div className="menu-item__content">
                    <Notes className="menu-item__content__icon" />
                    <span className="menu-item__content__text">Заметки</span>
                </div>
            </li>
            <li onClick={handleMenuItemClick} className="menu-item">
                <div className="menu-item__content">
                    <Food className="menu-item__content__icon" />
                    <span className="menu-item__content__text">Питание</span>
                </div>
            </li>
        </ul>
    );
};

export default MenuList;
