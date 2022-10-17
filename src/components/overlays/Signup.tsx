import './Signup.scss';
import close from '../../assets/close-overlay-button.svg';

interface Prop {
    closeOverlay: (close: boolean) => void;

}

function Signup( {closeOverlay}: Prop ) {
    const closeBtn = () => {
        closeOverlay(false);
    }

    return (
        <section className="overlay">
            <section className="loginSignup">
                <img src={close} onClick={closeBtn} alt="close" className="closeButton" />

                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Password" />
                <button>Log in</button>
                <p className="signupInfo">Att ha nog av nog är alltid nog. </p>
            </section>
        </section>
    )
}

export default Signup;