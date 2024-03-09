import { FC } from 'react';
import './textInput.scss';

interface Props {
    /** Обработчик изменения контрола. */
    onChange?(value: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void;
    /** Класс компонента. */
    className?: string;
    /** Текст плейсхолдера. */
    placeholder?: string;
    /** Значение инпута. */
    value?: any;
    /** Флаг активности */
    disabled?: boolean;
}

const TextInput: FC<Props> = (props) => {
    const { onChange, className, disabled, value, placeholder } = props;

    const customClass = ['text-input'];
    !!className && customClass.push(className);

    return (
        <input
            disabled={disabled}
            value={value}
            className={customClass.join(' ')}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default TextInput;
