// Header.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate   } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseconfig';

function Header({userData}) {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <header className="bg-[#7749F8]">
            <div className="flex justify-between w-full max-w-custom px-[10px] mx-auto py-2">
                <Link to="/" className="text-white font-bold text-[23px] leading-[27.84px] tracking-[-0.03em] text-left">
                    Personal Blogging App
                </Link>
                <nav>
                    <Link to={'/profile'} className='text-xs text-[#FFFFFF] mr-4 font-normal'>{ userData?.email}</Link>
                    {userData != null ?
                        <button 
                            onClick={handleLogout}
                            className="text-white font-bold text-[12px] leading-[14.52px] tracking-[-0.02em] text-left">
                            Logout
                        </button> 
                        :
                        <Link 
                            to={isLoginPage ? '/register' : '/login'} 
                            className="text-white font-bold text-[12px] leading-[14.52px] tracking-[-0.02em] text-left">
                                {isLoginPage ? 'Register' : 'Login'}
                        </Link>
                    } 
                </nav>
            </div>
        </header>
    );
}

export default Header;
