import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebaseconfig';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ component }) => {
    const [loading , setLoading] = useState(true)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(uid)
                setLoading(false)
            } else {
                setTimeout(()=>{
                    navigate('/login')
                },5000)
            }
        });

    }, [])

    // use navigate
    const navigate = useNavigate()
    return (
        loading ? <div className="wrapper">
        <div className="container">
            <svg xmlns="http://www.w3.org/2000/svg" id="diamonds" className="animate fade" width="12em" height="6em" viewBox="0 0 128 64">
                <polygon className="diamond left" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1000" points="32,61 3,32 32,3 61,32">
                </polygon>
                <polygon className="diamond right" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1000" points="90,61 61,32 90,3 119,32">
                </polygon>
                <polygon className="diamond center" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1000" points="61,61 32,32 61,3 90,32">
                </polygon>
            </svg>
            
            <svg xmlns="http://www.w3.org/2000/svg" id="diamonds" className="" width="12em" height="6em" viewBox="0 0 128 64">
                <polygon className="diamond left" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1000" points="32,61 3,32 32,3 61,32">
                    <animate attributeType="CSS" attributeName="stroke-dashoffset" values="1000;0;1000;1000" keyTimes="0;.4;.8;1" dur="3s" repeatCount="indefinite" id="draw-left"/>
                </polygon>
                <polygon className="diamond right" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1000" points="90,61 61,32 90,3 119,32">
                    <animate attributeType="CSS" attributeName="stroke-dashoffset" begin="0.5s" values="1000;0;1000;1000" keyTimes="0;.4;.8;1" dur="3s" repeatCount="indefinite" id="draw-right"/>
                </polygon>
                <polygon className="diamond center" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1000" points="61,61 32,32 61,3 90,32"><animate attributeType="CSS" attributeName="stroke-dashoffset" begin="0.25s" values="1000;0;1000;1000" keyTimes="0;.4;.8;1" dur="3s" repeatCount="indefinite" id="draw-center"/>
                </polygon>
            </svg>
            
            <div className="message">Loading...</div>
        </div>
    </div> :  component
    )
}

export default ProtectedRoutes