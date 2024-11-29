import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../config/firebaseconfig';

const ProtectedRoutes = ({ guestComponent, authComponent }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                const publicRoutes = ['/login', '/register']; 
                if (!publicRoutes.includes(location.pathname)) {
                    navigate('/login');
                }
            }
        });

        return () => unsubscribe();
    }, [navigate, location]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? authComponent : guestComponent;
};

export default ProtectedRoutes;
