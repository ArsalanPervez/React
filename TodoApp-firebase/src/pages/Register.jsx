import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react';
import { auth } from '../config/firebaseconfig';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const email = useRef();
    const password = useRef();

    const registerUser = (event) => {
        event.preventDefault();

        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                Swal.fire({
                    title: "Good job!",
                    text: "You registered successfully",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login'); 
                    }
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire({
                    title: "Something went wrong",
                    text: errorMessage,
                    icon: "error"
                });
            });
    };

    return (
        <>
            <form className="box" onSubmit={registerUser}>
                <h1>Register</h1>
                <input type="text" name="email" id="username" placeholder="Email" autoComplete="off" required ref={email} />
                <input type="password" name="pass" id="pass" placeholder="Password" autoComplete="off" required ref={password} />
                <input type="submit" id="submit" value="Register" />
                <p className='registerPara'>
                    Already have an account? <Link style={{ color: '#0097e6', textDecoration: 'underline' }} to={`/login`}>Login here</Link>
                </p>
            </form>
        </>
    );
}

export default Register;
