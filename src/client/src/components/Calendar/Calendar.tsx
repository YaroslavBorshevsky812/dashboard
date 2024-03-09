import { FC, useState } from 'react';
import Card from '../Card/Card';
import Month from './Month/Month';
import './calendar.scss';
import Header from './Header/Header';
import { ECalendarStep } from '../../utils/Consts/Consts';
import { addMonths, addYears } from 'date-fns';
import Decade from './Decade/Decade';
import Year from './Year/Year';

interface Props {
    /** Текущая дата. */
    currentDate: Date;
    /** Выбранная дата. */
    selectedDate: Date;
    /** Минимальная возможная дата. */
    minDate?: Date;
    /** Максимальная возможная дата. */
    maxDate?: Date;
    /** Класс компонента. */
    className?: string;
    /** Метод изменения даты. */
    onChange: (date: Date) => void;
    /** Метод изменения даты. */
    onCloseClick: () => void;
}

const Calendar: FC<Props> = (props) => {
    const { currentDate, maxDate, minDate, onChange, onCloseClick, selectedDate, className } = props;

    const [step, setStep] = useState(ECalendarStep.MONTH);
    const [currentDateState, setCurrentDateState] = useState<Date>(currentDate);

    const handleExitDialogBtnClick = () => {
        onCloseClick();
    };

    /**
     * Функция получения дефолтного преобразователя относительно выбранного шага календаря.
     *
     * @param isIncrement Флаг увеличения или уменьшения даты.
     */
    const getSpecifiedUnitFunc = (isIncrement?: boolean): ((date: Date) => Date) | undefined => {
        const multiplier = isIncrement ? 1 : -1;

        switch (step) {
            case ECalendarStep.MONTH:
                return (date: Date): Date => addMonths(date, 1 * multiplier);

            case ECalendarStep.YEAR:
                return (date: Date): Date => addYears(date, 1 * multiplier);

            case ECalendarStep.DECADE:
                return (date: Date): Date => addYears(date, 9 * multiplier);

            default:
                break;
        }
    };

    /**
     * Функция перелистывания представления календаря на шаг.
     *
     * @param isIncrement Флаг увеличения или уменьшения даты.
     */
    const handleChangeDate = (isIncrement?: boolean): (() => void) =>
        handleChangeCurrentDateFactory(getSpecifiedUnitFunc(isIncrement));

    /**
     * Фабрика изменения показываемой даты.
     *
     * @param modifier Функция преобразования текущей даты в необходимую.
     */
    const handleChangeCurrentDateFactory = (modifier?: (date: Date) => Date) => (): void => {
        modifier && setCurrentDateState((currentDate) => modifier(currentDate) ?? new Date());
    };

    /**
     * Функция переключения шага.
     */
    const handleChangeView = (): void => {
        if (step < 2) {
            setStep((step) => step + 1);
        }
    };

    /**
     * Функция переключения шага календаря, с последующим изменения даты.
     *
     * @param modifier Функция преобразования текущей даты в необходимую.
     */
    const handlePickDate = (modifier?: (date: Date) => Date): void => {
        setStep((step) => step - 1);
        handleChangeCurrentDateFactory(modifier);
    };

    const renderCalendarBody = () => {
        switch (step) {
            case ECalendarStep.MONTH:
                return (
                    <Month
                        currentDate={currentDateState}
                        selectedDate={selectedDate}
                        onChange={onChange}
                        onPrev={handleChangeDate()}
                        onNext={handleChangeDate(true)}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                );
            case ECalendarStep.YEAR:
                return <Year currentDate={currentDateState} selectedDate={selectedDate} onChange={handlePickDate} />;
            case ECalendarStep.DECADE:
                return <Decade currentDate={currentDateState} selectedDate={selectedDate} onChange={handlePickDate} />;
            default:
                return null;
        }
    };

    const customClass = ['calendar__wrapper'];
    !!className && customClass.push(className);

    return (
        <Card className={customClass.join(' ')} onExitClick={handleExitDialogBtnClick}>
            <Header
                currentDate={currentDateState}
                onPrev={handleChangeDate()}
                onNext={handleChangeDate(true)}
                onChangeView={handleChangeView}
                onPick={handlePickDate}
                step={step}
            />
            {renderCalendarBody()}
        </Card>
    );
};

export default Calendar;
