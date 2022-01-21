const login = async (props) => {
    let response= await fetch(`http://localhost:3001/login/${props.username}/${props.password}`)
    let user = await response.json();
    if(typeof user[0] === 'undefined'){
      props.setUserName("");
      props.setPassword("");
    } else {
      props.setLoggedIn(true);
      props.setFirstName(user[0].first);
      props.setLastName(user[0].last);
      props.setUserId(user[0].id);
    }
  }
  export default login;