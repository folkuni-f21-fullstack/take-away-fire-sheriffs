import './Signup.scss';

function Signup() {
    return (
        <section className="overlay loginSignup">
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button>Log in</button>
            <p className="signupInfo">Att ha nog av nog är alltid nog. </p>
        </section>
    )
}

export default Signup;