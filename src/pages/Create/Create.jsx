import React from 'react';
import Select from 'react-select';
import './Create.css';
import {useRealtimeCollection} from './../../hooks/useRealtimeCollection';
import {useAuthContext} from './../../hooks/useAuthContext';
import {useFirestore} from './../../hooks/useFirestore';
import {Timestamp} from  './../../firebase/config';
import {useNavigate} from 'react-router-dom';


export default function Create(){
    const {state} = useAuthContext();
    const {response, addDocument} = useFirestore('tickets');
    const navigate = useNavigate();

    const {error, documents} = useRealtimeCollection('users')
    const [users,setUsers] = React.useState([]);

    // Form Fields
    const [name,setName] = React.useState('');
    const [details,setDetails] = React.useState('');
    const [dueDate,setDueDate] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [assignedUsers, setAssignedUsers] =  React.useState('');
    const [formError,setFormError] = React.useState(null);
    

    React.useEffect(()=>{
        if(documents){
            const options = documents.map(
                user => {return {value: user, label: user.displayName}})
            setUsers(options)
        }
    },[documents])

    async function handleSubmit(e){
        e.preventDefault();
        // Reset Error
        setFormError(null);
        if(!category) {
            setFormError("Select a Ticket category")
            return;
        }
        if(assignedUsers.length<1){
            setFormError("Assign a Ticket to atleast one user");
            return;
        }

        if(Timestamp.fromDate(new Date(dueDate)).seconds < Timestamp.fromDate(new Date()).seconds){
            setFormError("Due Date cannot be lesser than current Date");
            return;
        }

        const createdBy = {
            displayName : state.user.displayName,
            photoURL : state.user.photoURL,
            id: state.user.uid
        }

        const assignedUsersList = assignedUsers.map(user => {
            return {
                displayName : user.value.displayName,
                photoURL : user.value.photoURL,
                id : user.value.id
            }
        })


        const ticket = {
            name,
            details,
            category: category.value,
            dueDate: Timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList,
            createdAt: Timestamp.fromDate(new Date())
        }

        // console.log(Timestamp.fromDate(new Date()).seconds);
        console.log(dueDate);
        console.log(dueDate.seconds < Timestamp.fromDate(new Date()).seconds);
        // console.log(typeof ticket.dueDate.seconds);

        await addDocument(ticket);
        if(!response.error){
            navigate('/')
        }
    }

    // <option value = value>label</option>

    const categories =[
        {value: 'development', label: 'Development'},
        {value: 'design', label: 'Design'},
        {value: 'sales', label: 'Sales'},
        {value: 'marketing', label: 'Marketing'}
    ]

    return (
        <div className="create-form">
            <h2 className="page-title">Create a new Ticket</h2>
            <form onSubmit = {handleSubmit}>
                <label>
                    <span>Ticket Name:</span>
                    <input
                        type="text"
                        required
                        value = {name}
                        onChange = {(e)=>setName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Ticket Details</span>
                    <textarea
                        type="text"
                        required
                        value = {details}
                        onChange = {(e)=>setDetails(e.target.value)}
                    >
                    </textarea>
                    <label>
                    <span>Due Date</span>
                    <input
                        type="date"
                        required
                        value = {dueDate}
                        onChange = {(e)=>setDueDate(e.target.value)}
                    />
                    </label>
                    <label>
                        <span>Ticket Category:</span>
                        <Select
                            onChange = {(option)=>setCategory(option)}
                            options={categories}
                            className="select"
                        />
                    </label>
                    <label>
                        <span>Assign To:</span>
                        <Select
                            onChange={(option=>setAssignedUsers(option))}
                            options={users}
                            isMulti
                        />
                    </label>
                    <button className="btn">Add Ticket</button>
                    {formError && <p className="error">{formError}</p>}
                </label>
            </form>
        </div>
    )
}