import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Global.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="logo">BookFinder</div>
      <div className="burger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={isOpen ? 'nav-open' : ''}>
        <ul className="nav-links">
          <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;