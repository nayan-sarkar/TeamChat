import './TicketList.css';
import {Link} from 'react-router-dom';
import Avatar from './../Avatar/Avatar';

export default function TicketList(props){
    return (
        <div className="ticket-list">
            {props.tickets.length==0 && <p>No Tickets Assigned !</p>}
            {props.tickets.map(ticket=>{
            return <Link key = {ticket.id} to = {`/tickets/${ticket.id}`} className="modal-shadow">
                        <h4>{ticket.name}</h4>
                        <p>Due by {ticket.dueDate.toDate().toDateString()}</p>
                        <div className="assigned-to">
                            <ul>
                            {ticket.assignedUsersList.map(user=>(
                                <li key = {user.photoURL}>
                                    <Avatar src={user.photoURL}/>
                                </li>
                            ))}
                            </ul>
                        </div>
                        </Link>
        })}
        </div>
    )
}