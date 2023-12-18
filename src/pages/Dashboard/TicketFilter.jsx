import './Dashboard.css';

const filterList = ['all','development','design','marketing','sales'];

export default function TicketFilter({currentFilter, handleClick}){
   
    return (
        <div className="ticket-filter">
            {console.log(currentFilter)}
            <nav>
                <p>Filter By: </p>
                {filterList.map(filter=>(
                    <button key={filter}
                     className={currentFilter===filter ? "active" :''}
                     onClick={()=>handleClick(filter)}>
                        {filter}
                    </button>
                ))}
            </nav>
        </div>
    )
}