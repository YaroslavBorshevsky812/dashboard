import { addYears, format } from 'date-fns';
import { FC } from 'react';
import './header.scss';
import { locale, ECalendarStep } from '../../../utils/Consts/Consts';
import { Icon } from '../../Icon/Icon';

interface Props {
    /** True, когда используется текущий месяц. */
    currentDate: Date;
    /** True, когда используется текущий месяц. */
    step: ECalendarStep;
    /** Функция перехода к предыдущему месяцу, году, десятилетию. */
    onPrev: () => void;
    /** Функция перехода к следующему месяцу, году, десятилетию. */
    onNext: () => void;
    /** Фукнция переключения шага. */
    onChangeView: () => void;
    /** Функция переключения шага календаря, с последующим изменения даты. */
    onPick: (modifier: (date: Date) => Date) => void;
}

const Header: FC<Props> = (props) => {
    const { currentDate, step, onChangeView, onNext, onPrev } = props;

    /** Основной класс компонента */
    const customClass = ['date-picker-header'];

    const getText = (): string => {
        switch (step) {
            case ECalendarStep.MONTH:
                return format(currentDate, 'LLLL yyyy', { locale });
            case ECalendarStep.YEAR:
                return format(currentDate, 'yyyy', { locale });
            case ECalendarStep.DECADE:
                const multiplier = 1;
                const periodYear = addYears(currentDate, 9 * multiplier);

                return `${format(currentDate, 'yyyy', { locale })} - ${format(periodYear, 'yyyy', { locale })}`;
            default:
                break;
        }

        return '';
    };

    return (
        <div className={customClass.join(' ')}>
            <span onClick={onPrev} className="right-arrow">
                <Icon iconName="doube-arrow-left" />
            </span>
            <div onClick={onChangeView} className="date-picker-header__text">
                {getText()}
            </div>
            <span onClick={onNext} className="right-arrow">
                <Icon iconName="doube-arrow-right" />
            </span>
        </div>
    );
};

export default Header;
