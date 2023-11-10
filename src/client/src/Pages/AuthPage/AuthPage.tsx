import { useState } from 'react';
import './authPage.scss';
import axios from 'axios';
import { useLocalStorage } from '../../utils/useLocalStorage';

const AuthPage = () => {
    const [jwt, setJwt] = useLocalStorage('', 'jwt');
    const [personId, setPersonId] = useLocalStorage('', 'personId')

    const [passwordValue, setPasswordValue] = useState('');
    const [nameValue, setNameValue] = useState('');

    const handlePasswordChange = (e: any) => {
        setPasswordValue(e.target.value);
    };

    const handleNameChange = (e: any) => {
        setNameValue(e.target.value);
    };

    const handleAuthFormSubmit = () => {
        axios({
            method: 'post',
            url: `http://localhost:8080/auth/login`,
            withCredentials: false,
            data: JSON.stringify({
                name: nameValue,
                password: passwordValue,
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response: any) => {
                if (response.status === 200) {
                    const token = response.headers.authorization;
                    const personId = response.data.id

                    setJwt(token);
                    setPersonId(personId)
                }
            })
            .then(() => {
                window.location.href = '/dashboard';
            });
    };

    return (
        <div className="auth-panel">
            <div className="auth-panel__wrapper">
                <div className="auth-panel__header">
                    <h3>Авторизация</h3>
                </div>
                <div className="auth-panel__body">
                    <div className="input__wrapper">
                        <label htmlFor="login">Имя:</label>
                        <input value={nameValue} onChange={(e) => handleNameChange(e)} id="login" />
                    </div>
                    <div className="input__wrapper">
                        <label htmlFor="password">Пароль:</label>
                        <input value={passwordValue} onChange={(e) => handlePasswordChange(e)} id="password" />
                    </div>
                    <button onClick={handleAuthFormSubmit} className="auth-btn">
                        <span className="auth-btn__text">Войти</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
