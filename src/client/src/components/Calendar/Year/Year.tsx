import { FC } from 'react';
import './year.scss';
import MonthShort from '../MonthShort/MonthShort';
import { setMonth, getMonth, startOfYear, addMonths, isSameMonth } from 'date-fns';

interface Props {
    /** Отображаемая дата. */
    currentDate: Date;
    /** Выбранная дата. */
    selectedDate: Date;
    /** Метод, для изменения даты. */
    onChange: (modifier: (date: Date) => Date) => void;
}

const Year: FC<Props> = (props) => {
    const { currentDate, selectedDate, onChange } = props;

    /**
     * Изменение даты.
     *
     * @param newDate Дата.
     */
    const handleChange = (newDate: Date): void => {
        onChange((date: Date): Date => setMonth(date, getMonth(newDate)));
    };

    const handleClick = () => {
        return
    };

    /** Отрисовка списка месяцев для выбора. */
    const renderMonthList = (): JSX.Element[] => {
        const startDate = startOfYear(currentDate);
        const countMonth = 12;

        

        return Array.call(null, ...new Array(countMonth)).map((_, offset) => {
            const month = addMonths(startDate, offset);

            return (
                <MonthShort
                    key={offset}
                    currentDate={month}
                    active={isSameMonth(selectedDate, month)}
                    onChange={handleChange}
                    onClick={handleClick}
                />
            );
        });
    };

    return <div className="year">{renderMonthList()}</div>;
};

export default Year;
