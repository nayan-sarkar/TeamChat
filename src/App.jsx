import React from 'react';
import './styles.css';
import {useAuthContext} from './hooks/useAuthContext';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Create from './pages/Create/Create';
import Dashboard from './pages/Dashboard/Dashboard';
import Ticket from './pages/Ticket/Ticket';
import IsAuthenticated from './components/IsAuthenticated';

export default function App(){
    const {state} = useAuthContext();

    console.log(state);

    // * Auth is ready helps to wait for components to load after gaurding

    return (
            <div className="App">
                {state.authIsReady && (
                <BrowserRouter>
                    <Routes>
                        <Route path = '/' element = {<Layout/>} >
                            <Route element={<IsAuthenticated/>}>
                                <Route index element = {<Dashboard/>} />
                                <Route path = "/create" element = {<Create/>} />
                                <Route path = "/tickets/:id" element = {<Ticket/>} />
                            </Route>
                            <Route path = "login" element = {<Login/>} />
                            <Route path = "signup" element = {<Signup/>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                )}
            </div>
            
           )
}