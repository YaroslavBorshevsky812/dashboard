import { FC, MouseEventHandler } from 'react';
import './listItem.scss';
import { ReactComponent as Garbage } from '../../assets/icons/garbage.svg';
import { EItemListType } from '../../utils/enums/Enums';

interface Props {
    /** Заголовок слева */
    leftTitle?: string;
    /** Заголовок справа */
    rightTitle?: string;
    /** Клик по айтему */
    onItemClick?: () => void;
    /** Есть ли иконка */
    isBtnNeeded?: boolean;
    /** Тип айтема */
    itemType?: EItemListType;
    /** Первый элемент строки таблицы */
    firtsRowItem?: string | number;
    /** Второй элемент строки таблицы */
    secondRowItem?: string | number;
    /** Третий элемент строки таблицы */
    thirdRowItem?: string | number;
    /** Событие наведения. */
    onMouseEnter?: MouseEventHandler<HTMLLIElement>;
    /** Событие перемещение мыши за границу элемента. */
    onMouseLeave?: MouseEventHandler<HTMLLIElement>;
    /** Событие нажатия на иконку удаления. */
    onDeleteBtn?: () => void;
}

const ListItem: FC<Props> = (props) => {
    const {
        leftTitle,
        rightTitle,
        onItemClick,
        isBtnNeeded,
        onMouseEnter,
        onMouseLeave,
        onDeleteBtn,
    } = props;

    const handleDeleteBtn = (e?: React.MouseEvent) => {
        e?.stopPropagation();

        onDeleteBtn && onDeleteBtn();
    };

    return (
        <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onItemClick} className="list-item">
            <span className="list-item__left-title">{leftTitle}</span>
            <span className="list-item__right-title">{rightTitle}</span>
            {isBtnNeeded && <Garbage onClick={handleDeleteBtn} className="list-item__icon" />}
        </li>
    );
};

export default ListItem;
