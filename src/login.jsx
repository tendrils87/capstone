import React from 'react';
import CreateAccount from './createAccount';
import login from './dologin';
const Header = (props) => {
    const logOut = () => {
        props.setUserId('');
        props.setLoggedIn(false);
    }
    return (
        <div>
        {props.loggedIn ? 
        <div>
            <p>Welcome, {props.firstName} {props.lastName}!</p><button onClick= {()=> logOut() }>Logout</button>
        </div>
            :
        <div>
            <label>
                Username:</label>
                <input type="text" id="username" name="username" value={props.username} onChange={e => props.setUserName(e.target.value)} ></input>
            
            <label>
                Password:</label>
                <input type="password" id="password" name="password" value={props.password} onChange={e => props.setPassword(e.target.value)}></input>
            
            <button onClick={() => login(props)}>Login</button>
            <CreateAccount/>
        </div>
        }
        </div>
    );
}

export default Header;