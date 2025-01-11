import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ guestComponent, authComponent }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            const userData = localStorage.getItem('userData');
            if (userData) {
                try {   
                    const parsedUserData = JSON.parse(userData);
                    const { accessToken, refreshToken } = parsedUserData;

                    // Check if accessToken or refreshToken exists
                    if (accessToken || refreshToken) {
                        setIsAuthenticated(true);
                    } else {
                        // If tokens are invalid or missing, clear localStorage and redirect
                        localStorage.removeItem('userData');
                        setIsAuthenticated(false);
                        if (!['/login', '/register'].includes(location.pathname)) {
                            navigate('/login');
                        }
                    }
                } catch (error) {
                    // Handle parsing errors
                    console.error("Error parsing userData:", error);
                    localStorage.removeItem('userData');
                    setIsAuthenticated(false);
                    if (!['/login', '/register'].includes(location.pathname)) {
                        navigate('/login');
                    }
                }
            } else {
                // No userData in localStorage, redirect to login if necessary
                setIsAuthenticated(false);
                if (!['/login', '/register'].includes(location.pathname)) {
                    navigate('/login');
                }
            }
        };

        checkAuth();
    }, [navigate, location]);

    // Show a loading indicator while authentication status is being determined
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // Render the appropriate component based on authentication status
    return isAuthenticated ? authComponent : guestComponent;
};

export default ProtectedRoutes;
