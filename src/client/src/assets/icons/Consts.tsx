/* eslint-disable import/no-extraneous-dependencies */
import { ReactComponent as Sport } from '@material-design-icons/svg/outlined/sports_kabaddi.svg';
import { ReactComponent as Food } from '@material-design-icons/svg/outlined/fastfood.svg';
import { ReactComponent as EditNote } from '@material-design-icons/svg/outlined/edit_note.svg';
import { ReactComponent as CalendarMonth } from '@material-design-icons/svg/outlined/calendar_month.svg';
import { ReactComponent as DeleteOutline } from '@material-design-icons/svg/outlined/delete_outline.svg';
import { ReactComponent as AddCircle } from '@material-design-icons/svg/outlined/add_circle_outline.svg';
import { ReactComponent as ArrowLeft } from '@material-design-icons/svg/outlined/keyboard_double_arrow_left.svg';
import { ReactComponent as ArrowRight } from '@material-design-icons/svg/outlined/keyboard_double_arrow_right.svg';
import { ReactComponent as EditPencil } from '@material-design-icons/svg/outlined/edit.svg';

/**
 * Модель переменной с набором иконок в формате SVG.
 */
interface ISVGIconItems {
    /**
     * Компонента иконки.
     */
    [index: string]: JSX.Element;
}

/**
 * Доступные цвета для иконок.
 */
export enum IconColor {
    GRAY = '#006064ff',
    WHITE = '#fafafa',
    DARK_GRAY = '#585655',
    LIGHT_GRAY = '#0097a7',
    MEDIUM_GRAY = '#515151',
}

export const SVG_ICON_ITEMS: ISVGIconItems = {
    ['plus-circle-outline']: <AddCircle key={'plus-circle-outline-1'} fill={IconColor.GRAY} />,
    ['sport']: <Sport key={'sport-select-77'} fill={IconColor.WHITE} />,
    ['food']: <Food key={'food-select-77'} fill={IconColor.WHITE} />,
    ['edit-notes']: <EditNote key={'notes-select-77'} fill={IconColor.WHITE} />,
    ['trash-can-outline']: <DeleteOutline key={'trash-can-outline-122'} />,
    ['calendar']: <CalendarMonth key={'calendar_month-55'} />,
    ['doube-arrow-left']: <ArrowLeft key={'arrow-left-52'} fill={IconColor.WHITE} />,
    ['doube-arrow-right']: <ArrowRight key={'arrow-right-522'} fill={IconColor.WHITE} />,
    ['edit']: <EditPencil key={'edit-522'} fill={IconColor.WHITE} />,
};
