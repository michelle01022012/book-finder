import { NavLink } from 'react-router-dom';
import '../styles/Global.css';

const Header = () => {
  return (
    <header>
      <div className="logo">BookFinder</div>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

//const Header = () => (
  //<header style={{ background: '#2c3e50', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  //  <h1 style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/'}>BookFinder</h1>
 // </header>
//);
