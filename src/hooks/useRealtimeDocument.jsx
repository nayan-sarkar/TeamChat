import React from 'react';
import {doc,onSnapshot} from "firebase/firestore";
import {db} from './../firebase/config'

export function useRealtimeDocument(collectionName,id){
    const [document,setDocument] = React.useState('');
    const [error,setError] = React.useState(null);

    React.useEffect(()=>{
        const docRef =  doc(db, collectionName, id);

        const unsub = onSnapshot(docRef,(snapshot)=>{
            if(!snapshot.data()){
                setError("No Such Documents Exists");
            }
            else{
                setDocument({...snapshot.data(), id: snapshot.id});
                setError(null);
            }
            },
            (err)=>{
                console.log(err.message);
                setError(err.message)})
    
         // cleanup
         return ()=>{
            console.log("Logic for Document Listener Cleaned")
            unsub()
        }
    },[collectionName,id])

    return {document,error};
}