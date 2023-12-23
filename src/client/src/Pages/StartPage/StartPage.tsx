import './startPage.scss';
import { Link } from 'react-router-dom';

const StartPage = () => {
    return (
        <div className="start-page">
            <div className="btns__wrapper">
                <Link className="simple-btn" to={'/auth'}>
                    Регистрация
                </Link>

                <Link className="simple-btn" to={'/dashboard'}>
                    Войти
                </Link>
            </div>
        </div>
    );
};

export default StartPage;
