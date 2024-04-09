import { FC, useState } from 'react';
import './datePicker.scss';
import TextInput from '../TextInput/TextInput';
import { subYears, addYears } from 'date-fns';
import Calendar from '../Calendar/Calendar';
import { format } from 'date-fns';
import { locale } from '../../utils/Consts/Consts';
import { Icon } from '../Icon/Icon';

interface Props {
    /** Идентификатор. */
    id?: number;
    /** Метод изменения даты. */
    onChange: (date: Date) => void;
}

const DatePicker: FC<Props> = (props) => {
    const { onChange } = props;

    const [isCalendarShown, setIsCalendarShown] = useState(false);

    /** Выбранная дата. */
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    const [inputValue, setInputValue] = useState('');

    /** Сегодняшняя дата. */
    const today = new Date();

    const handleToggleCalendar = () => {
        setIsCalendarShown(!isCalendarShown);
    };

    const handleCloseCalendar = () => {
        setIsCalendarShown(false);
    };

    /**
     * Обработчик изменения даты в календаре.
     *
     * @param date Дата.
     *
     */
    const handleCalendarChange = (date: Date): void => {
        const currentDate = new Date();
        date.setHours(currentDate.getHours())
        date.setMinutes(currentDate.getMinutes())
        date.setSeconds(currentDate.getSeconds())
        setSelectedDate(date);
        setInputValue(format(date, 'dd-MM-yyyy', { locale }));
        setIsCalendarShown(false);
        onChange(date);
    };

    return (
        <div className="date-time-field-wrapper">
            <TextInput disabled={true} value={inputValue} placeholder={'Выберете дату'} className="date-picker-input" />
            <div onClick={handleToggleCalendar} className="calendar-btn">
                <Icon iconName="calendar" />
            </div>
            {isCalendarShown && (
                <Calendar
                    className="date-picker-calendar"
                    onChange={(date): void => handleCalendarChange(date)}
                    onCloseClick={handleCloseCalendar}
                    minDate={subYears(today, 1)}
                    maxDate={addYears(today, 1)}
                    currentDate={selectedDate ?? new Date()}
                    selectedDate={selectedDate ?? new Date()}
                />
            )}
        </div>
    );
};

export default DatePicker;
