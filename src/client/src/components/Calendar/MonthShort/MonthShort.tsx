import { FC } from 'react';
import './monthShort.scss';
import { locale } from '../../../utils/Consts/Consts';
import { format } from 'date-fns';

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

const MonthShort: FC<Props> = (props) => {
    const { currentDate, onClick, onChange, active } = props;

    /** Обработка выбора года. */
    const handleClick = (): void => {
        onChange(currentDate);
        onClick();
    };

    const customClass = ['month-short'];
    !!active && customClass.push('month-short--active');
    const month = format(currentDate, 'LLLL', { locale });

    return (
        <div className={customClass.join(' ')} onClick={handleClick}>
            {month}
        </div>
    );
};

export default MonthShort;
