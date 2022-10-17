import Header from "../../components/Header";
import aboutpic  from '../../assets/about-title.svg'
import history  from '../../assets/history.svg'
import employees  from '../../assets/employees.svg'
import contact  from '../../assets/contact.svg'
import './About.scss'

const About = () => {


    return (
        <>
            <Header />
                <article className="about-headline">
                    <img src={aboutpic} alt="about us" />
                </article>
            <section className="about-container content-wrapper">
                <article className="history-card">
                    <img src={history} alt="history" />
                    <div>
                        <h3 className="info-h3">The story began 1956 when a man met a curious little mouse with a taste for fine dining food</h3>
                    </div>
                </article>
                <article className="employees-card">
                    <img src={employees} alt="employees" />
                    <div>
                        <h3 className="info-h3">Our amazing chef and mouse works close to the staff to provide the best food in town  </h3>
                    </div>
                </article>
                <article className="contact-card">
                    <img src={contact} alt="contact" />
                    <div>
                        <h3 className="info-h3">
                            We are located here:
                            3 allee du Rouergue Paris 
                            Phone : +33561565411
                            Mail: gusteaus@finedine.fr
                        </h3>
                    </div>
                </article>
            </section>
        </>
    )
}

export default About;