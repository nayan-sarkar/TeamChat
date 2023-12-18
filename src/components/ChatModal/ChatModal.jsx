import './ChatModal.css';
import React from 'react';
import classnames from 'classnames';
import {useAuthContext} from './../../hooks/useAuthContext';
import {useRealtimeDocument} from './../../hooks/useRealtimeDocument'
import {useFirestore} from './../../hooks/useFirestore'
import { v4 as uuid } from 'uuid';

export default function ChatModal({chattingWith}){

    const {updateDocument,getOneDoc,updateArray,response} = useFirestore('chats');

    const {state,dispatch} = useAuthContext();

    const combinedId = state?.user?.uid > chattingWith?.id ? state.user?.uid+chattingWith?.id : chattingWith?.id+state?.user?.uid 

    // Fetches Realtime
    const {document,error} = useRealtimeDocument('chats',combinedId);
  
    const [chatText, setChatText] = React.useState('');

    const [hideChat, setHideChat] = React.useState(false);

    let chatModal =  state?.closeChat ? classnames("chat-modal-close") : classnames("chat-modal","modal-shadow"); 
    
    let chatContent = classnames("chat-content");

    let chatInput = classnames("chat-input");

    if(hideChat){
      chatContent = classnames("chat-content-minimize");
      chatInput = classnames("chat-input-minimize");
    }

    async function handleSubmit(e){
      e.preventDefault();

      const chatData = {
        user: state.user.displayName,
        content: chatText,
        id: uuid()
      }
      
      const result = await getOneDoc(combinedId);
      
      if(!result.exists()){
        updateDocument(combinedId,{messages: [chatData], combinedId})
      }else updateArray(combinedId,chatData,"messages");

      setChatText('');

    }

    React.useState(()=>{
      if(!document){
        console.log("working");
      }
    },[]);

    return (
      state.user && <>
          <div className={chatModal}>
            <div className="chat-with">
              <p>{chattingWith?.displayName}</p>
              <span onClick = {()=>setHideChat(p=>!p)}>_</span>
              <span onClick = {()=>dispatch({type: 'CLOSE_CHAT', payload: !state.closeChat})}>X</span>
            </div>
            {document.messages && document.combinedId === combinedId && <div className={chatContent}>
              {document.messages.map(message=>{
                return <div key={message.id} className="chat-message">
                  <span><strong style={{color: message.user != state?.user?.displayName ? "darkgreen" : null}}>{message.user} : </strong></span> <span>{message.content}</span>
                </div>
              })}
            </div>}
            <form className={chatInput} onSubmit={handleSubmit}>
              <input
                  type ="text"
                  alt = "chat message"
                  value = {chatText}
                  required
                  onChange = {(e)=>setChatText(e.target.value)}
              />
              <button className="btn btn-invert">Send</button>
            </form>
          </div>
      </>
    )
}