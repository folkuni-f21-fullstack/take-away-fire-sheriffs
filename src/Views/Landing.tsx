import './Landing.scss';
import Signup from '../components/overlays/Signup';
import logo from '../assets/logo.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { User } from '../models/models';

interface Props {
    setActiveUser: (activeUser: User | null) => void;
    activeUser: User | null;
}


function Landing({activeUser, setActiveUser}: Props) {
    const [openSignup, setOpenSignup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 
    console.log("Landing - activeUser: ", activeUser);
    console.log("Landing - setActiveUser: ", setActiveUser);

    const signupClick = () => {
        {setOpenSignup(true)}
    }

    function guestUser() {
        navigate('/menu');
        // Set user?
    }

    function signIn() {
        
        navigate('/menu');
    }

    // TODO get userobject from database
    // Do something with this
    const fetchUsers = async () => {
        const response = await fetch('/api/users/login', { mode: 'cors' });
        const data: User = await response.json();
        console.log("fetchUsers: ", data);
    }

    return (
        <section className="landingPage content-wrapper">
            <img className="logo" src={logo} />
            <button className="buttonGuest" onClick={guestUser}>Continue as Guest</button>
            <section className="loginSignup">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={signIn}>Log in</button>
            </section>
            <button className="buttonMember" onClick={signupClick}>Become a Member</button>
            {openSignup && <Signup closeOverlay={setOpenSignup} />}
        </section>
    )
}

export default Landing;