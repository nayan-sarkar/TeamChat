import {Outlet,Navigate} from 'react-router-dom';
import {useAuthContext} from './../hooks/useAuthContext';

export default function isAuthenticated(){

    const {state} = useAuthContext();

    if(state.user) {
        return <Outlet/>
    }else {
        return <Navigate to = "/login"/>}
}