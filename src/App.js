import './App.css';
import React from 'react'
import Header from './login'
import { useState } from 'react';
import MenuHeader from './menuHeader';

function App() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userid , setUserId] = useState('any');
  const [postFilter, setPostFilter] = useState(1);

  return (
    <div className="App">
      <Header 
        setUserName={setUserName} 
        setPassword={setPassword} 
        password={password} 
        username={username} 
        setLoggedIn={setLoggedIn} 
        loggedIn={loggedIn} 
        firstName={firstName} 
        lastName={lastName} 
        setFirstName={setFirstName} 
        setLastName={setLastName} 
        setUserId={setUserId}/>
      <div>
        <MenuHeader postFilter={postFilter} setPostFilter={setPostFilter} userid={userid} loggedIn={loggedIn}/>
      </div>
    </div>
  );
}

export default App;
 