import React from 'react';
import {auth,storage,ref, uploadBytes, getDownloadURL, db, Timestamp, collection, setDoc, doc} from  './../firebase/config';
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useAuthContext} from './useAuthContext';

export function useSignUp(){
    const [error,setError] = React.useState(null);
    const [isPending,setIsPending] = React.useState(false);
    const {dispatch} = useAuthContext();

    const signup = async function(email,password,displayName,displayPic){
        setError(null) // when signup called, setError defaults to null
        setIsPending(true)
        
        try{
            //sign up user
            const response = await createUserWithEmailAndPassword(auth,email,password);
            
            console.log("User Created",response.user)

            if(!response){
                throw Error('Could not complete Sign Up')
            }

            // upload user thumbnail
            const uploadPath = `thumbnails/${response.user.uid}/${displayPic.name}`;
            const ImgfileRef = ref(storage, uploadPath);
            const img = await uploadBytes(ImgfileRef,displayPic)
            const imgUrl = await getDownloadURL(ImgfileRef)

            // add display name and upload photo after profile creation
            updateProfile(response.user, { displayName , photoURL: imgUrl})
                .catch((e)=>console.log(e))

            // create a user document containing online status, displayName, photoUrl, createdAt

            // get or create collection
            const collectionData = collection(db, "users");

            const newUserDoc =  {
                online: true,
                displayName,
                photoURL: imgUrl,
                createdAt: Timestamp.fromDate(new Date())
            }

            await setDoc(doc(db, "users", response.user.uid),newUserDoc);
                        // doc ref                           // doc data
            
                        // dispatch logic action
            dispatch({type: "LOGIN", payload: response.user })
   
            // add set not iscancelled
            setIsPending(false);
            setError(null);
            
        }
        catch(err){
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
          
        }

    }


    return {error,isPending, signup}
}

