import React from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './../firebase/config';

export const Context = React.createContext();

function reducer(state,action){
    switch(action.type){
        case 'LOGIN':
            return {...state, user:action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true}
        case 'CLOSE_CHAT':
            return {...state, closeChat: action.payload }
        case 'CHATTING_WITH':
            return {...state, chattingWith: action.payload }
        default:
            return state
    }
}

export function AuthContextProvider({children}){

    const [state,dispatch] = React.useReducer(reducer,{
        user: null,
        authIsReady: false,
        closeChat: true,
        chattingWith: null
    })

    React.useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            dispatch({type: "AUTH_IS_READY", payload: user})
        })
    },[])

    return (
        <Context.Provider value={{state ,dispatch}}>
            {children}
        </Context.Provider>
    )
}