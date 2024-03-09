import { format } from 'date-fns';
import { FC } from 'react';
import './day.scss';
import { locale } from '../../../utils/Consts/Consts';

interface Props {
    /** Отображаемая дата. */
    currentDate: Date;
    /** True, для выбранного дня. */
    active: boolean;
    /** True, для дней, не входящие в выбранный промежуток. */
    disabled?: boolean;
    /** True, для дней, не входящие в активный месяц. */
    notCurrentMonth?: boolean;
    /** Метод, для изменения дня. */
    onChange: (date: Date) => void;
    /** Обработчик выбора дня. */
    onClick: () => void;
}

const Day: FC<Props> = (props) => {
    const { currentDate, notCurrentMonth, active, onClick, onChange, disabled } = props;

    /** Обработка выбора дня. */
    const handleClick = (): void => {
        !disabled && onChange(currentDate);
        !disabled && onClick();
    };

    const customClass = ['day'];

    !!notCurrentMonth && customClass.push('day--not-current');
    !!disabled && customClass.push('day--disabled');
    !!active && !notCurrentMonth && customClass.push('day--active');
    const day = format(currentDate, 'dd', { locale });

    return (
        <div className={customClass.join(' ')} onClick={handleClick}>
            {day}
        </div>
    );
};

export default Day;
