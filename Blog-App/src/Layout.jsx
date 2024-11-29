import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseconfig';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const data = {
                    userId: user.uid,
                    email: user.email
                };
                setUserInfo(data);
            } else {
                setUserInfo(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <Header userData={userInfo} /> 
            <Outlet />
        </>
    );
};

export default Layout;
