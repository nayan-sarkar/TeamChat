import React from 'react';
import {Timestamp} from "firebase/firestore";
import {useAuthContext} from './../../hooks/useAuthContext';
import { v4 as uuid } from 'uuid';
import {useFirestore} from './../../hooks/useFirestore';
import Avatar from './../../components/Avatar/Avatar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function TicketComments({ticket}){
    const {updateDocument,response} = useFirestore('tickets');
    const [newComment,setNewComment] = React.useState('');
    const {state} = useAuthContext();


    async function handleSubmit(e){
        const commentToAdd={
            displayName: state.user.displayName,
            photoURL : state.user.photoURL,
            content : newComment,
            createdAt: Timestamp.fromDate(new Date()),
            id: uuid()
        }
        
        e.preventDefault();
        await updateDocument(ticket.id, {
            ...ticket, comments: [...ticket.comments, commentToAdd]
        })

        if(!response.error){
            setNewComment('');
        }
    }

    return (
        <div className="ticket-comments">
            <h4>Ticket Comments</h4>
            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span>Add Comment</span>
                    <textarea
                      required
                      onChange={e=>(setNewComment(e.target.value))}
                      value={newComment}
                    >
                    </textarea>
                </label>
                <button className = 'btn'>Add Comment</button>
            </form>
            <ul>
                {ticket && ticket.comments.map(comment=>{return (
                     <li key={comment.id} className="modal-shadow">
                        <div className="comment-details">
                            <div className="comment-author">
                                <Avatar src={comment.photoURL}/>
                                <p>{comment.displayName}</p>
                            </div>
                            <p className="comment-date">{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
                        </div>
                         <div className="comment-content">
                             <p>{comment.content}</p>
                         </div>
                     </li>
                        
                        
                        
                        )})}
            </ul>
        </div>
    )

}