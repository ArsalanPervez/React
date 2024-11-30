import { useState, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './config/firebaseconfig'
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
    // const [userInfo, setUserInfo] = useState(null);

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             const data = {
    //                 userId: user.uid,
    //                 email: user.email
    //             };
    //             setUserInfo(data);
    //         } else {
    //             setUserInfo(null);
    //         }
    //     });

    //     return () => unsubscribe();
    // }, []);

    return (
        <>
            <Header /> 
            <Outlet />
            <Footer />
            <ToastContainer
                position="bottom-right"
                hideProgressBar={false}
                newestOnTop={false}
                autoClose={2000}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
                transition={Slide}
             />
        </>
    );
};

export default Layout;