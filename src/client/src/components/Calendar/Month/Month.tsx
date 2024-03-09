import { FC } from 'react';
import { addDays, addWeeks, format, getWeeksInMonth, startOfMonth, startOfWeek } from 'date-fns';
import Week from '../Week/Week';
import './month.scss';
import { locale } from '../../../utils/Consts/Consts';

interface Props {
    /** Текущий день месяца. */
    currentDate: Date;
    /** Выбранный день. */
    selectedDate: Date;
    /** Минимальная возможная дата. */
    minDate?: Date;
    /** Максимальная возможная дата. */
    maxDate?: Date;
    /** Обработчик изменения даты. */
    onChange: (date: Date) => void;
    /** Обработчик перехода на предыдущий месяц/год . */
    onPrev: () => void;
    /** Обработчик перехода на следующий месяц/год . */
    onNext: () => void;
}

const Month: FC<Props> = (props) => {
    const { currentDate, selectedDate, onChange, onNext, onPrev, minDate, maxDate } = props;

    const renderLabels = (): JSX.Element[] => {
        const startDate = startOfWeek(currentDate, { locale });
        const countDays = 7;

        return Array.call(null, ...new Array(countDays)).map((_, offset) => {
            const day = addDays(startDate, offset);

            return (
                <div key={offset} className="month__label">
                    {format(day, 'EEEEEE', { locale })}
                </div>
            );
        });
    };

    const renderWeeks = () => {
        const startDate = startOfMonth(currentDate);
        const countDays = getWeeksInMonth(startDate, { locale });
        return Array.call(null, ...new Array(countDays)).map((_, offset) => {
            const week = addWeeks(startDate, offset);

            return (
                <Week
                    monthDate={currentDate}
                    key={offset}
                    currentDate={week}
                    selectedDate={selectedDate}
                    onChange={onChange}
                    onPrev={onPrev}
                    onNext={onNext}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            );
        });
    };

    return (
        <div className="month">
            <div className="month__label-list">{renderLabels()}</div>
            {renderWeeks()}
        </div>
    );
};

export default Month;
