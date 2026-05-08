import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Global.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    /* We apply the 'nav-open' class here so CSS can find .nav-links when open */
    <header className={isOpen ? 'nav-open' : ''}>
      <div className="logo">BookFinder</div>

      {/* The nav is placed here; on desktop it sits in the middle/right, 
          on mobile it becomes an absolute positioned dropdown */}
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* This is the last child, so space-between pushes it to the far right */}
      <div className="burger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;
