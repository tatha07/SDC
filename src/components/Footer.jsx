import { Link } from 'react-router-dom';
import Logo from '../assets/SDC-LOGO.png';
import { navItems } from '../data/content.js';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand">
            <img src={Logo} alt="SDC" className="brand-logo" />
            <span className="brand-name">SDC</span>
          </div>
          <p>Software Development Community — VIT’s home for builders, from your first commit to your first ship.</p>
        </div>

        <div className="footer-col">
          <span className="h">Explore</span>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <span className="h">Connect</span>
          {/* <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a> */}
          <a href="https://www.linkedin.com/company/sdcvitb/posts/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/sdcvitb/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="git-status">
          {/* <span className="git-dot" /> main */}
           <span className="git-sep">·</span> 6 departments
          <span className="git-sep">·</span> 3 tracks <span className="git-sep">·</span> // PRs welcome
        </span>
        <span>© {year} SDC · VIT</span>
      </div>
    </footer>
  );
}

export default Footer;
