import React from 'react';
import {Navigate} from 'react-router-dom';
import {useLogin} from './../../hooks/useLogin';
import {useAuthContext} from './../../hooks/useAuthContext';

export default function Login(){
    const {state} = useAuthContext();
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const {login, googleLogin, error, isPending} = useLogin();

    function handleSubmit(e){
        e.preventDefault();
        login(email,password);
    }

    function signInWithGoogle(){
        googleLogin();
    }

    return (
        <>
        {state.user && <Navigate to ="/"/>}
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
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
            {!isPending && <button className="btn">Log In</button>}
            {isPending && <button className="btn" disabled>Loading</button>}
            {error && <p className="error">{error}</p>}
        </form>
        </>
    )
}