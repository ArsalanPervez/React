import React from 'react';
import { Link, useLocation, useNavigate   } from 'react-router-dom';
import axios from 'axios';


function Header({userData, onLogout }) {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/logout');
            const userData = localStorage.getItem('userData');
            if (userData) {
                localStorage.removeItem("userData")
                if (onLogout) onLogout();
            }
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
                    { userData?.email ? <Link to={'/profile'} className='text-xs text-[#FFFFFF] mr-4 font-normal underline'>Profile: { userData?.email}</Link> : ''}
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
