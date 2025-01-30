import { Link } from 'react-router-dom';
import estia from '../assets/estia.png';
import SignIn from './SignIn';
import '../styles/styles.css'; 

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={estia} alt="Logo" />
      </Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/forum">Forum</Link></li>
 
      </ul>
      <div className="navbar-signin">
        <SignIn />
      </div>
    </nav>
  );
}

export default NavBar;