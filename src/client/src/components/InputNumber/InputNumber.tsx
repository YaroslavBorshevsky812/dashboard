import './inputNumber.scss';
import { FC, useState } from 'react';

interface Props {
    /** Значение поля ввода */
    value?: any;
    /** Функция изменения поля ввода */
    onChange?: (event: any) => void;
}

// eslint-disable-next-line react/prop-types
const InputNumber: FC<Props> = (props) => {
    const { onChange, value } = props;
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleChangeValue = (event: any) => {
        onChange && onChange(event.target.value);
    };

    const handleIncreaseBtn = () => {
        const currentValue = value;
        const isNumber = Number.isInteger(currentValue);

        if (onChange) {
            isNumber ? onChange((prev: number) => prev + 1) : onChange(1);
        }
    };

    const handleDecreaseBtn = () => {
        const currentValue = value;
        const isNumber = Number.isInteger(currentValue);

        if (onChange) {
            isNumber ? onChange((prev: number) => prev - 1) : onChange(1);
        }
    };

    const inputClasses = !isFocused ? 'input-number__wrapper' : 'input-number__wrapper input-number__wrapper-focused';

    return (
        <div className={inputClasses}>
            <div className="arrow-container">
                <span className="arrow-up__wrapper" onClick={handleIncreaseBtn}>
                    <svg
                        className="arrow-up"
                        height="10px"
                        id="Layer_1"
                        version="1.1"
                        viewBox="0 0 512 512"
                        width="10px"
                    >
                        <polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 " />
                    </svg>
                </span>
                <span className="arrow-down__wrapper" onClick={handleDecreaseBtn}>
                    <svg
                        className="arrow-down"
                        height="10px"
                        id="Layer_1"
                        version="1.1"
                        viewBox="0 0 512 512"
                        width="10px"
                    >
                        <polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 " />
                    </svg>
                </span>
            </div>
            <input
                onChange={handleChangeValue}
                value={value}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={'input-number'}
            />
        </div>
    );
};

export default InputNumber;
