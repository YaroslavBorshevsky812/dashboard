import { FC } from 'react';
import './card.scss';
import { ReactComponent as Plus } from '../../assets/icons/plus-circle.svg';

interface Props {
    /** Заголовок справа */
    titleRight?: String;
    /** Заголовок слева */
    titleLeft?: String;
    /** Дочерние компоненты. */
    children?: React.ReactNode;
    /** Класс компонента */
    className?: string;
    /** Нужен ли сайдбар */
    isSideBar?: boolean;
    /** Сайдбар */
    sideBar?: JSX.Element;
    /** Событие клика по кнопке закрытия. */
    onExitClick?: () => void;
}

const Card: FC<Props> = (props) => {
    const { children, titleLeft, titleRight, className, isSideBar, sideBar, onExitClick } = props;

    const customClass = ['card'];
    !!className && customClass.push(className);
    isSideBar && customClass.push('with-sidebar');

    return (
        <div className={customClass.join(' ')}>
            <div className="card__header">
                <div className="card__header__btn">
                    <Plus onClick={onExitClick} className="exit-btn" />
                </div>
                <div className="card__header__title">
                    <span>{titleLeft}</span>
                    <span>{titleRight}</span>
                </div>
            </div>
            <div className="card__body">
                <div className="card__body__content">{children}</div>
                {isSideBar && sideBar && sideBar}
            </div>
        </div>
    );
};

export default Card;
