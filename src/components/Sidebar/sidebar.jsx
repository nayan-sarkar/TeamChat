import React from 'react';
import './Sidebar.css';
import DashboardIcon from './../../assets/gauge-solid.svg';
import AddIcon from './../../assets/plus-solid.svg';
import {NavLink,useNavigate} from 'react-router-dom';
import leftArrow from './../../assets/arrow-left-solid.svg';
import rightArrow from './../../assets/arrow-right-solid.svg';
import Avatar from './../Avatar/Avatar';
import {useAuthContext} from './../../hooks/useAuthContext';
import {useLogout} from './../../hooks/useLogout';

export default function Sidebar(){
    const {state} = useAuthContext();
    const navigate = useNavigate();

    const [hideSideBar, setHideSideBar] = React.useState(false);

    function handleSidebar(){
        setHideSideBar(p=>!p);
    }

    const {logout} = useLogout();

    function handleLogout(){
        logout();
        navigate('/');
    }

    return (
        state.user && <div className={`sidebar ${hideSideBar ? 'slideIn':'slideOut'}`}>
            <img
                src = {hideSideBar ? rightArrow : leftArrow}
                className = "arrow"
                onClick = {handleSidebar}
            />
            <div className="sidebar-content">
            <div className="user">
                    <Avatar src = {state.user.photoURL}/>
                    <p>Welcome {state.user?.displayName}</p>
                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink to="/">
                                <img 
                                    src={DashboardIcon}
                                    alt="Dashboard icon"
                                />
                                <span>Dashboard</span>
                            </NavLink>
                            <NavLink to="create">
                                <img 
                                    src={AddIcon}
                                    alt="Add Icon"
                                />
                                <span>Add Ticket</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {state.user && <button className = "btn invert" onClick={handleLogout}>Logout</button>}
            </div>
        </div>
    )
}