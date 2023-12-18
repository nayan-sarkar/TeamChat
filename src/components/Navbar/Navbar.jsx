import './Navbar.css'
import logo from './../../assets/logo.svg';
import {Link} from 'react-router-dom';
import {useAuthContext} from './../../hooks/useAuthContext';

export default function Navbar(){

    const {state} = useAuthContext();

    return (
       <header className="dot">
            <div className="no-mobile"><h1>Not Supported for Smaller Screens</h1></div>
            <ul className="dot">
                <li className = "logo dot">
                    {/* safari and firefox fix */}
                    <object type="image/svg+xml" data={logo}></object>
                </li>
                {!state.user && <>
                    <li><Link to='login'>Login</Link></li>
                    <li><Link to='signup'>Signup</Link></li>
                </>}
            </ul>
       </header>
    )
}