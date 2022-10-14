import Header from '../components/Header';
import logo from '../assets/logo.svg';
import './Landing.scss';

function Landing() {
    return (
        <section className="landingPage">
            <Header />
            <img src={logo} />
            <button className="buttonGuest">Continue as Guest</button>
            <section className="loginSignup">
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Password" />
                <button>Log in</button>
            </section>
            <button className="buttonMember">Become a Memeber</button>
        </section>
    )
}

export default Landing;