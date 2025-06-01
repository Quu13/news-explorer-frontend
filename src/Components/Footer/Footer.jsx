import github from "../../assets/github.svg";
import linkedIn from "../../assets/linkedin.svg";
import './Footer.css';

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
        <p className="footer__text">
          © {currentYear} Supersite, Powered by News API
        </p>
        <nav className="footer__nav">
          <a href="/" className="footer__link">
            Home
          </a>
          <a
            href="https://tripleten.com"
            target="_blank"
            className="footer__link"
          >
            TripleTen
          </a>
          <a
            href="https://github.com/Quu13"
            target="_blank"
            className="footer__icon-link"
          >
            <img src={github} alt="GitHub" className="footer__icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/benicen-soto-b00b30203/"
            target="_blank"
            className="footer__icon-link"
          >
            <img src={linkedIn} alt="LinkedIn" className="footer__icon" />
          </a>
        </nav>
    </footer>
  );
};

export default Footer;

