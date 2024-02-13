import { useState } from 'react';
import { Input } from 'antd';
import { webService } from '../../services/WebService';
import { UserModel } from '../../Models/UserModel';
import { useLocalStorage } from '../../utils/useLocalStorage';

const RegistrationPage = () => {
    const [, setJwt] = useLocalStorage('', 'jwt');
    const [, setPersonId] = useLocalStorage('', 'personId');
    const [passwordValue, setPasswordValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [userExistsError, setUserExistsError] = useState(false);

    const handlePasswordChange = (e: any) => {
        setPasswordValue(e.target.value);
    };

    const handleNameChange = (e: any) => {
        setUserExistsError(false);
        setNameValue(e.target.value);
    };

    const handleAuthFormSubmit = () => {
        webService.signUpUser(nameValue, passwordValue).then((response: any) => {
            if (!response.data) {
                return;
            }

            if (response.data === 'USER EXISTS') {
                setUserExistsError(true);

                return;
            }

            const user: UserModel = response.data;

            /** После регистрации пробуем авторизоваться и войти. */
            webService
                .loginUser(user.name, user.password)
                .then((response: any) => {
                    if (response.status === 200) {
                        const token = response.headers.authorization;
                        const personId = response.data.id;

                        setJwt(token);
                        setPersonId(personId);
                    }
                })
                .then(() => {
                    window.location.href = '/dashboard';
                });
        });
    };

    const labelClasses = ['label'];
    userExistsError && labelClasses.push('error');

    return (
        <div className="auth-page">
            <div className="auth-panel">
                <div className="auth-panel__wrapper">
                    <div className="auth-panel__header">
                        <h3>Регистрация</h3>
                    </div>
                    <div className="auth-panel__body">
                        <div className="input__wrapper">
                            <label className={labelClasses.join(' ')} htmlFor="login">
                                {userExistsError ? 'Такой пользователь уже существует' : 'Имя'}
                            </label>
                            <Input value={nameValue} onChange={(e) => handleNameChange(e)} id="login" />
                        </div>
                        <div className="input__wrapper">
                            <label htmlFor="password">Пароль</label>
                            <Input value={passwordValue} onChange={(e) => handlePasswordChange(e)} id="password" />
                        </div>
                        <button onClick={handleAuthFormSubmit} className="auth-btn">
                            <span className="auth-btn__text">Зарегистрироваться</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
