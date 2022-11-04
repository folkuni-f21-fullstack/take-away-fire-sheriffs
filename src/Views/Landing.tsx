import './Landing.scss';
import Signup from '../components/overlays/Signup';
import logo from '../assets/logo.svg';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { User, Credentials } from '../models/models';

// interface Props {
//     setActiveUser: (activeUser: string) => void;
//     activeUser: string;
// }


function Landing() { 
    // const [activeUser, setActiveUser] = useState<string>(""); 
    const [feedback, setFeedback] = useState<string>('');
    const [openSignup, setOpenSignup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
  
        
    const signupClick = () => {
        {setOpenSignup(true)}
    }

    function guestUser() {
        navigate('/menu');
        // Set user?
    }

    

    async function signIn() {
        let newData: User | any = await userLogin();
        
        if (newData == 404) {
            console.log('wrong username/password');
            setFeedback('');
            setTimeout(() => {
              setFeedback('displayFeedback');
            }, 500);
        } else if (newData == 400) {
            console.log('bad input'); 
            setFeedback("The database seems to be on vacation");
        } 
        else {
            // setActiveUser(newData.username);
            localStorage.setItem('activeUser', newData.username);
            navigate('/menu');
            if (newData.customer == false) {
                navigate('/admin');
            }
        }  
       
    }
    
    async function userLogin(): Promise<User | number> {
        const credentials: Credentials = {
            username: username,
            password: password
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }

        const response = await fetch('/api/users/login', requestOptions);

        // Kontrollera svaret 
        if(response.status == 200) {
            const data: User = await response.json();
            console.log('Landing - active User: ' , data.username);
            
            return data; 
        } else {
            return 404;
        }
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            signIn();
        }
    }

    return (
        <section className="landingPage content-wrapper">
            <img className="logo" src={logo} />
            <section className="loginSignup">
                <input type="text" placeholder="Username" value={username} onKeyDown={(event) => handleKeyPress(event)} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder="Password" value={password} onKeyDown={(event) => handleKeyPress(event)} onChange={(e) => setPassword(e.target.value)} />
                <p className={"feedback " + feedback}>Wrong username or password.</p>
                <button onClick={signIn}>Log in</button>
            </section>
            <button className="buttonMember" onClick={signupClick}>Become a Member</button>
            {openSignup && <Signup closeOverlay={setOpenSignup} />}
        </section>
    )
}

export default Landing;