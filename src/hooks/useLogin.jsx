import React from 'react';
import {db, auth,setDoc, getDoc, doc} from  './../firebase/config';
import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {useAuthContext} from './useAuthContext';

export function useLogin(){
    const [error,setError] = React.useState(null);
    const [isPending,setIsPending] = React.useState(false);
    const {dispatch} = useAuthContext();

    // login with google Account
    const googleLogin = async function (){
        setError(null);
        setIsPending(true);

        const provider = new GoogleAuthProvider();

        try{
            const result = await signInWithPopup(auth, provider);
            console.log("this is output ",result);
            dispatch({type: 'LOGIN', payload: result.user});

            setIsPending(false);
            setError(null);


        }catch(error){
            console.log(error.message);
            setError(error.message);
            setIsPending(false);
        }

    }

    // login with username and pass
    const login = async function(email, password){
        setError(null);
        setIsPending(true);

        try{

            const response = await  signInWithEmailAndPassword(auth,email,password);
            // console.log("User Signed In")


            // set user online

            // get doc Ref
            const docRef = doc(db, "users", response.user.uid)

            // get document first
            const docSnap = await getDoc(docRef);

            const userData = {...docSnap.data(),  online: true}

            // set user online
            await setDoc(docRef,userData);
            // doc ref     // doc data

            // dispatch login
            dispatch({type: 'LOGIN', payload: response.user})

            // update State
            setIsPending(false);
            setError(null);
        }

        catch (error){
            // console.log(error.message);
            setError(error.message);
            setIsPending(false);
        }
    }

    return {login, googleLogin, error, isPending}
}