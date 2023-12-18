import {Outlet} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import {useAuthContext} from './../hooks/useAuthContext';
import OnlineUsers from './OnlineUsers/OnlineUsers';
import ChatModal from './ChatModal/ChatModal';

export default function Layout(){
    const {state} = useAuthContext();
    return  (
            <>
                {state.user && <Sidebar/>}
                <div className="container">
                    <Navbar/>
                    <Outlet/>
                </div>
                {state.chattingWith && <ChatModal chattingWith = {state.chattingWith}/>}
                {state.user && <OnlineUsers />}
            </>
    )
}