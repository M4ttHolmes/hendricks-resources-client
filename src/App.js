import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Main from "./components/Main"
import Navigation from "./components/Navigation"

function App() {
    const [createActive, setCreateActive] = useState(false);
    // const [sessionToken, setSessionToken] = useState(undefined);

    // useEffect(() => {
    //     if(localStorage.getItem('token')){
    //       setSessionToken(localStorage.getItem('token'))
    //     }
    //   }, []);

    //   const updateLocalStorage = (newToken) => {
    //     localStorage.setItem('token', newToken);
    //     setSessionToken(newToken);
    //   };

    //   const clearLocalStorage = () =>{
    //     localStorage.clear();
    //     setSessionToken(undefined);
    //   }

    const createOn = () => {
        setCreateActive(true);
    }
    const createOff = () => {
        setCreateActive(false);
    }

    return (
        <div className="App">
            <Navigation createOn={createOn} createOff={createOff}/>
            <Main createOff={createOff} createActive={createActive}/>
        </div>
    );
}

export default App;
