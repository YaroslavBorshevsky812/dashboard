import { FC } from 'react';
import './scrollbar.scss';

interface Props {
    /** Дочерний элемент */
    children?: React.ReactNode;
}

const Scrollbar: FC<Props> = (props) => {
    const { children } = props;
    return <div className="scrollbar">{children}</div>;
};

export default Scrollbar;
