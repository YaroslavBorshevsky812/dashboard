import Dashboard from '../Dashboard/Dashboard';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './layout.scss';
import AuthPage from '../AuthPage/AuthPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import StartPage from '../StartPage/StartPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';

const Layout = () => {
    return (
        <div className="layout">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<StartPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Layout;
