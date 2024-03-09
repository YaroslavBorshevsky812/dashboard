import { FC } from 'react';
import Day from '../Day/Day';
import './week.scss';
import { noop } from 'lodash-es';
import { addDays, addMonths, isAfter, isBefore, isSameDay, isSameMonth, startOfWeek } from 'date-fns';
import { locale } from '../../../utils/Consts/Consts';

interface Props {
    /** Дата месяца. */
    monthDate: Date;
    /** Отображаемая дата. */
    currentDate: Date;
    /** Выбранная дата. */
    selectedDate: Date;
    /** Минимальная возможная дата. */
    minDate?: Date;
    /** Максимальная возможная дата. */
    maxDate?: Date;
    /** Метод изменения дня. */
    onChange: (date: Date) => void;
    /** Метод изменения месяца на предыдущий. */
    onPrev: () => void;
    /** Метод изменения месяца на следующий. */
    onNext: () => void;
}

const Week: FC<Props> = (props) => {
    const {
        currentDate,
        monthDate,
        onChange,
        onNext,
        onPrev,
        selectedDate,
        minDate = new Date(),
        maxDate = new Date(),
    } = props;

    let handleClick = noop;

    const renderDays = () => {
        const startDate = startOfWeek(currentDate, { locale });
        const countDays = 7;

        const prevMonth = addMonths(monthDate, -1);
        const nextMonth = addMonths(monthDate, 1);
        return Array.call(null, ...new Array(countDays)).map((_, offset) => {
            const day = addDays(startDate, offset);
            const isPrevMonth = isSameMonth(prevMonth, day);
            const isNextMonth = isSameMonth(nextMonth, day);
            const isCurrentMonth = isSameMonth(day, monthDate);
            const isMinDate = isBefore(day, minDate);
            const isMaxDate = isAfter(day, maxDate);

            if (isPrevMonth) {
                handleClick = onPrev;
            } else if (isNextMonth) {
                handleClick = onNext;
            } else if (isCurrentMonth || isMinDate || isMaxDate) {
                handleClick = noop;
            }

            const notCurrentMonth = (isPrevMonth || isNextMonth) && !isCurrentMonth;
            const disabled = isMinDate || isMaxDate;

            return (
                <Day
                    key={offset}
                    currentDate={day}
                    active={isSameDay(selectedDate, day)}
                    notCurrentMonth={notCurrentMonth}
                    disabled={disabled}
                    onChange={onChange}
                    onClick={handleClick}
                />
            );
        });
    };

    return <div className="week">{renderDays()}</div>;
};

export default Week;
