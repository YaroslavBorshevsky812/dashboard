import { FC } from 'react';
import { SVG_ICON_ITEMS } from '../../assets/icons/Consts';
import './icon.scss';

/** Модель props компонента. */
interface IProps {
    /** Название вызываемой иконки. */
    iconName: string;
}

/**
 * Компонент иконки в формате SVG.
 *
 * @param props Свойства компонента.
 */
export const Icon: FC<IProps> = (props): JSX.Element => {
    const { iconName } = props;

    return <div className={'default-icon'}>{SVG_ICON_ITEMS[iconName]}</div>;
};
