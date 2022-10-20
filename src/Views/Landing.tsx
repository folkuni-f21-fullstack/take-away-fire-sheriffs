import './Landing.scss';
import Header from '../components/Header';
import Signup from '../components/overlays/Signup';
import logo from '../assets/logo.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Users } from '../models/models';

interface Props {
    setActiveUser: (activeUser: Users[]) => void;
}


function Landing({setActiveUser}: Props) {
    console.log("Landing - setActiveUser: ", setActiveUser);


    const navigate = useNavigate();
    const [openSignin, setOpenSignin] = useState(false);
    const signinClick = () => {
        {setOpenSignin(true)}
    }
    function guestUser() {
        navigate('/menu');
    }

    return (
        <section className="landingPage content-wrapper">
            <img className="logo" src={logo} />
            <button className="buttonGuest" onClick={guestUser}>Continue as Guest</button>
            <section className="loginSignup">
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Password" />
                <button>Log in</button>
            </section>
            <button className="buttonMember" onClick={signinClick}>Become a Member</button>
            {openSignin && <Signup closeOverlay={setOpenSignin} />}
        </section>
    )
}

export default Landing;