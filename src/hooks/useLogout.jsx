import React from 'react';
import {auth,doc,db,getDoc,setDoc} from  './../firebase/config';
import {signOut} from 'firebase/auth';
import {useAuthContext} from './useAuthContext';

export function useLogout(){
    const [error,setError] = React.useState(null);
    const [isPending,setIsPending] = React.useState(false);
    const {dispatch} = useAuthContext();

    const logout = async function(){
        setError(null);
        setIsPending(true);

        // sign user out
        try{
            // get doc Ref
            const docRef = doc(db, "users", auth.currentUser.uid)

            // get document first
            const docSnap = await getDoc(docRef);

            const userData = {...docSnap.data(),  online: false}

            await setDoc(docRef,userData);
            // // doc ref     // doc data

            // run logout

            // run fb logout
            const response = await signOut(auth);
    
            // dispatch logout
            dispatch({type: 'LOGOUT'})

            // update State
                setIsPending(false);
                setError(null);
            

        }
        catch (error){
                console.log(error.message);
                setError(error.message);
                setIsPending(false);
        }
    }



    return {logout, error, isPending}
}