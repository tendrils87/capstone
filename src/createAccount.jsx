import { port } from "./App";
import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from "react";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CreateAccount = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");

    const handleSubmit = async () => {
        let data = {username:username,
                    password: password,
                    firstname: firstName,
                    lastname: lastName }
        await fetch(`http://localhost:${port}/newuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    setOpen(false);
    }
    return (
      <div>
        <Button onClick={handleOpen}>Create Account</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <label>
                First Name:</label>
                <input type="text" id="username" name="username" value={props.username} onChange={e => setFirstName(e.target.value)} ></input><br/>
                <label>
                Last Name:</label>
                <input type="text" id="username" name="username" value={props.username} onChange={e => setLastName(e.target.value)} ></input><br/>
                <label>
                Username:</label>
                <input type="text" id="username" name="username" value={props.username} onChange={e => setUserName(e.target.value)} ></input><br/>
                <label>
                Password:</label>
                <input type="text" id="username" name="username" value={props.username} onChange={e => setPassWord(e.target.value)} ></input><br/>
                <button onClick={()=> handleSubmit()}>Submit</button>
          </Box>
        </Modal>
      </div>
    );
}
export default CreateAccount;