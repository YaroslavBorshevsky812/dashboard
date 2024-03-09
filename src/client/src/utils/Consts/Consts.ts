import * as locales from 'date-fns/locale';

export const locale = locales['ru'];

/** Шаги переключения внутри календаря. */
export enum ECalendarStep {
    /** Месяц. */
    MONTH,
    /** Год. */
    YEAR,
    /** Десятилетие. */
    DECADE,
}
