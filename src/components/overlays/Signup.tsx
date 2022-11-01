import './Signup.scss';
import close from '../../assets/close-overlay-button.svg';
import { Credentials, User } from '../../models/models';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Prop {
    closeOverlay: (close: boolean) => void;
    setActiveUser: (activeUser: string) => void;
}

function Signup( {closeOverlay, setActiveUser}: Prop ) {
    const [feedback, setFeedback] = useState('');
    const [feedbackText, setFeedbackText] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const minUsernameCharacters: number = 3;
    const minPasswordCharacters: number = 5;
    const navigate = useNavigate();

    const closeBtn = () => {
        closeOverlay(false);
    }

    function displayFeedbackMessage() {
        setFeedback('');
        setTimeout(() => {
          setFeedback('displayFeedback');
        }, 500);
    }

    async function userSignup() {
        const credentials: Credentials = {
            username: username,
            password: password
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }

        const response = await fetch('/api/users/signup', requestOptions);
        
        console.log("API response", response);
        checkResponse(response, credentials);
    }

    function checkResponse(response: Response, credentials: Credentials){
        console.log("API response",response);
        if(response.status == 201) {
            instantSignIn(credentials);
        } else if(response.status == 302) {
            setFeedbackText(`The username "${username}" already exists, please choose another one`);displayFeedbackMessage();
        } else if(response.status == 411) {
            checkCredidentialLength();
        } else if(response.status == 404) {
            setFeedbackText(`The database is on vacation`);
            displayFeedbackMessage();
        } else {
            console.log("something is wrong, i don't know how I got here");
        } 
    }

    function checkCredidentialLength() {
        if(username.length < minUsernameCharacters) {
            setFeedbackText(`Your username needs to be longer than ${minUsernameCharacters} characters`);
            displayFeedbackMessage();
        } else if(password.length < minPasswordCharacters) {
            setFeedbackText(`Your password needs to be longer than ${minPasswordCharacters} characters`);
            displayFeedbackMessage();
        }
    }

    async function instantSignIn(credentials: Credentials) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }

        const response = await fetch('/api/users/login', requestOptions);

        // Kontrollera svaret 
        if(response.status == 200) {
            setActiveUser(credentials.username);
            navigate('/menu');
        } else {
            return 404;
        }
    }

    return (
        <section className="overlay">
            <section className="loginSignup">
                <img src={close} onClick={closeBtn} alt="close" className="closeButton" />

                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <p className={"feedback " + feedback}>{feedbackText}</p>
                <button onClick={userSignup} >Sign up</button>
            </section>
        </section>
    )
}

export default Signup;