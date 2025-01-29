// import { Link } from 'react-router-dom'
// import estia from '../assets/estia.png'
// import SignIn from './SignIn';

// function NavBar() {
//   return (
//     <nav style={{ width: '100%', position: 'relative', display: 'flex', alignItems: 'center', fontSize: 24, height: 150 }}>
//       <Link style={{ position: 'absolute', top: 0, left: 0 }} to="/">
//         <img src={estia} alt="Logo" style={{  height: "250px", borderRadius: "50%"}} />
//       </Link>
//       <ul style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', alignItems: 'center', gap: 18, listStyleType: 'none'}}>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About Us</Link></li>
//         <li><Link to="/forum">Forum</Link></li>
//         <li><Link to="/details">Details</Link></li>
//       </ul>

//      <SignIn/>
      
      
//     </nav>
//   );
// }

// export default NavBar;


import { Link } from 'react-router-dom';
import estia from '../assets/estia.png';
import SignIn from './SignIn';
import '../styles/styles.css'; // Δημιουργούμε ξεχωριστό αρχείο CSS για το NavBar

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
        <li><Link to="/businesses">Businesses</Link></li>
      </ul>
      <div className="navbar-signin">
        <SignIn />
      </div>
    </nav>
  );
}

export default NavBar;