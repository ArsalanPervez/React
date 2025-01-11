import { useState, useEffect } from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [userInfo, setUserInfo] = useState(null);

    const updateUserInfo = () => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            try {
                const parsedUserData = JSON.parse(userData);
                setUserInfo({
                    userId: parsedUserData.userId,
                    email: parsedUserData.email,
                });
            } catch (error) {
                console.error("Error parsing userData:", error);
                setUserInfo(null);
            }
        } else {
            setUserInfo(null);
        }
    };

    useEffect(() => {
        // Check user data on component mount
        updateUserInfo();
    }, []);

    return (
        <>
            <Header userData={userInfo} onLogout={() => setUserInfo(null)} />
            <Outlet />
        </>
    );
};

export default Layout;
