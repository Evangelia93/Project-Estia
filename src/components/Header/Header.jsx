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
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/forum'>Forum</Link></li>
                <li><Link to='/business'>Business</Link></li>
                <li><Popup >Forum </Popup></li>
                <div >
                    <SignIn className="button"/>
                </div>
            </ul>
        </header>
    )
}