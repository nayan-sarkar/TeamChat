import Avatar from './../../components/Avatar/Avatar';
import './Ticket.css';
import {useFirestore} from './../../hooks/useFirestore';
import {useAuthContext} from './../../hooks/useAuthContext';
import {useNavigate} from 'react-router-dom';

export default function TicketSummary(props){
    const {deleteDocument} = useFirestore('tickets');
    const {state} = useAuthContext();
    const navigate = useNavigate();

    function handleClick(e){
        deleteDocument(props.ticket.id);
        navigate('/');
    }

    return (
        <>
            <div>
                <div className="ticket-summary modal-shadow">
                    <h2 className="page-title">{props.ticket.name}</h2>
                    <p className="date">
                        Ticket created at {props.ticket.createdAt.toDate().toDateString()} by {props.ticket.createdBy.displayName}
                    </p>
                    <p className="details">
                        {props.ticket.details}
                    </p>
                    <p>Ticket Assigned To</p>
                    <div className="assigned-users">
                        {props.ticket.assignedUsersList.map(user=>(
                            <div key = {user.id} className="assigned-user">
                                <Avatar src = {user.photoURL}/>
                                <p>{user.displayName}</p>
                            </div>))}
                    </div>
                    <p className="resolve-date">
                        Ticket resolution due by {props.ticket.dueDate.toDate().toDateString()}
                    </p>
                    {state.user.uid == props.ticket.createdBy.id && <button className="btn" onClick={handleClick}>Resolved</button>}
                </div>
            </div>
        </>
        
    )
}