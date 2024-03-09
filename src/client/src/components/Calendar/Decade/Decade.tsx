import { FC } from 'react';
import './decade.scss';
import { startOfYear, addYears, getYear, isSameYear, setYear } from 'date-fns';
import YearShort from '../YearShort/YearShort';

interface Props {
    /** Отображаемая дата. */
    currentDate: Date;
    /** Выбранная дата. */
    selectedDate: Date;
    /** Метод, для изменения даты. */
    onChange: (modifier: (date: Date) => Date) => void;
}

const Decade: FC<Props> = (props) => {
    const { currentDate, selectedDate, onChange } = props;

    /**
     * Изменение даты.
     *
     * @param newDate Дата.
     */
    const handleChange = (newDate: Date): void => {
        onChange((date: Date): Date => setYear(date, getYear(newDate)));
    };

    /** Функция отрисовки списка годов, входящих в десятилетие. */
    const renderYearList = (): JSX.Element[] => {
        const startDate = startOfYear(currentDate);
        const countYear = 9;

        const handleClick = () => {
            return;
        };

        return Array.call(null, ...new Array(countYear)).map((_, offset) => {
            const year = addYears(startDate, offset);

            return (
                <YearShort
                    key={offset}
                    currentDate={year}
                    active={isSameYear(selectedDate, year)}
                    onChange={handleChange}
                    onClick={handleClick}
                />
            );
        });
    };

    return <div className="decade">{renderYearList()}</div>;
};

export default Decade;
