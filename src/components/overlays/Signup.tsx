import './Signup.scss';
import close from '../../assets/close-overlay-button.svg';
import { Credentials, User } from '../../models/models';
import { useEffect, useState } from 'react';
import { response } from 'express';

interface Prop {
    closeOverlay: (close: boolean) => void;
}

function Signup( {closeOverlay}: Prop ) {
    const [feedback, setFeedback] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const minUsernameCharacters: number = 3;
    const minPasswordCharacters: number = 5;
    const closeBtn = () => {
        closeOverlay(false);
    }

    async function userSignup() {
        if(username.length >= minUsernameCharacters) {
            if(password.length >= minPasswordCharacters) {
                const userExsists: boolean = await doesUserAlreadyExist();
                console.log("userExsists: ",userExsists);
                if(!userExsists){
                    const credentials: Credentials = {
                        username: username,
                        password: password
                    }
            
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials)
                    }

                    const response = await fetch('api/users/signup', requestOptions);
                    checkResponse(response);
                } else {
                    setFeedback(`The username "${username}" already exists, please choose another one`);
                }
            } else {
                setFeedback(`Your password needs to be longer than ${minPasswordCharacters} characters`);
            }
        } else {
            setFeedback(`Your username needs to be longer than ${minUsernameCharacters} characters`);
        }
    }

    function checkResponse(response: Response){

        console.log(response);
    }

    async function doesUserAlreadyExist() {
        const response = await fetch('/api/users', { mode: 'cors' });
        const data: User[] = await response.json();
        console.log("data", data);
        const checkUsername = data.find(user => user.username === username);
        console.log("checkUsername", checkUsername);
        if(!checkUsername) {
            return false;
        }
        return true;
    }

    return (
        <section className="overlay">
            <section className="loginSignup">
                <img src={close} onClick={closeBtn} alt="close" className="closeButton" />

                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={userSignup} >Sign up</button>
                <p className="signupInfo">{feedback}</p>
            </section>
        </section>
    )
}

export default Signup;