import { Link } from "react-router-dom";
import "../../styles/layout.scss"
import "../../styles/components.scss"
import Popup from "reactjs-popup";
import SignIn from "../SignIn";

export default function Header() {
    return (
        <header>
            <Link to="/" className="logo">
                <img src="./src/assets/estia.png" alt="Logo" />
            </Link>
            <ul className="navbar">
                <li><Link to='/'><button  className="button">Home</button></Link></li>
                <li><Link to='/about'><button className="button">About</button></Link></li>
                <li><Link to='/forum'><button className="button">Forum</button></Link></li>
                <li><Link to='/business'><button className="button">Business</button></Link></li>
                <li><Popup ><button className="button">Forum</button></Popup></li>
                <div className="navbar-signin">
                    <SignIn />
                </div>
            </ul>
        </header>
    )
}