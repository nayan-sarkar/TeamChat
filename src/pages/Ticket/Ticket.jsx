import {useParams} from 'react-router-dom';
import {useRealtimeDocument} from './../../hooks/useRealtimeDocument';
import TicketSummary from './TicketSummary';
import TicketComments from './TicketComments';
import './Ticket.css';


export default function Ticket(){
    const {id} = useParams();
    const {error, document} = useRealtimeDocument('tickets',id);

    return (
        document || error ? <div className="ticket-details">
        <TicketSummary ticket={document}/>
        <TicketComments ticket={document}/>
        {error && <p className="error">{error}</p>}
        </div> : <p>Loading</p>
    )
}