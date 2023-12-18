import React from 'react';
import {db} from './../firebase/config';
import {onSnapshot,collection, query, where, orderBy} from 'firebase/firestore';

// query orderby Null Check?
export function useRealtimeCollection(collectionName,_query){
    
    const [documents,setDocuments] = React.useState(null);
    
    const [error,setError] = React.useState(null);

    // Need to useRef to retain previous value since query and order is an array which will be different on every call

    const queryArray = React.useRef(_query).current
    // const orderByArray = React.useRef(_orderBy).current

    React.useEffect(()=>{
        
    setError(null);
        // get Collections Data Reference
    let collectionsDataRef = collection(db, collectionName);

    if(queryArray){
        collectionsDataRef = query(collectionsDataRef, where(...queryArray));
    }

    // if(orderByArray){
    //     collectionsDataRef = query(collectionsDataRef, orderBy(...orderByArray));
    // }

    const unsub = onSnapshot(collectionsDataRef,(snapshot)=>{
        setDocuments(snapshot.docs.map(doc=>({...doc.data(), id: doc.id})))
        },
        (err)=>{
            console.log(err);
            setError(err)})

     // cleanup
     return ()=>{
        // console.log("Logic Cleaned")
        unsub()
    }

    },[collectionName,queryArray])

    return {documents, error}

}