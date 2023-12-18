import React from 'react';
import './Signup.css';
import {useSignUp} from './../../hooks/useSignUp';
import {Navigate} from 'react-router-dom';
import {useAuthContext} from './../../hooks/useAuthContext';

export default function Signup(){
    const {state} = useAuthContext();
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [displayName,setDisplayName] = React.useState('');
    const [dpError, setDpError] = React.useState(null);
    const [displayPic,setDisplayPic] = React.useState(null);
    const {error,isPending, signup} = useSignUp();

    function handleSubmit(e){
        e.preventDefault();
        // console.log(email,password,displayName,displayPic);
        signup(email,password,displayName,displayPic);
    }

    function handleFileChange(e){
        setDisplayPic(null);
        // array of files
        let selected = e.target.files[0];
        // console.log(selected)

        if(!selected){
            setDpError("Select a file");
            return;
        }

        if(!selected.type.includes("image")){
            setDpError("Select an image file");
            return;
        }

        if(selected.type.size > 300000){
            setDpError("Select a file less than 300kb");
            return;
        }
        setDpError(null);
        setDisplayPic(selected);

    }

    return (
        <>
        {state.user && <Navigate to ="/"/>}
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label>
                <span>Display Name: </span>
                <input 
                    type="text"
                    required
                    onChange={(e)=>setDisplayName(e.target.value)}
                    value = {displayName}
                />
            </label>
            <label>
                <span>Email: </span>
                <input 
                    type="email"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                    value = {email}
                />
            </label>
            <label>
                <span>Password: </span>
                <input 
                    type="password"
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                    value = {password}
                />
            </label>
            <label>
                <span>Display Thumbnail</span>
                <input 
                    type="file"
                    required
                    onChange={handleFileChange}
                />
            </label>
            {dpError && <p className="error">{dpError}</p>}
            {!isPending && <button className="btn">Sign Up</button>}
            {isPending && <button className="btn" disabled>Loading</button>}
            {error && <p className="error">{error}</p>}
        </form>
        </>
    )
}