import React from "react";
import Box from '@mui/material/Box';
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

const AddNewPost = (props) => {
    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleClose = () => setOpen(false);

    const createPost = async () => {
        let data = {title:title,
            content: content,
            userid: props.userid
            }
        console.log(data);
        await fetch('http://localhost:3001/createpost', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        handleClose()
        props.fetchData();
    }

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <div>
        <div>
            <p>Title:</p>
            <input type="text"
                    value={title}
                    onChange= {(e)=>setTitle(e.target.value)}></input>
        </div>
        <div>
            <p>Content:</p>
            <input type="text"
                    value={content}
                    onChange= {(e)=>setContent(e.target.value)}></input>
        </div>
            <div>

                <button onClick={()=> createPost()}>Save</button>
                <button onClick={()=> handleClose() }>Cancel</button>
            </div>
    </div>
        </Box>
    </Modal>
    );
}
export default AddNewPost;