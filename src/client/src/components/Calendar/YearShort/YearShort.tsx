import { FC } from 'react';
import './yearShort.scss';
import { format } from 'date-fns';
import { locale } from '../../../utils/Consts/Consts';

interface Props {
    /** Отображаемая дата. */
    currentDate: Date;
    /** True, для выбранного года. */
    active: boolean;
    /** Метод, для изменения года. */
    onChange: (date: Date) => void;
    /** Обработчик выбора года. */
    onClick: () => void;
}

const YearShort: FC<Props> = (props) => {
    const { active, currentDate, onClick, onChange } = props;

    /** Обработка выбора года. */
    const handleClick = (): void => {
        onChange(currentDate);
        onClick();
    };

    const customClass = ['year-short'];
    !!active && customClass.push('year--active');
    const year = format(currentDate, 'yyyy', { locale });

    return (
        <div className={customClass.join(' ')} onClick={handleClick}>
            {year}
        </div>
    );
};

export default YearShort;
