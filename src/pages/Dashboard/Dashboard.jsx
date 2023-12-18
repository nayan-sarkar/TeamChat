import {useRealtimeCollection} from './../../hooks/useRealtimeCollection'
import {useAuthContext} from './../../hooks/useAuthContext'
import TicketList from './../../components/TicketList/TicketList';
import TicketFilter from './TicketFilter';
import React from 'react';


export default function Dashboard(){
    const {state} = useAuthContext();

    const {documents, error} = useRealtimeCollection('tickets');

    const [currentFilter, setCurrentFilter] = React.useState("all");

    const changeFilter = (newFilter) =>{
        setCurrentFilter(newFilter)
    }

    const filteredTickets = documents && documents.filter(ticket=>{
        if(currentFilter==="all") return ticket
        else return currentFilter==ticket.category
        })

    return (
        <div>
            <h3 className="page-title">Open Tickets</h3>
            {error && <p className="error">{error}</p>}
            {documents && <>
                <TicketFilter currentFilter = {currentFilter} handleClick={changeFilter}/>
                <TicketList tickets = {filteredTickets}/>
            </>}
            
        </div>
    )
}