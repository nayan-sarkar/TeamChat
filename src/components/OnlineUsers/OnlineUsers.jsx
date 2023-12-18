import {useRealtimeCollection} from './../../hooks/useRealtimeCollection';
import Avatar from './../Avatar/Avatar'
import './OnlineUsers.css';
import {useAuthContext} from './../../hooks/useAuthContext';

export default function OnlineUsers(){

    const {error,documents} = useRealtimeCollection('users');

    const {state,dispatch} = useAuthContext();

    return (
        <div className = "user-list">
            <h2>Members</h2>
            {error && <p className="error">{error}</p>}
            {state.user && documents && documents.filter(u=>u.displayName!=state.user.displayName).map(user=>(
                <div key ={user.id} className="user-list-item" onClick={()=>{
                        dispatch({type: 'CHATTING_WITH', payload: user})
                        dispatch({type: 'CLOSE_CHAT', payload: false})
                        }}>
                    {user.online && <span className="online-user-dot"></span>}
                    <span>{user.displayName}</span>
                    <Avatar src = {user.photoURL}/>
                </div>
            ))}
        </div>
    )
}