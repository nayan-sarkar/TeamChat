import React from 'react';
import {Context} from './../context/AuthContextProvider';

export function useAuthContext(){
    const context = React.useContext(Context);

    if(!context){
        throw Error("Context Not Present")
    }

    return context;
}