import Header from '../components/Header';
import Signup from '../components/overlays/Signup';
import logo from '../assets/logo.svg';
import './Landing.scss';
import { useState } from 'react';

function Landing() {
    const [openEdit, setOpenEdit] = useState(false);
    const editPressed = () => {
        {setOpenEdit(true)}
    }
    return (
        <section className="landingPage">
            <Header />
            <img className="logo" src={logo} />
            <button className="buttonGuest">Continue as Guest</button>
            <section className="loginSignup">
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Password" />
                <button>Log in</button>
            </section>
            <button className="buttonMember" onClick={editPressed}>Become a Member</button>
            {openEdit && <Signup closeOverlay={setOpenEdit} />}
        </section>
    )
}

export default Landing;