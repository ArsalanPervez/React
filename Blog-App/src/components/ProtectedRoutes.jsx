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
            // console.log("onAuthStateChanged ======> ", user)
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

        // Cleanup the listener
        return () => unsubscribe();
    }, [navigate, location]);

    // While authentication state is being determined, show a loading indicator
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // Show the appropriate component based on authentication status
    return isAuthenticated ? authComponent : guestComponent;
};

export default ProtectedRoutes;
