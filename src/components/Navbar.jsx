import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../assets/SDC-LOGO.png';
import { navItems } from '../data/content.js';

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src={Logo} alt="SDC" className="brand-logo" />
          <span className="brand-name">SDC</span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={open ? 'nav-links open' : 'nav-links'}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <a
            className="nav-cta"
            href="https://www.linkedin.com/company/sdcvitb/"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Join SDC
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
